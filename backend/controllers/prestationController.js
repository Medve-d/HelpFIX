const Prestation = require('../models/prestationModel');    
const mongoose = require('mongoose')



// get

const getMyPrestations = async (req, res) => {
    const user_id = req.user._id;
  
    if (req.user.role === 'prestataire') {
      const prestations = await Prestation.find({ user_id }).sort({ createdAt: -1 });
      res.status(200).json(prestations);
    } else {
      res.status(403).json({ error: 'Unauthorized access' });
    }
  };

const getAllPrestations = async (req, res) => {
    try {
      const { search } = req.query;
      let query = {};
  
      if (search) {
        query = {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { job: { $regex: search, $options: "i" } },
            { userName: { $regex: search, $options: "i" } },
            { ville: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        };
      }
  
      const prestations = await Prestation.find(query);
      res.status(200).json(prestations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getPrestation = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune prestation trouvée'});
    }
    const prestation = await Prestation.findById(id);

    if (!prestation) {
        return res.status(400).json({error: 'Aucune prestation trouvée'});
    }
    res.status(200).json(prestation);
}

//post


const createPrestation = async (req, res) => {
    const { title, price, job, description, userName, ville, category } = req.body;

    // Trim to remove leading and trailing spaces
    const sanitizedTitle = title.trim();
    const sanitizedPrice = price.trim();
    const sanitizedJob = job.trim();
    const sanitizedDescription = description.trim();

    let emptyFields = [];

    // Check if the trimmed inputs are still empty (i.e., were only spaces or completely empty)
    if (!sanitizedTitle) {
        emptyFields.push('title');
    }
    if (!sanitizedPrice) {
        emptyFields.push('price');
    }
    if (price<0) {
        emptyFields.push('price');
    }
    if (!sanitizedJob) {
        emptyFields.push('job');
    }
    if (!sanitizedDescription) {
        emptyFields.push('description');
    }
    
    if (!category) {
        emptyFields.push('category');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs avec des données valides.', emptyFields });
    }

    // Add doc to db
    try {
        const user_id = req.user._id; // Assuming user is authenticated and user ID is attached to the request
        const prestation = await Prestation.create({
            title: sanitizedTitle,
            price: sanitizedPrice,
            job: sanitizedJob,
            description: sanitizedDescription,
            userName,
            ville,
            user_id,
            category
        });
        res.status(200).json(prestation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// delete

const deletePrestation = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune prestation trouvée'});
    }
    
    const prestation = await Prestation.findByIdAndDelete({_id: id})

    if (!prestation) {
        return res.status(400).json({error: 'Aucune prestation trouvée'});
    }
    res.status(200).json(prestation);
    
}

// PATCH

const updatePrestation = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune prestation trouvée'});
    }
    
    const prestation = await Prestation.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!prestation) {
        return res.status(400).json({error: 'Aucune prestation trouvée'});
    }
    res.status(200).json(prestation);
}



module.exports = {
    getMyPrestations,
    getAllPrestations,
    getPrestation,
    createPrestation,
    deletePrestation,
    updatePrestation
}