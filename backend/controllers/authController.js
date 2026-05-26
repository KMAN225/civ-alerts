const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password, nom, prenom, dateNaissance, localite } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: 'Cet utilisateur ou email existe déjà' });

    const user = new User({ username, email, password, nom, prenom, dateNaissance, localite });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id, username: user.username, role: user.role,
        nom: user.nom, prenom: user.prenom, dateNaissance: user.dateNaissance, localite: user.localite,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    if (!user) return res.status(400).json({ message: 'Identifiants invalides' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Identifiants invalides' });

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id, username: user.username, role: user.role,
        nom: user.nom, prenom: user.prenom, dateNaissance: user.dateNaissance, localite: user.localite,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
