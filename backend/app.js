require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
    })
  })
  .catch(err => console.log('connection to database failed.    '  + err));



app.use('/api', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));








