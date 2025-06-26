const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Route pour envoyer un message
router.post('/', messageController.sendMessage);

// Route pour récupérer les messages entre deux utilisateurs
router.get('/:userId', messageController.getMessages);

// Route pour marquer les messages comme lus
router.put('/:senderId/mark-read', messageController.markMessagesAsRead);

module.exports = router;
