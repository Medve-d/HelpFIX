const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User', // tu fais référence à ton modèle User
      required: true,
    },
    prestationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prestation', // si tu as un modèle Prestation
      required: true,
    },
    lastMessage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
