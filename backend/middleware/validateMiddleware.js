const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Données invalides',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

const validateSignup = [
  body('username').trim().isLength({ min: 3, max: 30 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 30 caractères'),
  body('email').trim().isEmail().withMessage('Email invalide').normalizeEmail(),
  body('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir une majuscule')
    .matches(/[0-9]/).withMessage('Le mot de passe doit contenir un chiffre'),
  handleValidationErrors
];

const validateLogin = [
  body('identifier').trim().notEmpty().withMessage('Identifiant requis'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
  handleValidationErrors
];

const validateIssue = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères'),
  body('description').trim().isLength({ min: 5, max: 2000 }).withMessage('La description doit contenir au moins 5 caractères'),
  body('location').trim().notEmpty().withMessage('La localisation est requise'),
  handleValidationErrors
];

module.exports = { validateSignup, validateLogin, validateIssue };
