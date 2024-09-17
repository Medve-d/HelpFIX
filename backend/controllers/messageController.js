const Message = require('../models/message.model.js');  
const Conversation = require('../models/convoModel.js');
const mongoose = require('mongoose')



const sendMessage = async (req, res) => {
	const { id } = req.params; // Chat room ID
	const { message } = req.body;
  
	try {
	  const newMessage = new Message({
		room: id,
		message,
		sender: req.user._id // Assuming you have sender information in your request
	  });
	  await newMessage.save();
  
	  // Emit the message to the chat room
	  io.to(id).emit('receive_message', { message });
	  res.status(200).json({ message: 'Message envoyé' });
	} catch (error) {
	  res.status(500).json({ error: 'Erreur serveur' });
	}
  };
  

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        console.log("Fetching messages between:", senderId, "and", userToChatId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            console.log("No conversation found.");
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {
    sendMessage,
    getMessages
}