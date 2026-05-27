const Contact = require('../models/Contact');
const { errorResponse, successResponse } = require('../utils/errorResponse');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return errorResponse(res, 400, 'Tous les champs sont obligatoires');
    }
    await Contact.create({ name, email, subject, message });
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
