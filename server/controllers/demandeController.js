const Prestation = require('../models/prestationModel');
const Demande = require('../models/demande.model');
const mongoose = require('mongoose');
const sendMessage = require('../controllers/messageController').sendMessage;



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

    if (selectedDate <= today) {
      return res.status(400).json({ error: 'La date de prestation doit être dans le futur.' });
    }

    try {
      const client_id = req.user._id;

      // Check if a demande for the same prestation and client already exists
      const existingDemande = await Demande.findOne({ client_id, user_id: prestation.user_id, title: prestation.title });
      if (existingDemande) {
        return res.status(400).json({ error: 'Vous avez déjà créé une demande pour cette prestation.' });
      }

      const sanitizedClientMessage = clientMessage.trim();
      const sanitizedClientAdresse = clientAdresse.trim();

      let emptyFields = [];
      if (!sanitizedClientMessage) emptyFields.push('clientMessage');
      if (!sanitizedClientAdresse) emptyFields.push('clientAdresse');
      if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs avec des données valides.', emptyFields });
      }

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




const acceptDemande = async (req, res) => {
    const { demandId, user_id } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(demandId)) {
      return res.status(404).json({ error: 'Aucune demande trouvée' });
    }
  
    try {
      const demande = await Demande.findById(demandId);
  
      if (!demande) {
        return res.status(400).json({ error: 'Aucune demande trouvée' });
      }
  
      // Mark the demande as accepted (or add a field if needed)
      demande.status = 'accepted'; // Example field to track status
      await demande.save();
  
      // Send a message to the chat room
      const chatRoom = `${user_id}_${demande.client_id}`; // Example chat room name
      const message = `La demande pour ${demande.title} a été acceptée.`;
  
      // Use the sendMessage function from your message controller
      await sendMessage({
        params: { id: chatRoom },
        body: { message }
      });
  
      res.status(200).json({ message: 'Demande acceptée et message envoyé' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };



module.exports = {
    acceptDemande,
    getPrestataireDemande,
    getClientDemandes,
    getAllDemandes,
    getDemande,
    createDemande,
    deleteDemande,
    updateDemande
}