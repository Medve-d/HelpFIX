require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoutes = require('./routes/user');


const app = express();
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Connect to the database
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
  });
}).catch(err => console.error(err));

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, 'public')));
