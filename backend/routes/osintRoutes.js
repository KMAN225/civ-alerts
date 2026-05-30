const express = require('express');
const router = express.Router();
const { voteHelpful, voteSuspicious } = require('../controllers/issueController');
const { fetchNewsForRegion } = require('../services/osintService');
const { protect } = require('../middleware/authMiddleware');
const { apiLimiter } = require('../middleware/rateLimiter');
const Issue = require('../models/Issue');

router.post('/:id/helpful', protect, apiLimiter, voteHelpful);
router.post('/:id/suspicious', protect, apiLimiter, voteSuspicious);

router.get('/:id/news', protect, apiLimiter, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Signalement introuvable' });
    const articles = await fetchNewsForRegion(issue);
    res.json(articles);
  } catch {
    res.status(500).json({ message: 'Erreur' });
  }
});

module.exports = router;
