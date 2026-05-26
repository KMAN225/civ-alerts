const Issue = require('../models/Issue');

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedIssue) return res.status(404).json({ message: 'Signalement introuvable' });
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
