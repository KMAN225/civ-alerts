const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');

router.post('/', apiLimiter, submitContact);
router.get('/', protect, isAdmin, getMessages);

module.exports = router;
