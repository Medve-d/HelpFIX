const express = require('express');
const {
  getAllPrestations,
  getMyPrestations,
  getPrestation,
  createPrestation,
  deletePrestation,
  updatePrestation
} = require('../controllers/prestationController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Middleware d'authentification pour toutes les routes
router.use(requireAuth);

// Routes GET
router.route('/')
  .get(getAllPrestations) // GET /api/prestations
  .post(createPrestation); // POST /api/prestations

router.route('/myprestations')
  .get(getMyPrestations); // GET /api/prestations/myprestations

router.route('/:id')
  .get(getPrestation) // GET /api/prestations/:id
  .delete(deletePrestation) // DELETE /api/prestations/:id
  .patch(updatePrestation); // PATCH /api/prestations/:id

module.exports = router;