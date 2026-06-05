const express = require('express');
const router = express.Router();
const { getStats, trackVisit } = require('../controllers/statsController');
const { apiLimiter } = require('../middleware/rateLimiter');

router.get('/', apiLimiter, getStats);
router.post('/visit', trackVisit);

module.exports = router;
