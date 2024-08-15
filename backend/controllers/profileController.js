// controllers/profileController.js
const User = require('../models/userModel'); // Correctly import the User model
const mongoose = require('mongoose'); // Import mongoose



const getUserProfile = async (req, res) => {
    const userId = req.user._id; // Extracted from JWT payload by requireAuth

    try {
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// get all users

const getProfiles = async (req, res) => {
  try {
    const users = await User.find(); // Corrected reference to User
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user by id
const getProfile = async (req, res) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id); // Corrected reference to User
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get users by role
const getProfilesByRole = async (req, res) => {
  const { role } = req.query;
  
  try {
    const users = await User.find({ role }); // Corrected reference to User
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email }); // Corrected reference to User
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete user
const deleteProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user' });
  }
  
  const user = await User.findByIdAndDelete(id); // Corrected reference to User

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }
  res.status(200).json(user);
};

// update user
// controllers/profileController.js

const updateProfile = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { _id: id }, // Correctly use an object to filter by ID
            req.body, // Data to update
            { new: true } // Option to return the updated document
        );

        if (!user) {
            return res.status(400).json({ error: 'No such user' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
  getUserProfile,
  getProfiles,
  getProfile,
  getProfilesByRole,
  getUserByEmail,
  deleteProfile,
  updateProfile
};
