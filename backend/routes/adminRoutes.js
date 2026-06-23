const express = require('express');
const router = express.Router();
const { updateIssueStatus, getStats, getPaginatedIssues, refreshTrustScores } = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');

router.patch('/issues/:id/status', protect, isAdmin, apiLimiter, updateIssueStatus);
router.get('/stats', protect, isAdmin, apiLimiter, getStats);
router.get('/issues', protect, isAdmin, apiLimiter, getPaginatedIssues);
router.post('/refresh-trust', protect, isAdmin, apiLimiter, refreshTrustScores);

module.exports = router;
