import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  {
    num: '01',
    title: 'Identifiez le problème',
    desc: 'Repérez précisément le dysfonctionnement : nid-de-poule, panne d\'éclairage, dépôt sauvage de déchets, coupure d\'eau, route dégradée, etc.',
    tips: ['Notez l\'adresse exacte ou les coordonnées GPS', 'Prenez des photos claires du problème', 'Vérifiez que le problème n\'a pas déjà été signalé'],
  },
  {
    num: '02',
    title: 'Créez votre compte',
    desc: 'Inscrivez-vous sur CIV-Alerts avec votre email et un mot de passe sécurisé. La création de compte est gratuite et ne prend qu\'une minute.',
    tips: ['Utilisez une adresse email valide pour recevoir les notifications de suivi', 'Choisissez un mot de passe fort (8 caractères minimum)', 'Vérifiez votre email pour activer votre compte'],
  },
  {
    num: '03',
    title: 'Soumettez un signalement',
    desc: 'Remplissez le formulaire de signalement avec une description détaillée du problème, une photo et la localisation précise sur la carte.',
    tips: ['Soyez précis dans la description (nature du problème, depuis quand ?)', 'Ajoutez une photo géolocalisée si possible', 'Sélectionnez le bon secteur (Agriculture, Santé, etc.)', 'Indiquez le niveau de gravité estimé'],
  },
  {
    num: '04',
    title: 'Suivez le traitement',
    desc: 'Votre signalement est automatiquement catégorisé par notre IA et transmis aux autorités compétentes. Vous recevez des notifications à chaque étape.',
    tips: ['Consultez régulièrement l\'avancement sur votre tableau de bord', 'Répondez aux demandes d\'information complémentaire', 'Confirmez la résolution lorsque le problème est traité'],
  },
  {
    num: '05',
    title: 'Participez à la communauté',
    desc: 'Votez pour les signalements prioritaires dans votre zone, commentez les signalements des autres citoyens et suivez l\'évolution globale de votre secteur.',
    tips: ['Plus un signalement reçoit de votes, plus il est prioritaire', 'Partagez vos signalements sur les réseaux sociaux', 'Invitez vos voisins à utiliser la plateforme'],
  },
];

const faqs = [
  {
    q: 'Quels types de problèmes puis-je signaler ?',
    a: 'Tout dysfonctionnement relevant des secteurs couverts : Agriculture, Santé, Éducation, Transport, Numérique et Énergie. Cela inclut les routes dégradées, les pannes d\'éclairage, les problèmes d\'eau, les décharges sauvages, les écoles en mauvais état, etc.',
  },
  {
    q: 'Mes signalements sont-ils anonymes ?',
    a: 'Votre identité est protégée conformément à la loi n°2013-450 sur la protection des données. Seules les informations nécessaires au traitement du signalement sont transmises aux autorités compétentes.',
  },
  {
    q: 'Combien de temps faut-il pour qu\'un signalement soit traité ?',
    a: 'Les délais varient selon la nature et l\'urgence du problème. Les signalements urgents sont traités en priorité. Vous recevez des notifications à chaque étape du traitement.',
  },
  {
    q: 'Que faire si le problème n\'est pas résolu ?',
    a: 'Vous pouvez relancer votre signalement, ajouter des informations complémentaires, ou voter pour augmenter sa priorité. Si le problème persiste anormalement, contactez notre équipe.',
  },
  {
    q: 'Puis-je signaler un problème pour quelqu\'un d\'autre ?',
    a: 'Oui, vous pouvez signaler un problème au nom d\'une autre personne (un voisin âgé, une association, etc.). Assurez-vous d\'avoir les informations précises sur le problème.',
  },
];

export default function Guide() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ciGreen border border-ciGreen/20 mb-4">
            Guide pratique
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-ciDark mb-4">
            Comment signaler <span className="text-ciOrange">efficacement</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Un guide complet pour utiliser CIV-Alerts et contribuer à l'amélioration de notre cadre de vie.
            Suivez ces étapes simples pour faire la différence.
          </p>
        </div>

        <div className="bg-gradient-to-br from-ciGreen to-green-700 rounded-3xl p-8 sm:p-12 text-white mb-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-2xl font-black mb-3">5 étapes pour un signalement réussi</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Un bon signalement est un signalement précis, documenté et bien catégorisé.
            Plus vous fournissez d'informations, plus le traitement sera rapide et efficace.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {steps.map((step, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row">
                <div className="bg-gradient-to-br from-ciGreen to-green-600 text-white sm:w-28 flex items-center justify-center py-6 sm:py-0">
                  <span className="text-4xl font-black">{step.num}</span>
                </div>
                <div className="flex-1 p-6 sm:p-8">
                  <h3 className="text-lg font-black text-ciDark mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tips.map((tip, j) => (
                      <span key={j} className="text-[11px] font-semibold text-ciGreen bg-ciGreen/5 px-3 py-1.5 rounded-lg border border-ciGreen/10">
                        {tip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm p-8 sm:p-12 mb-12">
          <h2 className="text-2xl font-black text-ciDark mb-8 text-center">
            Questions <span className="text-ciOrange">fréquentes</span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-sm text-ciDark hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 bg-ciGreen text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciDark transition-all shadow-lg shadow-ciGreen/25">
            Commencer un signalement
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
