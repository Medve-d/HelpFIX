const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function createUser(userData) {
    const { U_name, firstName, lastName, email, password, RoleType, address, number, signupDate } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        U_name: U_name,
        firstname: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        RoleType,
        address: {
            street: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country
        },
        number: number,
        signupDate: { type: Date, default: Date.now }
    });
    
    // Save the new user, not `createUser.save()` but `newUser.save()`
    const savedUser = await newUser.save();
    return savedUser;
}

module.exports = { createUser };
