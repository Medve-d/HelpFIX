const express = require('express');
const  { getAllPrestations ,getMyPrestations ,getPrestation, createPrestation, deletePrestation, updatePrestation } = require('../controllers/prestationController');
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();


// require auth for all workout routes




// get 
router.get('/', getAllPrestations);

router.use(requireAuth)
router.get('/myprestations', getMyPrestations);
router.get('/:id',getPrestation);


// post
router.post('/', createPrestation);



// delete
router.delete('/:id', deletePrestation);

router.patch('/:id', updatePrestation);


module.exports = router;