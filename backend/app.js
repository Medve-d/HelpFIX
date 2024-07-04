require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`APP LISTENING ON http://localhost:${process.env.PORT}/`);
    })
  })
  .catch(err => console.log('connection to database failed.    '  + err));


app.use('/api', userRoutes);







