const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const connectDB = require('./config/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const prestationRoutes = require('./routes/prestation');
const demandeRoutes = require('./routes/demande');
const profileRoutes = require('./routes/userProfile');
const messageRoutes = require('./routes/message.js');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

app.use(bodyParser.json());  // Parsing JSON requests
app.use(express.json());  // Redundant, but included for completeness

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Connect to the database and start the server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
  });
}).catch(err => console.error(err));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/prestation', prestationRoutes);
app.use('/api/demande', demandeRoutes);
app.use('/api/user/profile', profileRoutes);
app.use('/api/messages', messageRoutes);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});
