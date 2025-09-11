// server/app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const prestationRoutes = require('./routes/prestation');
const authMiddleware = require('./middleware/requireAuth');
const Message = require('./models/message.model'); // modèle de message

// --- Connexion à MongoDB ---
connectDB();

const app = express();
const server = http.createServer(app);

// --- Socket.IO ---
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attacher l'instance io à app pour l'utiliser dans les routes REST
app.set('socketio', io);

// --- Middleware ---
app.use(express.json());

// --- Routes API ---
app.use('/api/conversations', authMiddleware, conversationRoutes);
app.use('/api/messages', authMiddleware, messageRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/user', userRoutes);

// --- Socket.IO events ---
io.on('connection', (socket) => {
  console.log(`✅ Nouveau client connecté : ${socket.id}`);

  // Rejoindre une conversation
  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`👥 ${socket.id} a rejoint la conversation ${conversationId}`);
  });

  // Envoyer un message en temps réel
  socket.on('sendMessage', async (msg) => {
    try {
      // Sauvegarder le message dans MongoDB
      const newMsg = await Message.create(msg);

      // Diffuser le message à tous les membres de la conversation
      io.to(msg.conversationId).emit('receiveMessage', newMsg);
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message :', err);
    }
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log(`❌ Client déconnecté : ${socket.id}`);
  });
});

// --- Lancer le serveur ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
