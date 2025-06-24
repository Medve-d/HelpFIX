const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectDB = require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Routes
const userRoutes = require('./routes/user');
const prestationRoutes = require('./routes/prestation');
const demandeRoutes = require('./routes/demande');
const profileRoutes = require('./routes/userProfile');
const messageRoutes = require('./routes/message');
const chatRoutes = require('./routes/chat'); // Nouvelle route pour le chat

const app = express();
const server = http.createServer(app);

// Configuration CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
    skipMiddlewares: true
  }
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Rejoindre une room de chat
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Envoyer un message
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    // Ici vous pourriez sauvegarder le message en DB
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // Gestion des erreurs
  socket.on('error', (error) => {
    console.error(`Socket error: ${error}`);
  });
});

// Routes API
app.use('/api/user', userRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/demande', demandeRoutes);
app.use('/api/user/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/chat', chatRoutes); // Routes pour le chat

// Middleware pour les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Connexion à la base de données et démarrage du serveur
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

// Gestion des signaux d'arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});