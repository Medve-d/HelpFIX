const express = require('express');
const mongoose = require('mongoose');
const Category = require('./Category'); 

const app = express();

mongoose.connect('mongodb+srv://admin:Helpfix!123456@cluster0.izxxwfy.mongodb.net/HelpFIX?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 5000; // Define the port

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


