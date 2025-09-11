const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const Conversation = require('../models/convoModel');
const User = require('../models/userModel');

// --- Middleware d'authentification pour toutes les routes ---
router.use(requireAuth);

// ➤ Créer ou récupérer une conversation unique
router.post('/', async (req, res) => {
  const { receiverId, prestationId } = req.body;
  const senderId = req.user._id;

  try {
    // Cherche si une conversation existe déjà pour ces membres et prestation
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
      prestationId,
    });

    if (!conversation) {
      conversation = new Conversation({
        members: [senderId, receiverId],
        prestationId,
      });
      conversation = await conversation.save();
    }

    // Populer les membres pour récupérer nom + prénom + rôle
    await conversation.populate('members', 'name familyName role');

    // Identifier la personne "en face"
    const receiver = conversation.members.find(
      (m) => m._id.toString() !== senderId.toString()
    );

    res.status(200).json({
      ...conversation.toObject(),
      receiverName: receiver ? `${receiver.name} ${receiver.familyName}` : 'Utilisateur',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ➤ Récupérer toutes les conversations d’un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    let conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });

    // Populer les membres pour récupérer nom + prénom + rôle
    conversations = await Conversation.populate(conversations, {
      path: 'members',
      select: 'name familyName role',
    });

    const response = conversations.map((conv) => {
      const receiver = conv.members.find(
        (m) => m._id.toString() !== req.params.userId
      );

      return {
        ...conv.toObject(),
        receiverName: receiver
          ? `${receiver.name} ${receiver.familyName}`
          : 'Utilisateur',
      };
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ➤ Supprimer une conversation
router.delete('/:id', async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv) return res.status(404).json({ error: 'Conversation non trouvée' });

    // Vérifie que l'utilisateur est bien membre de la conversation
    const memberIds = conv.members.map((m) => m.toString());
    if (!memberIds.includes(req.user._id.toString())) {
      return res.status(403).json({ error: 'Non autorisé' });
    }

    await Conversation.findByIdAndDelete(conv._id);
    res.status(200).json({ message: 'Conversation supprimée définitivement' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
