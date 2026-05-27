const Issue = require('../models/Issue');
const { analyzeIssue } = require('../services/aiService');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ deletedAt: null }).sort({ votes: -1 });
    successResponse(res, issues);
  } catch (err) {
    errorResponse(res, 500, 'Erreur serveur');
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { title, description, sector, priority } = req.body;

    const aiAnalysis = await analyzeIssue(title, description);

    const issueData = {
      title,
      description,
      sector: sector || (aiAnalysis ? aiAnalysis.sector : 'Transport'),
      priority: priority || (aiAnalysis ? aiAnalysis.priority : 'Moyenne'),
      location: req.body.location,
      userId: req.user._id,
      aiProcessed: !!aiAnalysis,
      mediaUrl: req.file
        ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        : req.body.mediaUrl
    };

    const issue = new Issue(issueData);
    const newIssue = await issue.save();
    successResponse(res, newIssue, 201);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};

exports.voteIssue = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedIssue = await Issue.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null, voters: { $ne: userId } },
      { $inc: { votes: 1 }, $push: { voters: userId } },
      { new: true }
    );
    if (!updatedIssue) {
      const exists = await Issue.exists({ _id: req.params.id, deletedAt: null });
      if (!exists) return errorResponse(res, 404, 'Signalement introuvable');
      return errorResponse(res, 400, 'Vous avez déjà voté');
    }
    successResponse(res, updatedIssue);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.id, deletedAt: null });
    if (!issue) return errorResponse(res, 404, 'Signalement introuvable');

    if (issue.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Vous n\'êtes pas autorisé à supprimer ce signalement');
    }

    issue.deletedAt = new Date();
    await issue.save();
    successResponse(res, { message: 'Signalement déplacé dans la corbeille' });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.getTrash = async (req, res) => {
  try {
    const issues = await Issue.find({
      userId: req.user._id,
      deletedAt: { $ne: null }
    }).sort({ deletedAt: -1 });
    successResponse(res, issues);
  } catch (err) {
    errorResponse(res, 500, 'Erreur serveur');
  }
};

exports.restoreIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      userId: req.user._id,
      deletedAt: { $ne: null }
    });
    if (!issue) return errorResponse(res, 404, 'Signalement introuvable dans la corbeille');

    issue.deletedAt = null;
    await issue.save();
    successResponse(res, { message: 'Signalement restauré' });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

exports.permanentDelete = async (req, res) => {
  try {
    const result = await Issue.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
      deletedAt: { $ne: null }
    });
    if (!result.deletedCount) return errorResponse(res, 404, 'Signalement introuvable dans la corbeille');
    successResponse(res, { message: 'Signalement supprimé définitivement' });
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
