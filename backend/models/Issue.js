const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sector: {
    type: String,
    enum: ['Agriculture', 'Santé', 'Éducation', 'Transport', 'Numérique', 'Énergie'],
    required: true
  },
  location: { type: String, required: true },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: []
    }
  },
  priority: { type: String, enum: ['Faible', 'Moyenne', 'Critique'], default: 'Moyenne' },
  votes: { type: Number, default: 0 },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Signalé', 'En cours', 'Résolu'], default: 'Signalé' },
  verified: { type: Boolean, default: false }, // Ajouté pour la crédibilité
  aiProcessed: { type: Boolean, default: false },
  moderated: { type: Boolean, default: false },
  mediaUrl: { type: String },
  videoUrl: { type: String },
  suspiciousVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  helpfulVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hidden: { type: Boolean, default: false },
  duplicateOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', default: null },
  deletedAt: { type: Date, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

IssueSchema.index({ deletedAt: 1, votes: -1 });
IssueSchema.index({ userId: 1, deletedAt: 1 });
IssueSchema.index({ status: 1, deletedAt: 1 });
IssueSchema.index({ deletedAt: 1, createdAt: -1 });
IssueSchema.index({ title: 1, location: 1 });
IssueSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Issue', IssueSchema);
