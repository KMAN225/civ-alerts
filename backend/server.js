require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const issueRoutes = require('./routes/issueRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statsRoutes = require('./routes/statsRoutes');
const osintRoutes = require('./routes/osintRoutes');

const app = express();

const isProd = process.env.NODE_ENV === 'production';

// Sécurité
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://pagead2.googlesyndication.com', 'https://www.googletagmanager.com', "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', '*.tile.openstreetmap.org', 'https://pagead2.googlesyndication.com', 'https://googleads.g.doubleclick.net'],
      fontSrc: ["'self'", 'https:', 'data:'],
      connectSrc: ["'self'", 'https://*.tile.openstreetmap.org', 'https://ep1.adtrafficquality.google', 'https://googleads.g.doubleclick.net', 'https://www.googletagmanager.com'],
      formAction: ["'self'"],
      frameAncestors: ["'self'"],
      frameSrc: ["'self'", 'https://googleads.g.doubleclick.net'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
}));
app.use(compression());
app.use(cors({
  origin: isProd ? [process.env.FRONTEND_URL || '', 'null'].filter(Boolean) : true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(mongoSanitize());
app.use(hpp());

// Rendre le dossier uploads accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Servir le frontend buildé en production
if (isProd) {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendDist, 'index.html'));
    } else {
      next();
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
app.use('/api/stats', statsRoutes);
app.use('/api/osint', osintRoutes);

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
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Serveur lancé sur ${HOST}:${PORT} [${isProd ? 'PROD' : 'DEV'}]`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
