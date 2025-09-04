const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prestationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prestation',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Export du modèle
module.exports = mongoose.model('Message', messageSchema);
