const express = require('express');
const  { getPrestations, getPrestation, createPrestation, deletePrestation, updatePrestation } = require('../controllers/prestationController');
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();


// require auth for all workout routes
router.use(requireAuth)



// get 
router.get('/', getPrestations);
router.get('/:id',getPrestation);


// post
router.post('/', createPrestation);



// delete
router.delete('/:id', deletePrestation);

router.patch('/:id', updatePrestation);


module.exports = router;
