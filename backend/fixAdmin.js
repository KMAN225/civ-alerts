const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function fixAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    // Supprimer l'ancien admin pour éviter le double hachage
    await User.deleteOne({ username: 'admin' });
    console.log('🗑️ Ancien admin supprimé');

    // Créer le nouvel admin avec le mot de passe en CLAIR
    // Le middleware UserSchema.pre('save') s'occupera du hachage automatique
    const admin = new User({
      username: 'admin',
      email: 'admin@civalerts.ci',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('🚀 Nouveau compte admin créé avec succès !');
    console.log('Identifiants : admin / admin123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur:', err);
    process.exit(1);
  }
}

fixAdmin();
