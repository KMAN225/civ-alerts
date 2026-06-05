const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', submitContact);
router.get('/', protect, isAdmin, getMessages);

module.exports = router;
