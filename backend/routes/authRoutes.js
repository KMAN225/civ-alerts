const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateSignup, validateLogin } = require('../middleware/validateMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/signup', authLimiter, validateSignup, signup);
router.post('/login', authLimiter, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
