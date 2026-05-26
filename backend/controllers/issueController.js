const Issue = require('../models/Issue');
const { analyzeIssue } = require('../services/aiService');

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ deletedAt: null }).sort({ votes: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
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
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.voteIssue = async (req, res) => {
  try {
    const userId = req.user._id;
    const issue = await Issue.findOne({ _id: req.params.id, deletedAt: null });
    if (!issue) return res.status(404).json({ message: 'Signalement introuvable' });

    if (issue.voters.includes(userId)) {
      return res.status(400).json({ message: 'Vous avez déjà voté pour ce signalement' });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 }, $push: { voters: userId } },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.id, deletedAt: null });
    if (!issue) return res.status(404).json({ message: 'Signalement introuvable' });

    if (issue.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce signalement' });
    }

    issue.deletedAt = new Date();
    await issue.save();
    res.json({ message: 'Signalement déplacé dans la corbeille' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTrash = async (req, res) => {
  try {
    const issues = await Issue.find({
      userId: req.user._id,
      deletedAt: { $ne: null }
    }).sort({ deletedAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.restoreIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      userId: req.user._id,
      deletedAt: { $ne: null }
    });
    if (!issue) return res.status(404).json({ message: 'Signalement introuvable dans la corbeille' });

    issue.deletedAt = null;
    await issue.save();
    res.json({ message: 'Signalement restauré' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.permanentDelete = async (req, res) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.id,
      userId: req.user._id,
      deletedAt: { $ne: null }
    });
    if (!issue) return res.status(404).json({ message: 'Signalement introuvable dans la corbeille' });

    await issue.deleteOne();
    res.json({ message: 'Signalement supprimé définitivement' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
