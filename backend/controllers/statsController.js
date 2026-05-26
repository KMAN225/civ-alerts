const Issue = require('../models/Issue');
const User = require('../models/User');

exports.getStats = async (req, res) => {
  try {
    const [resolvedIssues, inProgressIssues, totalIssues, totalUsers] = await Promise.all([
      Issue.countDocuments({ status: 'Résolu', deletedAt: null }),
      Issue.countDocuments({ status: 'En cours', deletedAt: null }),
      Issue.countDocuments({ deletedAt: null }),
      User.countDocuments({})
    ]);

    res.json({
      resolvedIssues,
      inProgressIssues,
      totalIssues,
      totalSectors: 6,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur chargement statistiques' });
  }
};
