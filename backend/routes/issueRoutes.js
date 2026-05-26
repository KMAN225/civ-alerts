const express = require('express');
const router = express.Router();
const { getAllIssues, createIssue, voteIssue, deleteIssue } = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');
const { validateIssue } = require('../middleware/validateMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');
const upload = require('../middleware/uploadMiddleware');

router.get('/', apiLimiter, getAllIssues);
router.post('/', protect, apiLimiter, upload.single('image'), validateIssue, createIssue);
router.patch('/:id/vote', protect, apiLimiter, voteIssue);
router.delete('/:id', protect, apiLimiter, deleteIssue);

module.exports = router;
