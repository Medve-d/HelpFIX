const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Fonction pour créer un token JWT
const createToken = (user) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '3d' });
};

// Contrôleur pour la connexion
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Vérifiez que les champs requis sont fournis
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await User.login(email, password); // Méthode `login` définie dans le modèle
        const token = createToken(user);

        // Supprime le mot de passe des données retournées
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({ ...userData, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Contrôleur pour l'inscription
const signupUser = async (req, res) => {
    const { email, password, number, ville, birthday, name, familyName, role, membershipStatus } = req.body;

    // Vérifiez que les champs requis sont fournis
    if (!email || !password || !name || !familyName) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const user = await User.signup(email, password, number, ville, birthday, name, familyName, role, membershipStatus); // Méthode `signup` définie dans le modèle
        const token = createToken(user);

        // Supprime le mot de passe des données retournées
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({ ...userData, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    signupUser
};