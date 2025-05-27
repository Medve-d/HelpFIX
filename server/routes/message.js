const express = require('express');
const  { getMessages ,sendMessage } = require('../controllers/messageController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();


router.use(requireAuth)

router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

module.exports = router;