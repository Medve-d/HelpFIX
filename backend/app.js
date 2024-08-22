require('dotenv').config();
const express = require('express');
const http = require('http'); //  http for server creation
const { Server } = require('socket.io'); //  Server from socket.io
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db'); //  the database connection
const userRoutes = require('./routes/user');
const prestationRoutes = require('./routes/prestation');
const demandeRoutes = require('./routes/demande');
const profileRoutes = require('./routes/userProfile');

const app = express();
const server = http.createServer(app); //  HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Connect to the database
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
  });
}).catch(err => console.error(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/demande', demandeRoutes);
app.use('/api/user/profile', profileRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Here, handle incoming socket events such as chat messages
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('message', (data) => {
    io.to(data.roomId).emit('message', data.message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

module.exports = app;
