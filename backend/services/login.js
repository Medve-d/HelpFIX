const bcrypt = require("bcrypt");
const User = require("../models/userModel"); // Make sure this points to your User model
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); // Await here
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error(error.message); // Return specific error message
    }
}

module.exports = {
    login
};
