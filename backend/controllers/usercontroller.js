const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET, { expiresIn: '3d' });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user);

        const { password: _, ...userData } = user.toObject();

        res.status(200).json({ ...userData, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const signupUser = async (req, res) => {
    const { email, password, number, ville, birthday, name, familyName, role, membershipStatus } = req.body;
    try {
       const user = await User.signup(email, password, number, ville, birthday, name, familyName, role, membershipStatus);
       const token = createToken(user._id);

       const { password: _, ...userData } = user.toObject();

       res.status(200).json({...userData, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}