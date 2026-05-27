const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
