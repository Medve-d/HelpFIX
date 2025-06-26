const Prestation = require('../models/prestationModel');
const mongoose = require('mongoose');

// Helper pour la recherche
const buildSearchQuery = (search) => ({
  $or: [
    { title: { $regex: search, $options: 'i' } },
    { job: { $regex: search, $options: 'i' } },
    { userName: { $regex: search, $options: 'i' } },
    { ville: { $regex: search, $options: 'i' } },
    { category: { $regex: search, $options: 'i' } }
  ]
});

// GET toutes les prestations
const getAllPrestations = async (req, res) => {
  try {
    const prestations = await Prestation.find({})
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(prestations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET mes prestations (pour prestataire)
const getMyPrestations = async (req, res) => {
  try {
    if (req.user.role !== 'prestataire') {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    const prestations = await Prestation.find({ user_id: req.user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(prestations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST créer une prestation
const createPrestation = async (req, res) => {
  const { title, price, job, description, userName, ville, category } = req.body;

  const errors = [];
  if (!title?.trim()) errors.push('title');
  if (!job?.trim()) errors.push('job');
  if (!description?.trim()) errors.push('description');
  if (!ville?.trim()) errors.push('ville');
  if (!category?.trim()) errors.push('category');
  if (isNaN(price)) errors.push('price');

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Champs requis manquants ou invalides',
      missingFields: errors
    });
  }

  try {
    const prestation = await Prestation.create({
      title: title.trim(),
      price: Number(price),
      job: job.trim(),
      description: description.trim(),
      userName: userName?.trim(),
      ville: ville.trim(),
      category: category.trim(),
      user_id: req.user._id
    });

    res.status(201).json(prestation);
  } catch (error) {
    res.status(400).json({ error: 'Erreur de création' });
  }
};

// GET une prestation spécifique
const getPrestation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Format ID invalide' });
    }

    const prestation = await Prestation.findById(id).lean();

    if (!prestation) {
      return res.status(404).json({ error: 'Prestation non trouvée' });
    }

    res.status(200).json(prestation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE supprimer une prestation
const deletePrestation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Format ID invalide' });
    }

    const prestation = await Prestation.findByIdAndDelete(id);

    if (!prestation) {
      return res.status(404).json({ error: 'Prestation non trouvée' });
    }

    res.status(200).json(prestation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PATCH mettre à jour une prestation
const updatePrestation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Format ID invalide' });
    }

    const prestation = await Prestation.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!prestation) {
      return res.status(404).json({ error: 'Prestation non trouvée' });
    }

    res.status(200).json(prestation);
  } catch (error) {
    res.status(400).json({ error: 'Erreur de mise à jour' });
  }
};

module.exports = {
  getMyPrestations,
  getAllPrestations,
  getPrestation,
  createPrestation,
  deletePrestation,
  updatePrestation
};
