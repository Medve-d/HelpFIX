const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout pour la sélection du serveur
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Connection to database failed: ' + error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
