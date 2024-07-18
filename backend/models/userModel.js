const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    U_name: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    RoleType: {
        type: String,
        enum: ['admin', 'client', 'prestataire'] // Example enum values
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    number: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
