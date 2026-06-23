const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { errorResponse, successResponse } = require('../utils/errorResponse');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const formatUser = (user) => ({
  id: user._id, username: user.username, role: user.role,
  nom: user.nom, prenom: user.prenom,
  dateNaissance: user.dateNaissance ? new Date(user.dateNaissance).toISOString().split('T')[0] : null,
  localite: user.localite,
});

const handleError = (res, err) => {
  const msg = process.env.NODE_ENV === 'production' ? 'Erreur interne du serveur' : err.message;
  errorResponse(res, 500, msg);
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password, nom, prenom, dateNaissance, localite } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return errorResponse(res, 400, 'Cet utilisateur ou email existe déjà');

    const user = new User({ username, email, password, nom, prenom, dateNaissance, localite });
    await user.save();

    const token = generateToken(user._id);
    successResponse(res, { token, user: formatUser(user) }, 201);
  } catch (err) {
    handleError(res, err);
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    if (!user) return errorResponse(res, 400, 'Identifiants invalides');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return errorResponse(res, 400, 'Identifiants invalides');

    const token = generateToken(user._id);
    successResponse(res, { token, user: formatUser(user) });
  } catch (err) {
    handleError(res, err);
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    successResponse(res, formatUser(user));
  } catch (err) {
    handleError(res, err);
  }
};

exports.logout = async (req, res) => {
  try {
    successResponse(res, { message: 'Déconnexion réussie' });
  } catch (err) {
    handleError(res, err);
  }
};
