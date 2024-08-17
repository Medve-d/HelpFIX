const mongoose = require('mongoose');

const Schema = mongoose.Schema

const DemandeSchema = new Schema({
    
    clientName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ville: {
        type: String,
        enum: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg'],
        required: true
    },
    job: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    user_id: {
        type: String,
        require: true
    },
    client_id: {
        type: String,
        require: true
    },
    prestatDate: {
        type: String,
        require: true
    },
    clientMessage: {
        type: String,
        require: true
    },
    clientAdresse: {
        type: String,
        require: true
    }
    
}, {timestamps: true });

module.exports = mongoose.model('Demande', DemandeSchema);
