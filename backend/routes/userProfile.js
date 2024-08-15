// routes/userProfile.js
const express = require('express');
const { getUserProfile, getProfile, getProfilesByRole, getUserByEmail, deleteProfile, updateProfile } = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
router.use(requireAuth)

router.get('/', getUserProfile);
// Require auth for all routes
router.use(requireAuth);


// GET profile by ID
router.get('/:id', getProfile);

// GET profiles by role
router.get('/role', getProfilesByRole);

// GET profile by email
router.post('/email', getUserByEmail); // Changed to POST as it's based on body data

// DELETE profile
router.delete('/:id', deleteProfile);

// UPDATE profile
router.patch('/:id', updateProfile);

module.exports = router;
