const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { apiLimiter } = require('../middleware/rateLimiter');

router.get('/', apiLimiter, getStats);

module.exports = router;
