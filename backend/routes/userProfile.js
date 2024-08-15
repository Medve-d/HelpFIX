const express = require('express');
const  { getProfiles, getProfile, deleteProfile, updateProfile } = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();


// require auth for all workout routes
router.use(requireAuth)



// get 
router.get('/', getProfiles);
router.get('/:id',getProfile);




// delete
router.delete('/:id', deleteProfile);

router.patch('/:id', updateProfile);


module.exports = router;
