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
  mediaUrl: { type: String },
  deletedAt: { type: Date, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', IssueSchema);
