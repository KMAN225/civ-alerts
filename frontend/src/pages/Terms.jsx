import React from 'react';

const sections = [
  {
    title: '1. Objet',
    content: 'Les présentes Conditions Générales d\'Utilisation (CGU) régissent l\'accès et l\'utilisation de la plateforme CIV-Alerts, accessible à l\'adresse civ-alerts.onrender.com. La plateforme a pour objet de permettre aux citoyens de signaler des dysfonctionnements urbains et sectoriels sur le territoire de la République de Côte d\'Ivoire, et d\'en assurer le suivi auprès des autorités compétentes.',
  },
  {
    title: '2. Acceptation des conditions',
    content: 'En accédant à la plateforme et en créant un compte, l\'Utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepter sans réserve. Si l\'Utilisateur n\'est pas d\'accord avec ces conditions, il doit cesser d\'utiliser la plateforme.',
  },
  {
    title: '3. Création et gestion du compte',
    content: `La création d'un compte est subordonnée à la fourniture d'informations exactes et à jour. L'Utilisateur est seul responsable de la confidentialité de ses identifiants de connexion. Tout accès à la plateforme via ses identifiants est réputé effectué par l'Utilisateur lui-même. L'Utilisateur s'engage à informer immédiatement l'Éditeur de toute utilisation non autorisée de son compte.`,
  },
  {
    title: '4. Obligations de l\'Utilisateur',
    content: 'L\'Utilisateur s\'engage à : (a) ne signaler que des faits réels et vérifiables ; (b) ne pas diffuser de contenus injurieux, diffamatoires, racistes ou contraires aux lois ivoiriennes ; (c) ne pas utiliser la plateforme à des fins commerciales ou publicitaires non autorisées ; (d) ne pas tenter de contourner les mesures de sécurité de la plateforme. Tout manquement peut entraîner la suspension immédiate du compte sans préavis.',
  },
  {
    title: '5. Traitement des signalements',
    content: 'CIV-Alerts transmet les signalements aux autorités compétentes mais ne constitue pas un service d\'urgence. Pour toute situation d\'urgence, l\'Utilisateur doit contacter les services appropriés (police, pompiers, SAMU). CIV-Alerts s\'efforce d\'assurer un suivi diligent mais ne peut garantir un délai de résolution spécifique.',
  },
  {
    title: '6. Propriété intellectuelle',
    content: 'Le code source de la plateforme est publié sous licence open source (MIT). Les contenus générés par les Utilisateurs (signalements, photos, commentaires) restent la propriété de leurs auteurs, mais une licence d\'utilisation est accordée à CIV-Alerts pour les besoins du traitement et de l\'affichage sur la plateforme.',
  },
  {
    title: '7. Protection des données',
    content: 'Les données personnelles collectées sont traitées conformément à notre Politique de Confidentialité et à la réglementation en vigueur, notamment la loi n°2013-450 relative à la protection des données à caractère personnel en République de Côte d\'Ivoire.',
  },
  {
    title: '8. Limitation de responsabilité',
    content: 'CIV-Alerts agit comme intermédiaire technique entre les citoyens et les autorités. La plateforme ne saurait être tenue responsable de l\'inaction ou du délai de traitement des autorités compétentes. L\'Éditeur ne garantit pas une disponibilité continue et ininterrompue de la plateforme.',
  },
  {
    title: '9. Modification des CGU',
    content: 'Les présentes CGU peuvent être modifiées à tout moment. Les Utilisateurs seront informés de toute modification substantielle par email ou via une notification sur la plateforme. L\'utilisation continue de la plateforme après modification vaut acceptation des nouvelles CGU.',
  },
  {
    title: '10. Droit applicable et juridiction',
    content: 'Les présentes CGU sont soumises au droit ivoirien. Tout litige relatif à leur interprétation ou exécution relève de la compétence des tribunaux d\'Abidjan, République de Côte d\'Ivoire.',
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-ciDark to-gray-900 p-8 sm:p-10 text-white">
            <div className="inline-flex items-center gap-2 bg-gray-50/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 mb-4">
              Document légal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2">Conditions Générales d'Utilisation</h1>
            <p className="text-white/60 text-sm font-medium">Dernière mise à jour : Mai 2026</p>
          </div>
          <div className="p-8 sm:p-10">
            <div className="mb-8 p-4 bg-gray-100 rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong className="text-gray-700">Préambule :</strong> Les présentes Conditions Générales d'Utilisation (ci-après "CGU") sont conclues entre l'Éditeur de la plateforme CIV-Alerts et toute personne physique ou morale accédant à la plateforme ou créant un compte (ci-après "l'Utilisateur").
              </p>
            </div>
            <div className="space-y-8">
              {sections.map((s, i) => (
                <div key={i} className="pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <h2 className="text-lg font-black text-ciDark mb-3">{s.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-4 bg-ciGreen/5 rounded-2xl border border-ciGreen/10 text-center">
              <p className="text-xs text-gray-500">
                Pour toute question relative aux CGU, contactez-nous à <a href="mailto:contact@civ-alerts.ci" className="text-ciGreen font-bold hover:underline">contact@civ-alerts.ci</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
