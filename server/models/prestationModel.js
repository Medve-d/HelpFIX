const mongoose = require('mongoose');

const prestationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  job: { type: String, required: true },
  description: { type: String, required: true },
  userName: { type: String, required: true },
  ville: { type: String, required: true },
  category: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true });

// Création d'un index pour les recherches
prestationSchema.index({ title: 'text', job: 'text', ville: 'text' });

module.exports = mongoose.model('Prestation', prestationSchema);