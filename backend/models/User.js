const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nom: { type: String, default: '' },
  prenom: { type: String, default: '' },
  dateNaissance: { type: Date, default: null },
  localite: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  trustScore: { type: Number, default: 0 },
  issuesCount: { type: Number, default: 0 },
  helpfulVotesReceived: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
