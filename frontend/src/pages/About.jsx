import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-ciGreen uppercase tracking-wider border border-ciGreen/10 mb-6">
            À propos
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ciDark mb-6">
            CIV<span className="text-ciOrange">-Alerts</span>
          </h1>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
            <p className="text-lg font-medium">
              CIV-Alerts est une plateforme d'intérêt public dédiée à l'amélioration du cadre de vie en Côte d'Ivoire.
            </p>
            <p>
              Notre mission est de faciliter la communication entre les citoyens et les autorités compétentes en permettant un signalement rapide et structuré des dysfonctionnements urbains et sectoriels.
            </p>
            <h2 className="text-xl font-black text-ciDark mt-8">Notre Vision</h2>
            <p>
              Bâtir une Côte d'Ivoire où chaque citoyen peut contribuer activement à l'entretien et à l'amélioration de son environnement, grâce à des outils numériques transparents et accessibles à tous.
            </p>
            <h2 className="text-xl font-black text-ciDark mt-8">Comment ça marche</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Identifiez un dysfonctionnement dans votre quartier ou votre secteur</li>
              <li>Soumettez un signalement via notre formulaire avec photo</li>
              <li>Notre IA catégorise et priorise automatiquement votre rapport</li>
              <li>Les autorités compétentes sont notifiées et traitent le problème</li>
              <li>Suivez l'évolution du traitement en temps réel</li>
            </ol>
            <h2 className="text-xl font-black text-ciDark mt-8">Transparence</h2>
            <p>
              Chaque signalement est suivi de sa soumission jusqu'à sa résolution. Les citoyens peuvent consulter l'état d'avancement et voter pour les priorités collectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
