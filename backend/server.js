require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

const isProd = process.env.NODE_ENV === 'production';

// Sécurité et performances
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(cors({
  origin: isProd ? process.env.FRONTEND_URL || true : true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Rendre le dossier uploads accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir le frontend buildé en production
if (isProd) {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendDist, 'index.html'));
    }
  });
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connecté'))
  .catch(err => console.log('❌ Erreur DB:', err));

app.use('/api/issues', issueRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:');
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Une erreur interne est survenue sur le serveur',
    error: !isProd ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT} [${isProd ? 'PROD' : 'DEV'}]`));
