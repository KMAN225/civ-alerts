<div align="center">
  <h1>CIV-Alerts</h1>
  <p><strong>Portail National de Signalement — République de Côte d'Ivoire</strong></p>
  <p>
    <a href="https://civ-alerts.onrender.com">civ-alerts.onrender.com</a>
  </p>
  <br>
</div>

Plateforme citoyenne de signalement des anomalies urbaines et sectorielles en Côte d'Ivoire. Les citoyens peuvent signaler des problèmes (nids-de-poule, coupures d'électricité, dysfonctionnements dans la santé/l'éducation/etc.), voter pour prioriser les signalements, et suivre leur traitement par les autorités.

---

## Stack

| Frontend | Backend | Infrastructure |
|----------|---------|---------------|
| React 18 + Vite | Node.js + Express 4 | MongoDB Atlas (M0) |
| Tailwind CSS 3 | Mongoose 7 | Render (Web Service) |
| Leaflet / react-leaflet | JWT + bcryptjs | GitHub |
| react-router-dom 7 | Anthropic Claude 3.5 | UptimeRobot |

---

## Fonctionnalités

- **Signalement** — formulaire avec analyse IA (Claude suggère secteur et priorité)
- **Carte interactive** — visualisation géolocalisée des signalements (OpenStreetMap + Leaflet)
- **Vote communautaire** — les citoyens votent pour prioriser les problèmes
- **Filtres** — par secteur (Agriculture, Santé, Éducation, Transport, Numérique, Énergie) et priorité
- **Corbeille** — suppression soft avec restauration et suppression définitive
- **Panneau admin** — gestion des statuts (Signalé → En cours → Résolu)
- **Statistiques** — compteurs en direct (signalements, résolus, utilisateurs)
- **Pages légales** — CGU, Confidentialité, Contact (conformité droit ivoirien)
- **Monétisation** — Google AdSense intégré

---

## Démarrage local

### Prérequis

- Node.js 18+
- MongoDB (Atlas ou local)
- Clé API Anthropic (optionnelle — l'IA tombe gracefulment)

### Installation

```bash
git clone https://github.com/KMAN225/civ-alerts.git
cd civ-alerts
npm run install:all
```

### Configuration

Crée `backend/.env` :

```env
PORT=5002
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/civalerts
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_key_optional
FRONTEND_URL=http://localhost:5173
```

### Lancement

```bash
# Terminal 1 — Backend
npm start

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Ouvre `http://localhost:5173`.

### Admin

```bash
node backend/fixAdmin.js
```

Crée un admin `admin` / `admin123`.

---

## Structure

```
backend/
├── controllers/      # Logique métier (issues, auth, admin, contact, stats)
├── models/           # Schémas Mongoose (Issue, User, Contact)
├── routes/           # Définitions de routes Express
├── middleware/       # Auth JWT, rate limiting, multer, validation
├── services/         # Anthropic Claude AI
└── utils/            # Helpers (errorResponse)

frontend/
├── src/
│   ├── components/   # Composants React (IssueCard, Hero, MapView, Toast, etc.)
│   ├── pages/        # Pages (Home, AdminDashboard, Trash, About, etc.)
│   ├── utils/        # Helpers (api, auth, dates)
│   └── data/         # Données statiques (secteurs)
└── public/           # ads.txt, favicon
```

---

## Licence

Projet open source sous licence MIT.
