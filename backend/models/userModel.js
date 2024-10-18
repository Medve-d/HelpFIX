const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { isValidPhoneNumber, isValidAge } = require('../validators/userValidators');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    familyName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    ville: {
        type: String,
        enum: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg'],
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'client', 'prestataire'],
        default: 'client'
    },
    membershipStatus : {
        type: String,
        enum: ['notPrestatire', 'none', 'freeTrial', 'monthly', 'annual'],
        required: true
    }
}, { timestamps: true });

userSchema.statics.signup = async function (email, password, number, ville, birthday, name, familyName, role, membershipStatus) {
    try {
        // Validation
        if (!email || !password || !number || !birthday || !name || !familyName ) {
            throw Error('Tous les champs doivent être remplis');
        }
        if (!validator.isEmail(email)) {
            throw Error("L'email n'est pas valide");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Mot de passe pas assez sécurisé');
        }
        if (!isValidPhoneNumber(number)) {
            throw new Error('Format de numéro de téléphone invalide');
        }
        if (!isValidAge(birthday)) {
            throw new Error('Vous devez avoir au moins 18 ans');
        }
        if (!role) {
            role = 'client';
        }

        if (!membershipStatus) {
            throw new Error('Problème d\'abonnement');
        }


        if (!['admin', 'client', 'prestataire'].includes(role)) {
            throw new Error('Invalid role');
        }

        const emailExists = await this.findOne({ email });
        if (emailExists) {
            throw Error('Email déjà utilisé');
        }

        const numberExists = await this.findOne({ number });
        if (numberExists) {
            throw Error('Numéro de téléphone déjà utilisé');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ email, password: hash, number, ville, birthday, name, familyName, role, membershipStatus });
        return user;
    } catch (error) {
        throw new Error(error.message);
    } 
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('Tous les champs doivent être remplis');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Email incorrect');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Mot de passe incorrect');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
