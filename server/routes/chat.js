// server.js ou routes/chat.js
import express from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from './middlewares/auth.js';
import Conversation from './models/Conversation.js';
import Message from './models/Message.js';

const router = express.Router();

// Récupérer toutes les conversations d'un utilisateur
router.get('/conversations', authMiddleware, async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: req.user._id
        }).populate('members', 'name email');
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Récupérer tous les messages d'une conversation
router.get('/messages/:conversationId', authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Créer une nouvelle conversation
router.post('/conversations', authMiddleware, async (req, res) => {
    const { receiverId } = req.body;
    try {
        let conversation = await Conversation.findOne({
            members: { $all: [req.user._id, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [req.user._id, receiverId]
            });
        }

        res.json(conversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter un message
router.post('/messages', authMiddleware, async (req, res) => {
    const { conversationId, text } = req.body;
    try {
        const message = await Message.create({
            conversationId,
            sender: req.user._id,
            text,
        });
        res.json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
