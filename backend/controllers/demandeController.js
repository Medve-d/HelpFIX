const Prestation = require('../models/prestationModel');
const Demande = require('../models/demandeModel');
const mongoose = require('mongoose')



// get

const getMyDemandes = async (req, res) => {

    const client_id = req.user._id

    const demandes = await Demande.find({user_id}).sort({createdAt: -1});
    res.status(200).json(demandes);
}

const getAllDemandes = async (req, res) => {
    try {
        // Fetch all prestations without filtering by user_id
        const demandes = await Demande.find().sort({ createdAt: -1 });
        
        // Send the fetched prestations as a JSON response
        res.status(200).json(demandes);
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        res.status(500).json({ message: 'Server Error', error });
    }
}



const getDemande= async (req, res) => {
    const {id} = req.params;
    if (!mongooose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such demande'});
    }
    const demande = await Demande.findById(id);

    if (!demande) {
        return res.status(400).json({error: 'no such a demande'});
    }
    res.status(200).json(demande);
}

//post


const createDemande = async (req, res) => {
    const { id, clientName, clientMessage, prestatDate, clientAdresse } = req.body;

    // Fetch the related Prestation
    const prestation = await Prestation.findById(id);
    if (!prestation) {
        return res.status(404).json({ error: 'No such prestation' });
    }

    // Add doc to db
    try {
        const client_id = req.user._id; // Assuming user is authenticated and user ID is attached to the request
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
            clientMessage: clientMessage.trim(),
            clientAdresse: clientAdresse.trim()
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
        return res.status(404).json({error: 'No such Demande'});
    }
    
    const demande = await Demande.findByIdAndDelete({_id: id})

    if (!demande) {
        return res.status(400).json({error: 'no such a Demande'});
    }
    res.status(200).json(demande);
    
}

// PATCH

const updateDemande = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Demande'});
    }
    
    const demande = await Demande.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!demande) {
        return res.status(400).json({error: 'no such a Demande'});
    }
    res.status(200).json(demande);
}



module.exports = {
    getMyDemandes,
    getAllDemandes,
    getDemande,
    createDemande,
    deleteDemande,
    updateDemande
}