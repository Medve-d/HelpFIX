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

// --- Routes pour toutes les prestations ---
router.route('/')
  .get(getAllPrestations)   // GET /api/prestations : récupère toutes les prestations
  .post(createPrestation);  // POST /api/prestations : créer une nouvelle prestation

// --- Routes pour les prestations du prestataire connecté ---
router.route('/myprestations')
  .get(getMyPrestations);   // GET /api/prestations/myprestations : prestations du prestataire connecté

// --- Routes pour une prestation spécifique ---
router.route('/:id')
  .get(getPrestation)       // GET /api/prestations/:id : détails d'une prestation
  .delete(deletePrestation) // DELETE /api/prestations/:id : supprimer la prestation
  .patch(updatePrestation); // PATCH /api/prestations/:id : mettre à jour la prestation

module.exports = router;
