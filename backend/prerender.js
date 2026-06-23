const fs = require('fs');
const path = require('path');

const FRONTEND_DIST = path.join(__dirname, '..', 'frontend', 'dist');
const INDEX_HTML = path.join(FRONTEND_DIST, 'index.html');

const routeConfigs = {
  '/': {
    title: 'CIV-Alerts | Portail National de Signalement Citoyen - Côte d\'Ivoire',
    description: 'CIV-Alerts est le portail national de signalement citoyen en Côte d\'Ivoire. Signalez les dysfonctionnements urbains et sectoriels : agriculture, santé, éducation, transport, numérique, énergie.',
  },
  '/about': {
    title: 'À propos | CIV-Alerts — Portail National de Signalement',
    description: 'Découvrez la mission, la vision et les valeurs de CIV-Alerts : faciliter la communication entre citoyens et autorités ivoiriennes pour améliorer notre cadre de vie.',
    content: `<div class="civ-seo-content">
      <header style="padding:1.5rem;border-bottom:1px solid #e5e7eb;">
        <nav style="display:flex;justify-content:space-between;align-items:center;max-width:80rem;margin:0 auto;">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <strong style="font-size:1.1rem;color:#1a1a1a;">CIV<span style="color:#f89406;">-Alerts</span></strong>
            <span style="font-size:0.6rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">Portail National</span>
          </div>
          <a href="/" style="font-size:0.75rem;color:#008532;font-weight:700;">Accueil</a>
        </nav>
      </header>
      <main style="max-width:80rem;margin:0 auto;padding:2rem 1.5rem;">
        <div style="background:#008532;border-radius:1rem;padding:1.5rem;color:white;margin-bottom:1.5rem;">
          <div style="background:rgba(255,255,255,0.15);display:inline-block;padding:0.25rem 0.75rem;border-radius:1rem;font-size:0.6rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.2);margin-bottom:1rem;">Plateforme d'intérêt public</div>
          <h1 style="font-size:1.75rem;font-weight:900;margin-bottom:0.5rem;">CIV<span style="color:#f89406;">-Alerts</span></h1>
          <p style="opacity:0.8;line-height:1.5;">Portail national de signalement citoyen des dysfonctionnements urbains et sectoriels en République de Côte d'Ivoire.</p>
        </div>
        <div style="display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap;">
          <div style="flex:1;min-width:120px;text-align:center;"><strong style="font-size:1.5rem;color:#008532;display:block;">6</strong><span style="font-size:0.7rem;color:#9ca3af;display:block;">Secteurs</span><span style="font-size:0.65rem;color:#d1d5db;">Agriculture, Santé, Éducation, Transport, Numérique, Énergie</span></div>
          <div style="flex:1;min-width:120px;text-align:center;"><strong style="font-size:1.5rem;color:#008532;display:block;">IA</strong><span style="font-size:0.7rem;color:#9ca3af;display:block;">Intégrée</span><span style="font-size:0.65rem;color:#d1d5db;">Catégorisation et priorisation automatiques</span></div>
          <div style="flex:1;min-width:120px;text-align:center;"><strong style="font-size:1.5rem;color:#008532;display:block;">24/7</strong><span style="font-size:0.7rem;color:#9ca3af;display:block;">Disponibilité</span><span style="font-size:0.65rem;color:#d1d5db;">Signalement et suivi en temps réel</span></div>
        </div>
        <div class="features">
          <div class="feature"><div class="num">01</div><div><strong>Mission</strong><br /><span style="font-size:0.8rem;color:#6b7280;">Faciliter la communication entre les citoyens et les autorités ivoiriennes en digitalisant le signalement des dysfonctionnements urbains et sectoriels, pour une résolution rapide et transparente.</span></div></div>
          <div class="feature"><div class="num orange">02</div><div><strong>Vision</strong><br /><span style="font-size:0.8rem;color:#6b7280;">Bâtir une Côte d'Ivoire où chaque citoyen est acteur de l'amélioration de son cadre de vie, grâce à des outils numériques souverains, transparents et accessibles à tous.</span></div></div>
          <div class="feature"><div class="num blue">03</div><div><strong>Valeurs</strong><br /><span style="font-size:0.8rem;color:#6b7280;">Transparence intégrale des processus, engagement citoyen, innovation technologique au service de l'intérêt général et traitement équitable de chaque signalement.</span></div></div>
        </div>
        <h2>Fonctionnement</h2>
        <div class="steps">
          <div class="step"><span class="num">1</span><p><strong>Identification</strong> : Repérez un dysfonctionnement dans votre localité</p></div>
          <div class="step"><span class="num">2</span><p><strong>Signalement</strong> : Soumettez via notre formulaire avec photo</p></div>
          <div class="step"><span class="num">3</span><p><strong>Traitement IA</strong> : Notre IA catégorise et priorise automatiquement</p></div>
          <div class="step"><span class="num">4</span><p><strong>Instruction</strong> : Les autorités notifiées traitent le dossier</p></div>
          <div class="step"><span class="num">5</span><p><strong>Suivi</strong> : Suivez la résolution en temps réel</p></div>
        </div>
        <hr />
        <p style="font-size:0.75rem;color:#9ca3af;font-style:italic;">CIV-Alerts est une plateforme indépendante. Les signalements sont transmis aux autorités compétentes sans garantie de délai de traitement.</p>
      </main>
      <footer style="background:#1a1a1a;padding:2rem 1.5rem;color:#9ca3af;font-size:0.75rem;">
        <div style="max-width:80rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:3rem;">
          <div style="flex:2;min-width:200px;">
            <strong style="color:white;font-size:1rem;">CIV<span style="color:#f89406;">-Alerts</span></strong>
            <p style="color:#6b7280;line-height:1.5;">Plateforme citoyenne de signalement.</p>
          </div>
          <div>
            <h4 style="color:white;font-size:0.6rem;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:0.75rem;">Liens</h4>
            <ul style="list-style:none;margin:0;padding:0;">
              <li style="margin-bottom:0.25rem;"><a href="/terms" style="color:#6b7280;text-decoration:none;">Conditions</a></li>
              <li style="margin-bottom:0.25rem;"><a href="/privacy" style="color:#6b7280;text-decoration:none;">Confidentialité</a></li>
              <li style="margin-bottom:0.25rem;"><a href="/contact" style="color:#6b7280;text-decoration:none;">Contact</a></li>
            </ul>
          </div>
        </div>
        <div style="max-width:80rem;margin:1.5rem auto 0;padding-top:1.5rem;border-top:1px solid #374151;text-align:center;">© 2026 CIV-Alerts. Côte d'Ivoire.</div>
      </footer>
    </div>`
  },
  '/terms': {
    title: 'Conditions Générales d\'Utilisation | CIV-Alerts',
    description: 'Consultez les conditions générales d\'utilisation de la plateforme CIV-Alerts. CGU régissant l\'accès et l\'utilisation du portail de signalement citoyen.',
    content: `<div class="civ-seo-content">
      <header style="padding:1.5rem;border-bottom:1px solid #e5e7eb;">
        <nav style="display:flex;justify-content:space-between;align-items:center;max-width:80rem;margin:0 auto;">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <strong style="font-size:1.1rem;color:#1a1a1a;">CIV<span style="color:#f89406;">-Alerts</span></strong>
            <span style="font-size:0.6rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">Portail National</span>
          </div>
          <a href="/" style="font-size:0.75rem;color:#008532;font-weight:700;">Accueil</a>
        </nav>
      </header>
      <main style="max-width:80rem;margin:0 auto;padding:2rem 1.5rem;">
        <div style="background:#1f2937;border-radius:1rem;padding:1.5rem;color:white;margin-bottom:1rem;">
          <div style="background:rgba(255,255,255,0.1);display:inline-block;padding:0.25rem 0.75rem;border-radius:1rem;font-size:0.6rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.1);margin-bottom:0.75rem;">Document légal</div>
          <h1 style="font-size:1.5rem;font-weight:900;margin-bottom:0.25rem;">Conditions Générales d'Utilisation</h1>
          <p style="opacity:0.5;font-size:0.75rem;">Dernière mise à jour : Mai 2026</p>
        </div>
        <div style="background:#f3f4f6;border-radius:0.75rem;padding:1rem;margin-bottom:1rem;">
          <p style="font-size:0.8rem;color:#6b7280;line-height:1.5;"><strong>Préambule :</strong> Les présentes Conditions Générales d'Utilisation (ci-après "CGU") sont conclues entre l'Éditeur de la plateforme CIV-Alerts et toute personne physique ou morale accédant à la plateforme ou créant un compte (ci-après "l'Utilisateur").</p>
        </div>
        <div style="background:white;border-radius:1rem;padding:1.25rem;border:1px solid #f3f4f6;">
          <div class="legal-section"><h3>1. Objet</h3><p>Les présentes CGU régissent l'accès et l'utilisation de la plateforme CIV-Alerts. La plateforme a pour objet de permettre aux citoyens de signaler des dysfonctionnements urbains et sectoriels sur le territoire de la République de Côte d'Ivoire, et d'en assurer le suivi auprès des autorités compétentes.</p></div>
          <div class="legal-section"><h3>2. Acceptation des conditions</h3><p>En accédant à la plateforme et en créant un compte, l'Utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepter sans réserve. Si l'Utilisateur n'est pas d'accord avec ces conditions, il doit cesser d'utiliser la plateforme.</p></div>
          <div class="legal-section"><h3>3. Création et gestion du compte</h3><p>La création d'un compte est subordonnée à la fourniture d'informations exactes et à jour. L'Utilisateur est seul responsable de la confidentialité de ses identifiants de connexion.</p></div>
          <div class="legal-section"><h3>4. Obligations de l'Utilisateur</h3><p>L'Utilisateur s'engage à : (a) ne signaler que des faits réels et vérifiables ; (b) ne pas diffuser de contenus injurieux, diffamatoires, racistes ou contraires aux lois ivoiriennes ; (c) ne pas utiliser la plateforme à des fins commerciales non autorisées. Tout manquement peut entraîner la suspension immédiate du compte.</p></div>
          <div class="legal-section"><h3>5. Traitement des signalements</h3><p>CIV-Alerts transmet les signalements aux autorités compétentes mais ne constitue pas un service d'urgence. Pour toute situation d'urgence, contactez les services appropriés (police, pompiers, SAMU). CIV-Alerts ne peut garantir un délai de résolution spécifique.</p></div>
          <div class="legal-section"><h3>6. Propriété intellectuelle</h3><p>Le code source est publié sous licence MIT. Les contenus générés par les Utilisateurs restent la propriété de leurs auteurs, avec une licence d'utilisation accordée à CIV-Alerts pour les besoins du traitement et de l'affichage.</p></div>
          <div class="legal-section"><h3>7. Protection des données</h3><p>Les données personnelles collectées sont traitées conformément à notre Politique de Confidentialité et à la réglementation en vigueur, notamment la loi n°2013-450 relative à la protection des données à caractère personnel en République de Côte d'Ivoire.</p></div>
          <div class="legal-section"><h3>8. Limitation de responsabilité</h3><p>CIV-Alerts agit comme intermédiaire technique entre les citoyens et les autorités. La plateforme ne saurait être tenue responsable de l'inaction ou du délai de traitement des autorités compétentes.</p></div>
          <div class="legal-section"><h3>9. Modification des CGU</h3><p>Les présentes CGU peuvent être modifiées à tout moment. Les Utilisateurs seront informés de toute modification substantielle par email ou via une notification sur la plateforme.</p></div>
          <div class="legal-section"><h3>10. Droit applicable et juridiction</h3><p>Les présentes CGU sont soumises au droit ivoirien. Tout litige relatif à leur interprétation ou exécution relève de la compétence des tribunaux d'Abidjan, République de Côte d'Ivoire.</p></div>
        </div>
        <p style="font-size:0.75rem;color:#6b7280;margin-top:1rem;text-align:center;">Pour toute question : <strong style="color:#008532;">contact@civ-alerts.ci</strong></p>
      </main>
      <footer style="background:#1a1a1a;padding:2rem 1.5rem;color:#9ca3af;font-size:0.75rem;">
        <div style="max-width:80rem;margin:0 auto;text-align:center;">© 2026 CIV-Alerts. Côte d'Ivoire.</div>
      </footer>
    </div>`
  },
  '/privacy': {
    title: 'Politique de Confidentialité | CIV-Alerts',
    description: 'Politique de confidentialité de CIV-Alerts. Comment nous collectons, utilisons et protégeons vos données personnelles conformément à la loi ivoirienne n°2013-450.',
    content: `<div class="civ-seo-content">
      <header style="padding:1.5rem;border-bottom:1px solid #e5e7eb;">
        <nav style="display:flex;justify-content:space-between;align-items:center;max-width:80rem;margin:0 auto;">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <strong style="font-size:1.1rem;color:#1a1a1a;">CIV<span style="color:#f89406;">-Alerts</span></strong>
            <span style="font-size:0.6rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">Portail National</span>
          </div>
          <a href="/" style="font-size:0.75rem;color:#008532;font-weight:700;">Accueil</a>
        </nav>
      </header>
      <main style="max-width:80rem;margin:0 auto;padding:2rem 1.5rem;">
        <div style="background:#1f2937;border-radius:1rem;padding:1.5rem;color:white;margin-bottom:1rem;">
          <div style="background:rgba(255,255,255,0.1);display:inline-block;padding:0.25rem 0.75rem;border-radius:1rem;font-size:0.6rem;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.1);margin-bottom:0.75rem;">Vie privée</div>
          <h1 style="font-size:1.5rem;font-weight:900;margin-bottom:0.25rem;">Politique de Confidentialité</h1>
          <p style="opacity:0.5;font-size:0.75rem;">Conforme à la loi n°2013-450 — Mai 2026</p>
        </div>
        <div style="background:#f3f4f6;border-radius:0.75rem;padding:1rem;margin-bottom:1rem;">
          <p style="font-size:0.8rem;color:#6b7280;line-height:1.5;">CIV-Alerts accorde une importance capitale à la protection de vos données personnelles. La présente politique vous informe de la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme.</p>
        </div>
        <div style="background:white;border-radius:1rem;padding:1.25rem;border:1px solid #f3f4f6;">
          <div class="legal-section"><h3>1. Responsable du traitement</h3><p>Le responsable du traitement est l'Éditeur de la plateforme CIV-Alerts. Contact : contact@civ-alerts.ci.</p></div>
          <div class="legal-section"><h3>2. Données collectées</h3><p>Nous collectons : données d'identification (nom, prénom, email), données de connexion (IP, logs), données de signalement (localisation, description, photos), données de vote et d'interaction.</p></div>
          <div class="legal-section"><h3>3. Base légale du traitement</h3><p>Le traitement repose sur votre consentement explicite, l'exécution des mesures contractuelles, et notre intérêt légitime à améliorer et sécuriser la plateforme.</p></div>
          <div class="legal-section"><h3>4. Finalités du traitement</h3><p>Vos données sont traitées pour : la gestion de votre compte, le traitement de vos signalements, l'amélioration de la plateforme, les communications relatives à vos signalements, et le respect des obligations légales.</p></div>
          <div class="legal-section"><h3>5. Destinataires des données</h3><p>Vos données peuvent être transmises aux autorités compétentes, aux hébergeurs techniques (Render, MongoDB Atlas), et aux services d'IA (Anthropic Claude). Nous ne vendons ni ne partageons vos données à des fins commerciales.</p></div>
          <div class="legal-section"><h3>6. Durée de conservation</h3><p>Données de compte : jusqu'à la suppression. Données de signalement : 5 ans après résolution. Logs de connexion : 12 mois.</p></div>
          <div class="legal-section"><h3>7. Vos droits</h3><p>Conformément à la loi n°2013-450, vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données.</p></div>
          <div class="legal-section"><h3>8. Sécurité</h3><p>Nous mettons en œuvre des mesures techniques : chiffrement HTTPS, hachage des mots de passe (bcrypt), authentification par token JWT, et segmentation des accès.</p></div>
          <div class="legal-section"><h3>9. Cookies</h3><p>La plateforme utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking tiers n'est utilisé.</p></div>
          <div class="legal-section"><h3>10. Contact et réclamation</h3><p>Pour exercer vos droits : contact@civ-alerts.ci. En cas de litige, vous pouvez saisir l'Autorité de Protection des Données à Caractère Personnel (APDP) de Côte d'Ivoire.</p></div>
        </div>
        <p style="font-size:0.75rem;color:#6b7280;margin-top:1rem;text-align:center;">Pour exercer vos droits : <strong style="color:#008532;">contact@civ-alerts.ci</strong></p>
      </main>
      <footer style="background:#1a1a1a;padding:2rem 1.5rem;color:#9ca3af;font-size:0.75rem;">
        <div style="max-width:80rem;margin:0 auto;text-align:center;">© 2026 CIV-Alerts. Côte d'Ivoire.</div>
      </footer>
    </div>`
  },
  '/contact': {
    title: 'Contact | CIV-Alerts',
    description: 'Contactez l\'équipe CIV-Alerts. Une question, un partenariat ou un problème technique ? Notre équipe vous répond sous 48 heures ouvrées.',
    content: `<div class="civ-seo-content">
      <header style="padding:1.5rem;border-bottom:1px solid #e5e7eb;">
        <nav style="display:flex;justify-content:space-between;align-items:center;max-width:80rem;margin:0 auto;">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <strong style="font-size:1.1rem;color:#1a1a1a;">CIV<span style="color:#f89406;">-Alerts</span></strong>
            <span style="font-size:0.6rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;">Portail National</span>
          </div>
          <a href="/" style="font-size:0.75rem;color:#008532;font-weight:700;">Accueil</a>
        </nav>
      </header>
      <main style="max-width:80rem;margin:0 auto;padding:2rem 1.5rem;">
        <div style="background:#008532;border-radius:1rem;padding:1.5rem;color:white;margin-bottom:1.5rem;">
          <h1 style="font-size:1.75rem;font-weight:900;margin-bottom:0.5rem;">Contactez-nous</h1>
          <p style="opacity:0.75;line-height:1.5;">Une question, une suggestion, un partenariat ou un problème technique ? Notre équipe vous répondra sous 48 heures ouvrées.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div class="info-item"><div style="width:2.5rem;height:2.5rem;background:rgba(0,133,50,0.1);border-radius:0.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="font-size:1rem;">✉</span></div><div><strong style="font-size:0.75rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Email</strong><br /><span style="font-size:0.9rem;color:#1a1a1a;font-weight:700;">contact@civ-alerts.ci</span></div></div>
          <div class="info-item"><div style="width:2.5rem;height:2.5rem;background:rgba(248,148,6,0.1);border-radius:0.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="font-size:1rem;">📍</span></div><div><strong style="font-size:0.75rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Adresse</strong><br /><span style="font-size:0.9rem;color:#1a1a1a;font-weight:700;">Abidjan, Côte d'Ivoire</span><br /><span style="font-size:0.7rem;color:#9ca3af;">Plateforme nationale</span></div></div>
          <div class="info-item"><div style="width:2.5rem;height:2.5rem;background:rgba(37,99,235,0.1);border-radius:0.75rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="font-size:1rem;">🕐</span></div><div><strong style="font-size:0.75rem;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;">Horaires</strong><br /><span style="font-size:0.9rem;color:#1a1a1a;font-weight:700;">Lun - Ven : 08h00 - 17h00</span><br /><span style="font-size:0.7rem;color:#9ca3af;">Fuseau UTC+0 (Abidjan)</span></div></div>
        </div>
      </main>
      <footer style="background:#1a1a1a;padding:2rem 1.5rem;color:#9ca3af;font-size:0.75rem;">
        <div style="max-width:80rem;margin:0 auto;text-align:center;">© 2026 CIV-Alerts. Côte d'Ivoire.</div>
      </footer>
    </div>`
  }
};

let baseHtml = '';

function init() {
  try {
    if (fs.existsSync(INDEX_HTML)) {
      baseHtml = fs.readFileSync(INDEX_HTML, 'utf-8');
      console.log('✅ Prerender : index.html chargé');
    } else {
      console.warn('⚠️ Prerender : dist/index.html introuvable, fallback sur fichier vide');
      baseHtml = '<!DOCTYPE html><html lang="fr"><head><title>CIV-Alerts</title></head><body><div id="root"></div></body></html>';
    }
  } catch (err) {
    console.error('❌ Prerender : erreur lecture index.html', err.message);
    baseHtml = '<!DOCTYPE html><html lang="fr"><head><title>CIV-Alerts</title></head><body><div id="root"></div></body></html>';
  }
}

function getHTML(route) {
  const config = routeConfigs[route];
  if (!config) return baseHtml;

  let html = baseHtml;

  // Remplacer le titre
  html = html.replace(/<title>.*?<\/title>/, `<title>${config.title}</title>`);

  // Remplacer ou ajouter meta description
  const descRegex = /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i;
  const newMeta = `<meta name="description" content="${config.description}" />`;
  if (descRegex.test(html)) {
    html = html.replace(descRegex, newMeta);
  } else {
    html = html.replace('</head>', `  ${newMeta}\n  </head>`);
  }

  // Remplacer ou ajouter OG description
  const ogDescRegex = /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i;
  const newOgMeta = `<meta property="og:description" content="${config.description}" />`;
  if (ogDescRegex.test(html)) {
    html = html.replace(ogDescRegex, newOgMeta);
  } else {
    html = html.replace('</head>', `  ${newOgMeta}\n  </head>`);
  }

  // Remplacer le contenu dans <div id="root">
  // On découpe entre l'ouverture de #root et le </body> pour insérer le contenu de la route
  if (config.content) {
    const rootMarker = '<div id="root">';
    const bodyClose = '</body>';
    const rootIdx = html.indexOf(rootMarker);
    const bodyIdx = html.indexOf(bodyClose);
    if (rootIdx !== -1 && bodyIdx !== -1) {
      const before = html.substring(0, rootIdx + rootMarker.length);
      const after = html.substring(bodyIdx);
      html = before + config.content + after;
    }
  }

  return html;
}

init();

module.exports = { getHTML, init };
