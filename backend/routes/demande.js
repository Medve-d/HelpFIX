const express = require('express');
const  { getClientDemandes ,getPrestataireDemande ,getAllDemandes ,getDemande, createDemande , acceptDemande, deleteDemande, updateDemande } = require('../controllers/demandeController');
const requireAuth = require('../middleware/requireAuth')


const router = express.Router();


// require auth for all Demande routes
router.use(requireAuth)



// get 
router.get('/', getAllDemandes);
router.get('/clientdemande', getClientDemandes);
router.get('/prestatairedemande', getPrestataireDemande);
router.post('/acceptdemande', acceptDemande);
router.get('/:id',getDemande);


// post
router.post('/', createDemande);



// delete
router.delete('/:id', deleteDemande);

router.patch('/:id', updateDemande);


module.exports = router;
