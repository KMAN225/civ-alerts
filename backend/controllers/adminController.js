const Issue = require('../models/Issue');
const Counter = require('../models/Counter');
const { errorResponse, successResponse } = require('../utils/errorResponse');
const User = require('../models/User');

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findOne({ _id: req.params.id, deletedAt: null });
    if (!issue) return errorResponse(res, 404, 'Signalement introuvable');

    issue.status = status;
    await issue.save();
    successResponse(res, issue);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.refreshTrustScores = async (req, res) => {
  try {
    const users = await User.find({}).lean();
    const { calculateTrustScore } = require('../services/osintService');
    let updated = 0;
    for (const user of users) {
      const score = await calculateTrustScore(user._id);
      await User.findByIdAndUpdate(user._id, { trustScore: score });
      updated++;
    }
    const updatedUsers = await User.find({}).lean();
    const lowTrustIds = updatedUsers.filter(u => u.trustScore < 20).map(u => u._id);
    const highTrustIds = updatedUsers.filter(u => u.trustScore >= 20).map(u => u._id);
    if (highTrustIds.length > 0) {
      await Issue.updateMany(
        { deletedAt: null, userId: { $in: highTrustIds } },
        { $set: { hidden: false } }
      );
    }
    if (lowTrustIds.length > 0) {
      await Issue.updateMany(
        { deletedAt: null, userId: { $in: lowTrustIds } },
        { $set: { hidden: true } }
      );
    }
    successResponse(res, { message: `${updated} utilisateurs mis à jour` });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getStats = async (req, res) => {
  try {
    const [aggregated, visitsDoc, totalCount] = await Promise.all([
      Issue.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Counter.findOne({ name: 'visits' }),
      Issue.countDocuments({ deletedAt: null })
    ]);
    successResponse(res, { issues: aggregated, totalVisits: visitsDoc?.value || 0, totalCount });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getPaginatedIssues = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [issues, total] = await Promise.all([
      Issue.find({ deletedAt: null }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Issue.countDocuments({ deletedAt: null })
    ]);

    successResponse(res, {
      issues,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
