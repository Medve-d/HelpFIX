const mongoose = require('mongoose');

const Schema = mongoose.Schema

const prestationSchema = new Schema({
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
    category: {
        type: String,
        enum: ['Plomberie', 'Services de Nettoyage', "Réparation d'Appareils Électroménagers", 'Jardinage et Entretien Extérieur', 'Tutorat et Cours Particuliers', 'Déménagement et Transport'],
        required: true
    }
}, {timestamps: true });

module.exports = mongoose.model('Prestation', prestationSchema);
