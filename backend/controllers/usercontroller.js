const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}


const  loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login (email, password);
        const token = createToken(user._id);
 
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({ ...userData, token });
     } catch (error) {
         res.status(400).json({error: error.message});
     }
}

const signupUser = async (req, res) => {
    const {email, password, number, birthday, name, familyName, role } = req.body;
    try {
       const user = await User.signup(email, password, number, birthday, name, familyName, role);

       const token = createToken(user._id);

       res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}