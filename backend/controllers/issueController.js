const fs = require('fs');
const mongoose = require('mongoose');
const Issue = require('../models/Issue');
const User = require('../models/User');
const { analyzeIssue } = require('../services/aiService');
const { moderateImage, moderateVideo } = require('../services/moderationService');
const { checkDuplicate, calculateTrustScore } = require('../services/osintService');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ deletedAt: null, hidden: false }).sort({ votes: -1 });
    successResponse(res, issues);
  } catch (err) {
    errorResponse(res, 500, 'Erreur serveur');
  }
};

exports.createIssue = async (req, res) => {
  try {
    const { title, description, sector, priority } = req.body;

    const duplicates = await checkDuplicate(title, req.body.location);
    if (duplicates.length > 0) {
      return errorResponse(res, 409, 'Un signalement similaire existe déjà', { duplicates });
    }

    if (req.files?.image?.[0]) {
      const imageResult = await moderateImage(req.files.image[0].path);
      if (!imageResult.safe) {
        fs.unlink(req.files.image[0].path, () => {});
        return errorResponse(res, 400, 'Image refusée : ' + (imageResult.reason || 'contenu inapproprié détecté'));
      }
    }

    if (req.files?.video?.[0]) {
      const videoResult = await moderateVideo(req.files.video[0].path);
      if (!videoResult.safe) {
        fs.unlink(req.files.video[0].path, () => {});
        return errorResponse(res, 400, videoResult.reason || 'Vidéo refusée');
      }
    }

    const aiAnalysis = await analyzeIssue(title, description);

    const trustScore = await calculateTrustScore(req.user._id);

    const issueData = {
      title,
      description,
      sector: sector || (aiAnalysis ? aiAnalysis.sector : 'Transport'),
      priority: priority || (aiAnalysis ? aiAnalysis.priority : 'Moyenne'),
      location: req.body.location,
      userId: req.user._id,
      aiProcessed: !!aiAnalysis,
      moderated: true,
      hidden: trustScore < 20,
      mediaUrl: req.files?.image?.[0]
        ? `${req.protocol}://${req.get('host')}/uploads/${req.files.image[0].filename}`
        : req.body.mediaUrl,
      videoUrl: req.files?.video?.[0]
        ? `${req.protocol}://${req.get('host')}/uploads/${req.files.video[0].filename}`
        : req.body.videoUrl
    };

    const issue = new Issue(issueData);
    const newIssue = await issue.save();

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { issuesCount: 1 },
      trustScore
    });

    successResponse(res, newIssue, 201);
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};

exports.voteHelpful = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user._id;

    const issue = await Issue.findById(issueId);
    if (!issue || issue.deletedAt) return errorResponse(res, 404, 'Signalement introuvable');

    const alreadyHelpful = issue.helpfulVotes.some(id => id.toString() === userId.toString());
    const alreadySuspicious = issue.suspiciousVotes.some(id => id.toString() === userId.toString());

    if (alreadyHelpful) {
      issue.helpfulVotes.pull(userId);
    } else {
      if (alreadySuspicious) issue.suspiciousVotes.pull(userId);
      issue.helpfulVotes.push(userId);
    }

    await issue.save();
    successResponse(res, {
      helpful: issue.helpfulVotes.length,
      suspicious: issue.suspiciousVotes.length,
      userVote: alreadyHelpful ? null : 'helpful'
    });
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};

exports.voteSuspicious = async (req, res) => {
  try {
    const issueId = req.params.id;
    const userId = req.user._id;

    const issue = await Issue.findById(issueId);
    if (!issue || issue.deletedAt) return errorResponse(res, 404, 'Signalement introuvable');

    const alreadySuspicious = issue.suspiciousVotes.some(id => id.toString() === userId.toString());
    const alreadyHelpful = issue.helpfulVotes.some(id => id.toString() === userId.toString());

    if (alreadySuspicious) {
      issue.suspiciousVotes.pull(userId);
    } else {
      if (alreadyHelpful) issue.helpfulVotes.pull(userId);
      issue.suspiciousVotes.push(userId);
    }

    if (issue.suspiciousVotes.length >= 3) {
      issue.hidden = true;
    }

    await issue.save();
    successResponse(res, {
      helpful: issue.helpfulVotes.length,
      suspicious: issue.suspiciousVotes.length,
      userVote: alreadySuspicious ? null : 'suspicious'
    });
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
