import React from 'react';

const sections = [
  {
    title: '1. Responsable du traitement',
    content: 'Le responsable du traitement des données à caractère personnel est l\'Éditeur de la plateforme CIV-Alerts. Pour toute question relative à vos données, vous pouvez nous contacter à l\'adresse email : contact@civ-alerts.ci.',
  },
  {
    title: '2. Données collectées',
    content: 'Dans le cadre de l\'utilisation de la plateforme, nous collectons les catégories de données suivantes :',
    items: [
      'Données d\'identification : nom, prénom, nom d\'utilisateur, adresse email',
      'Données de connexion : historique de connexion, adresse IP, logs d\'activité',
      'Données de signalement : localisation, description, photographies, date et heure',
      'Données de vote et d\'interaction : préférences de secteurs, votes émis',
    ],
  },
  {
    title: '3. Base légale du traitement',
    content: 'Le traitement de vos données repose sur :',
    items: [
      'Votre consentement explicite lors de la création du compte et de l\'utilisation de la plateforme',
      'L\'exécution des mesures précontractuelles et contractuelles (gestion de votre compte et de vos signalements)',
      'Notre intérêt légitime à améliorer et sécuriser la plateforme',
    ],
  },
  {
    title: '4. Finalités du traitement',
    content: 'Vos données sont traitées exclusivement pour les finalités suivantes :',
    items: [
      'Gestion et administration de votre compte utilisateur',
      'Traitement et suivi de vos signalements auprès des autorités compétentes',
      'Amélioration de la plateforme et de ses fonctionnalités',
      'Communication relative à vos signalements et à l\'évolution de leur traitement',
      'Respect des obligations légales et réglementaires',
    ],
  },
  {
    title: '5. Destinataires des données',
    content: 'Vos données peuvent être transmises aux catégories de destinataires suivantes :',
    items: [
      'Les autorités administratives et services techniques compétents pour le traitement des signalements',
      'Les hébergeurs techniques de la plateforme (Render, MongoDB Atlas)',
      'Les services d\'IA pour la catégorisation automatique des signalements (Anthropic Claude)',
    ],
    note: 'Nous ne vendons, ne louons ni ne partageons vos données à des fins commerciales.',
  },
  {
    title: '6. Durée de conservation',
    content: 'Vos données sont conservées pour la durée nécessaire à l\'accomplissement des finalités pour lesquelles elles ont été collectées, soit :',
    items: [
      'Données de compte : jusqu\'à la suppression du compte par l\'Utilisateur',
      'Données de signalement : 5 ans à compter de la résolution du signalement (archivage légal)',
      'Logs de connexion : 12 mois',
    ],
  },
  {
    title: '7. Vos droits',
    content: 'Conformément à la loi n°2013-450 relative à la protection des données à caractère personnel en République de Côte d\'Ivoire, vous disposez des droits suivants :',
    items: [
      "Droit d'accès : obtenir la confirmation que vos données sont traitées et une copie de celles-ci",
      'Droit de rectification : demander la correction de données inexactes',
      'Droit à l\'effacement : demander la suppression de vos données dans les limites prévues par la loi',
      'Droit à la limitation du traitement : restreindre l\'utilisation de vos données',
      "Droit d'opposition : vous opposer au traitement de vos données pour des motifs légitimes",
      'Droit à la portabilité : recevoir vos données dans un format structuré',
    ],
  },
  {
    title: '8. Sécurité',
    content: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, toute altération, divulgation ou destruction. Ces mesures incluent : le chiffrement des communications (HTTPS), le hachage des mots de passe (bcrypt), l\'authentification par token JWT, et la segmentation des accès aux données.',
  },
  {
    title: '9. Cookies',
    content: 'La plateforme utilise uniquement des cookies techniques strictement nécessaires à son fonctionnement : cookie de session pour l\'authentification, et cookie de préférences d\'affichage. Aucun cookie publicitaire ou de tracking tiers n\'est utilisé. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités de la plateforme pourraient être altérées.',
  },
  {
    title: '10. Contact et réclamation',
    content: 'Pour exercer vos droits ou pour toute question relative à la protection de vos données, contactez-nous à contact@civ-alerts.ci. En cas de litige persistant, vous avez le droit d\'introduire une réclamation auprès de l\'Autorité de Protection des Données à Caractère Personnel (APDP) de Côte d\'Ivoire.',
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-ciDark to-gray-900 p-8 sm:p-10 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 mb-4">
              Vie privée
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2">Politique de Confidentialité</h1>
            <p className="text-white/60 text-sm font-medium">Conforme à la loi n°2013-450 — Dernière mise à jour : Mai 2026</p>
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                CIV-Alerts accorde une importance capitale à la protection de vos données personnelles. La présente politique vous informe de la manière dont nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme.
              </p>
            </div>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <h2 className="text-base font-black text-ciDark mb-3">{s.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">{s.content}</p>
                  {s.items && (
                    <ul className="space-y-1.5">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                          <span className="w-1 h-1 bg-ciGreen rounded-full mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.note && (
                    <p className="mt-2 text-xs text-ciGreen font-bold">{s.note}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 bg-ciGreen/5 rounded-2xl border border-ciGreen/10 text-center">
              <p className="text-xs text-gray-500">
                Pour exercer vos droits ou toute question : <a href="mailto:contact@civ-alerts.ci" className="text-ciGreen font-bold hover:underline">contact@civ-alerts.ci</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
