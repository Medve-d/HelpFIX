const Prestation = require('../models/prestationModel');
const mongooose = require('mongoose')



// get

const getPrestations = async (req, res) => {

    const user_id = req.user._id

    const prestations = await Prestation.find({user_id}).sort({createdAt: -1});
    res.status(200).json(prestations);
}

const getPrestation = async (req, res) => {
    const {id} = req.params;
    if (!mongooose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such prestation'});
    }
    const prestation = await Prestation.findById(id);

    if (!prestation) {
        return res.status(400).json({error: 'no such a prestation'});
    }
    res.status(200).json(prestation);
}

//post


const createPrestation = async (req, res) => {
    const { ville, job, description } = req.body;

    // Trim  to remove leading and trailing spaces
    const sanitizedVille = ville.trim();
    const sanitizedJob = job.trim();
    const sanitizedDescription = description.trim();

    let emptyFields = [];

    // Check if the trimmed inputs are still empty (i.e., were only spaces or completely empty)
    if (!sanitizedVille) {
        emptyFields.push('ville');
    }
    if (!sanitizedJob) {
        emptyFields.push('job');
    }
    if (!sanitizedDescription) {
        emptyFields.push('description');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields with valid data', emptyFields });
    }
    // add doc to db
    try {
        const user_id = req.user._id 
        const prestation = await Prestation.create({ ville, job, description, user_id });
        res.status(200).json(prestation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// delete

const deletePrestation = async (req, res) => {
    const { id } = req.params;
    if (!mongooose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Prestation'});
    }
    
    const prestation = await Prestation.findByIdAndDelete({_id: id})

    if (!prestation) {
        return res.status(400).json({error: 'no such a Prestation'});
    }
    res.status(200).json(prestation);
    
}

// PATCH

const updatePrestation = async (req, res) => {
    const { id } = req.params
    if (!mongooose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Prestation'});
    }
    
    const prestation = await Prestation.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!prestation) {
        return res.status(400).json({error: 'no such a prestation'});
    }
    res.status(200).json(prestation);
}



module.exports = {
    getPrestations,
    getPrestation,
    createPrestation,
    deletePrestation,
    updatePrestation
}