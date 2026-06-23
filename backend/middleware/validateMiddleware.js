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
  body('username').trim().escape().isLength({ min: 3, max: 30 }).withMessage('Le nom d\'utilisateur doit contenir entre 3 et 30 caractères')
    .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Le nom d\'utilisateur ne doit contenir que des lettres, chiffres, tirets et underscores'),
  body('email').trim().normalizeEmail().isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir une majuscule')
    .matches(/[0-9]/).withMessage('Le mot de passe doit contenir un chiffre'),
  body('nom').optional().trim().escape().isLength({ max: 50 }),
  body('prenom').optional().trim().escape().isLength({ max: 50 }),
  body('dateNaissance').optional().trim().custom(value => {
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('La date de naissance doit être au format AAAA-MM-JJ');
    }
    const date = new Date(value);
    if (value && (isNaN(date.getTime()) || date > new Date())) {
      throw new Error('Date de naissance invalide (ne peut pas être dans le futur)');
    }
    return true;
  }),
  body('localite').optional().trim().escape().isLength({ max: 100 }),
  handleValidationErrors
];

const validateLogin = [
  body('identifier').trim().notEmpty().withMessage('Identifiant requis'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
  handleValidationErrors
];

const validateIssue = [
  body('title').trim().escape().isLength({ min: 3, max: 200 }).withMessage('Le titre doit contenir entre 3 et 200 caractères'),
  body('description').trim().escape().isLength({ min: 5, max: 2000 }).withMessage('La description doit contenir au moins 5 caractères'),
  body('location').trim().escape().notEmpty().withMessage('La localisation est requise'),
  handleValidationErrors
];

module.exports = { validateSignup, validateLogin, validateIssue };
