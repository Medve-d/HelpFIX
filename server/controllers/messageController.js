const Message = require('../models/message.model');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Envoyer un message
const sendMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    const senderId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return res.status(400).json({ error: 'ID destinataire invalide' });
    }

    try {
        const [sender, receiver] = await Promise.all([
            User.findById(senderId),
            User.findById(receiverId)
        ]);

        if (!receiver) {
            return res.status(404).json({ error: 'Destinataire non trouvé' });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            content,
            senderName: `${sender.name} ${sender.familyName}`,
            isRead: false
        });

        const savedMessage = await newMessage.save();
        return res.status(201).json(savedMessage);

    } catch (error) {
        console.error('Erreur sendMessage:', error);
        return res.status(500).json({
            error: 'Erreur serveur',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Récupérer l'historique des messages
const getMessages = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'ID utilisateur invalide' });
    }

    try {
        const messages = await Message.aggregate([
            {
                $match: {
                    $or: [
                        { senderId: new mongoose.Types.ObjectId(currentUserId), receiverId: new mongoose.Types.ObjectId(userId) },
                        { senderId: new mongoose.Types.ObjectId(userId), receiverId: new mongoose.Types.ObjectId(currentUserId) }
                    ]
                }
            },
            { $sort: { createdAt: 1 } },
            { $limit: 100 },
            {
                $project: {
                    _id: 1,
                    content: 1,
                    senderId: 1,
                    receiverId: 1,
                    senderName: 1,
                    isRead: 1,
                    createdAt: {
                        $dateToString: {
                            format: "%Y-%m-%d %H:%M:%S",
                            date: "$createdAt"
                        }
                    }
                }
            }
        ]);

        return res.status(200).json(messages);

    } catch (error) {
        console.error('Erreur getMessages:', error);
        return res.status(500).json({
            error: 'Erreur lors de la récupération des messages',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Marquer les messages comme lus
const markMessagesAsRead = async (req, res) => {
    const { senderId } = req.params;
    const receiverId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(senderId)) {
        return res.status(400).json({ error: 'ID expéditeur invalide' });
    }

    try {
        const result = await Message.updateMany(
            {
                senderId: new mongoose.Types.ObjectId(senderId),
                receiverId: new mongoose.Types.ObjectId(receiverId),
                isRead: false
            },
            { $set: { isRead: true } }
        );

        return res.status(200).json({
            success: true,
            markedAsRead: result.modifiedCount
        });

    } catch (error) {
        console.error('Erreur markMessagesAsRead:', error);
        return res.status(500).json({
            error: 'Erreur lors du marquage des messages',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    markMessagesAsRead
};
