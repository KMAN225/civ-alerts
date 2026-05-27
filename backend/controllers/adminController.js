const Issue = require('../models/Issue');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findOne({ _id: req.params.id, deletedAt: null });
    if (!issue) return errorResponse(res, 404, 'Signalement introuvable');

    issue.status = status;
    await issue.save();
    successResponse(res, issue);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    successResponse(res, stats);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
