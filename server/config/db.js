const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Déconnexion préalable pour éviter les connexions multiples
    await mongoose.disconnect(); 

    // Connexion avec configuration explicite
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'HelpFIX', // Force explicitement le nom de la base
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 secondes de timeout
      socketTimeoutMS: 45000 // 45 secondes de timeout socket
    });

    // Vérification active de la connexion
    const db = mongoose.connection.db;
    console.log(`Connecté avec succès à MongoDB (Base: ${db.databaseName})`);
    console.log(`Collections disponibles: ${(await db.listCollections().toArray()).map(c => c.name).join(', ')}`);

    // Vérification que la collection 'prestations' existe
    const collections = await db.listCollections().toArray();
    if (!collections.some(c => c.name === 'prestations')) {
      console.warn("Attention: La collection 'prestations' n'existe pas dans la base HelpFIX");
    }

  } catch (error) {
    console.error('Échec de la connexion à MongoDB:', error.message);
    console.error('URI utilisée:', process.env.MONGO_URI);
    process.exit(1);
  }
};

// Gestion des événements de connexion
mongoose.connection.on('connected', () => {
  console.log('Mongoose connecté à:', mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose déconnecté');
});

// Gestion propre de la fermeture
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Connexion MongoDB fermée (SIGINT)');
  process.exit(0);
});

module.exports = connectDB;