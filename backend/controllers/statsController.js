const Issue = require('../models/Issue');
const User = require('../models/User');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.getStats = async (req, res) => {
  try {
    const [resolvedIssues, inProgressIssues, totalIssues, totalUsers] = await Promise.all([
      Issue.countDocuments({ status: 'Résolu', deletedAt: null }),
      Issue.countDocuments({ status: 'En cours', deletedAt: null }),
      Issue.countDocuments({ deletedAt: null }),
      User.countDocuments({})
    ]);

    successResponse(res, { resolvedIssues, inProgressIssues, totalIssues, totalSectors: 6, totalUsers });
  } catch (err) {
    errorResponse(res, 500, 'Erreur chargement statistiques');
  }
};
