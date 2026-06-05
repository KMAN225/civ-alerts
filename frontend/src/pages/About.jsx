import React from 'react';

const values = [
  {
    icon: '🎯',
    title: 'Mission',
    desc: 'Faciliter la communication entre les citoyens et les autorités ivoiriennes en digitalisant le signalement des dysfonctionnements urbains et sectoriels, pour une résolution rapide et transparente.',
  },
  {
    icon: '👁️',
    title: 'Vision',
    desc: 'Bâtir une Côte d\'Ivoire où chaque citoyen est acteur de l\'amélioration de son cadre de vie, grâce à des outils numériques souverains, transparents et accessibles à tous.',
  },
  {
    icon: '🤝',
    title: 'Valeurs',
    desc: 'Transparence intégrale des processus, engagement citoyen, innovation technologique au service de l\'intérêt général et traitement équitable de chaque signalement.',
  },
];

const stats = [
  { value: '6', label: 'Secteurs couverts', sub: 'Agriculture, Santé, Éducation, Transport, Numérique, Énergie' },
  { value: 'AI', label: 'IA intégrée', sub: 'Catégorisation et priorisation automatiques' },
  { value: '24/7', label: 'Disponibilité', sub: 'Signalement et suivi en temps réel' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-5xl mx-auto px-6 space-y-8">

        {/* Hero section */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-ciGreen to-green-700 p-8 sm:p-12 text-white">
            <div className="inline-flex items-center gap-2 bg-gray-50/15 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20 mb-5">
              Plateforme d'intérêt public
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">
              CIV<span className="text-ciOrange">-Alerts</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed font-medium">
              Portail national de signalement citoyen des dysfonctionnements urbains et sectoriels en République de Côte d'Ivoire.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="p-6 sm:p-8 text-center">
                <p className="text-2xl font-black text-ciDark mb-1">{s.value}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <span className="text-3xl block mb-4">{v.icon}</span>
              <h3 className="text-sm font-black text-ciDark uppercase tracking-wider mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm p-8 sm:p-12">
          <h2 className="text-2xl font-black text-ciDark mb-8">Fonctionnement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Identification', desc: 'Repérez un dysfonctionnement dans votre localité' },
              { step: '02', title: 'Signalement', desc: 'Soumettez via notre formulaire avec photo' },
              { step: '03', title: 'Traitement IA', desc: 'Notre IA catégorise et priorise automatiquement' },
              { step: '04', title: 'Instruction', desc: 'Les autorités notifiées traitent le dossier' },
              { step: '05', title: 'Suivi', desc: 'Suivez la résolution en temps réel' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-ciGreen/10 rounded-2xl flex items-center justify-center text-sm font-black text-ciGreen mx-auto mb-3">{item.step}</div>
                <h4 className="text-xs font-black text-ciDark uppercase tracking-wider mb-1">{item.title}</h4>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="text-xl">⚖️</span>
              <p className="text-xs text-amber-700 font-medium">
                CIV-Alerts est une plateforme indépendante. Les signalements sont transmis aux autorités compétentes sans garantie de délai de traitement.
              </p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
}
