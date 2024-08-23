const Prestation = require('../models/prestationModel');
const Demande = require('../models/demande.model');
const mongoose = require('mongoose')



// get

const getClientDemandes = async (req, res) => {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    const client_id = req.user._id;
  
    try {
      const demandes = await Demande.find({ client_id }).sort({ createdAt: -1 });
      res.status(200).json(demandes);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
  
  const getPrestataireDemande = async (req, res) => {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
  
    const user_id = req.user._id;
  
    try {
      const demandes = await Demande.find({ user_id }).sort({ createdAt: -1 });
      res.status(200).json(demandes);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
  

// prestations without filtering by user_id

const getAllDemandes = async (req, res) => {
    try {
        const demandes = await Demande.find().sort({ createdAt: -1 });
        
        
        res.status(200).json(demandes);
    } catch (error) {
        
        res.status(500).json({ message: 'Server Error', error });
    }
}



const getDemande= async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune demande trouvée'});
    }
    const demande = await Demande.findById(id);

    if (!demande) {
        return res.status(400).json({error: 'Aucune demande trouvée'});
    }
    res.status(200).json(demande);
}

//post


const createDemande = async (req, res) => {
    const { id, clientName, clientMessage, prestatDate, clientAdresse } = req.body;
  
    const prestation = await Prestation.findById(id);
    if (!prestation) {
      return res.status(404).json({ error: 'Aucune prestation trouvée' });
    }
  
    const today = new Date();
    const selectedDate = new Date(prestatDate);
    
    const sanitizedClientMessage = clientMessage.trim();
    const sanitizedClientAdresse = clientAdresse.trim();

    let emptyFields = [];
    
    if (!sanitizedClientMessage) {
        emptyFields.push('clientMessage');
    }
    if (!sanitizedClientAdresse) {
        emptyFields.push('clientAdresse');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs avec des données valides.', emptyFields });
    }
  
    if (selectedDate <= today) {
      return res.status(400).json({ error: 'La date de prestation doit être dans le futur.' });
    }
  
    try {
      const client_id = req.user._id;
      const demande = await Demande.create({
        title: prestation.title,
        price: prestation.price,
        job: prestation.job,
        description: prestation.description,
        userName: prestation.userName,
        ville: prestation.ville,
        user_id: prestation.user_id,
        clientName,
        client_id,
        prestatDate,
        clientMessage: sanitizedClientMessage,
        clientAdresse: sanitizedClientAdresse
      });
      
      res.status(200).json(demande);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  





// delete

const deleteDemande = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune demande trouvée'});
    }
    
    const demande = await Demande.findByIdAndDelete({_id: id})

    if (!demande) {
        return res.status(400).json({error: 'Aucune demande trouvée'});
    }
    res.status(200).json(demande);
    
}

// PATCH

const updateDemande = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Aucune demande trouvée'});
    }
    
    const demande = await Demande.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!demande) {
        return res.status(400).json({error: 'Aucune demande trouvée'});
    }
    res.status(200).json(demande);
}



module.exports = {
    getPrestataireDemande,
    getClientDemandes,
    getAllDemandes,
    getDemande,
    createDemande,
    deleteDemande,
    updateDemande
}