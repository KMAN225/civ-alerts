const express = require('express');
const router = express.Router();
const { getAllIssues, createIssue, voteIssue, deleteIssue, getTrash, restoreIssue, permanentDelete } = require('../controllers/issueController');
const { protect } = require('../middleware/authMiddleware');
const { validateIssue } = require('../middleware/validateMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');
const upload = require('../middleware/uploadMiddleware');

router.get('/trash', protect, apiLimiter, getTrash);
router.get('/', apiLimiter, getAllIssues);
router.post('/', protect, apiLimiter, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), validateIssue, createIssue);
router.patch('/:id/vote', protect, apiLimiter, voteIssue);
router.patch('/:id/restore', protect, apiLimiter, restoreIssue);
router.delete('/:id/permanent', protect, apiLimiter, permanentDelete);
router.delete('/:id', protect, apiLimiter, deleteIssue);

module.exports = router;
