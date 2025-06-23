const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { isValidPhoneNumber, isValidAge } = require('../validators/userValidators');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    ville: {
        type: String,
        enum: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg'],
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'prestataire'],
        default: 'client',
    },
    membershipStatus: {
        type: String,
        enum: ['notPrestatire', 'none', 'freeTrial', 'monthly', 'annual'],
        default: 'none',
    },
}, { timestamps: true });

// Méthode pour l'inscription
userSchema.statics.signup = async function (email, password, number, ville, birthday, name, familyName, role, membershipStatus) {
    try {
        console.log('Signup method called with:', { email, password, number, ville, birthday, name, familyName, role, membershipStatus });

        // Validation des champs requis
        if (!email || !password || !number || !birthday || !name || !familyName) {
            throw new Error('Tous les champs doivent être remplis');
        }

        // Validation des formats
        if (!validator.isEmail(email)) {
            throw new Error("L'email n'est pas valide");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error('Mot de passe pas assez sécurisé');
        }
        if (!isValidPhoneNumber(number)) {
            throw new Error('Format de numéro de téléphone invalide');
        }
        if (!isValidAge(birthday)) {
            throw new Error('Vous devez avoir au moins 18 ans');
        }

        // Validation des valeurs par défaut
        role = role || 'client';
        membershipStatus = membershipStatus || 'none';

        if (!['admin', 'client', 'prestataire'].includes(role)) {
            throw new Error('Role invalide');
        }

        // Vérification des doublons
        const emailExists = await this.findOne({ email });
        if (emailExists) {
            throw new Error('Email déjà utilisé');
        }

        const numberExists = await this.findOne({ number });
        if (numberExists) {
            throw new Error('Numéro de téléphone déjà utilisé');
        }

        // Hashage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Création de l'utilisateur
        const user = await this.create({ email, password: hash, number, ville, birthday, name, familyName, role, membershipStatus });
        console.log('User created:', user);
        return user;
    } catch (error) {
        console.error('Error in signup method:', error.message);
        throw new Error(error.message);
    }
};

// Méthode pour la connexion
userSchema.statics.login = async function (email, password) {
    try {
        console.log('Login method called with:', { email, password });

        if (!email || !password) {
            throw new Error('Tous les champs doivent être remplis');
        }

        const user = await this.findOne({ email });
        if (!user) {
            throw new Error('Email incorrect');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Mot de passe incorrect');
        }

        console.log('User logged in:', user);
        return user;
    } catch (error) {
        console.error('Error in login method:', error.message);
        throw new Error(error.message);
    }
};

module.exports = mongoose.model('User', userSchema);