const Contact = require('../models/Contact');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return errorResponse(res, 400, 'Tous les champs sont obligatoires');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse(res, 400, 'Format d\'email invalide');
    }
    if (typeof subject !== 'string' || subject.length < 3 || subject.length > 200) {
      return errorResponse(res, 400, 'Le sujet doit contenir entre 3 et 200 caractères');
    }
    if (typeof message !== 'string' || message.length < 10 || message.length > 5000) {
      return errorResponse(res, 400, 'Le message doit contenir entre 10 et 5000 caractères');
    }
    await Contact.create({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() });
    successResponse(res, { message: 'Message envoyé avec succès' }, 201);
  } catch (err) {
    errorResponse(res, 500, 'Erreur lors de l\'envoi du message');
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    successResponse(res, messages);
  } catch (err) {
    errorResponse(res, 500, 'Erreur serveur');
  }
};
