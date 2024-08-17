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
    }
}, { timestamps: true });

userSchema.statics.signup = async function (email, password, number, ville, birthday, name, familyName, role) {
    try {
        // Validation
        if (!email || !password || !number || !birthday || !name || !familyName ) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)) {
            throw Error('Password not strong enough');
        }
        if (!isValidPhoneNumber(number)) {
            throw new Error('Invalid phone number format');
        }
        if (!isValidAge(birthday)) {
            throw new Error('You must be at least 18 years old');
        }

        if (!role) {
            role = 'client';
        }

        if (!['admin', 'client', 'prestataire'].includes(role)) {
            throw new Error('Invalid role');
        }

        const emailExists = await this.findOne({ email });
        if (emailExists) {
            throw Error('Email already in use');
        }

        const numberExists = await this.findOne({ number });
        if (numberExists) {
            throw Error('Phone number already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ email, password: hash, number, ville, birthday, name, familyName, role });
        return user;
    } catch (error) {
        throw new Error(error.message);
    } 
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
