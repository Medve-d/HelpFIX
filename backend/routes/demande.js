const express = require('express');
const  { getMyDemandes ,getAllDemandes ,getDemande, createDemande, deleteDemande, updateDemande } = require('../controllers/demandeController');
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();


// require auth for all Demande routes
router.use(requireAuth)



// get 
router.get('/', getAllDemandes);
router.get('/mydemande', getMyDemandes);
router.get('/:id',getDemande);


// post
router.post('/', createDemande);



// delete
router.delete('/:id', deleteDemande);

router.patch('/:id', updateDemande);


module.exports = router;
