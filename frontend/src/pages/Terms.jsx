import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-ciGreen uppercase tracking-wider border border-ciGreen/10 mb-6">
            Conditions d'utilisation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ciDark mb-6">Conditions d'utilisation</h1>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed text-sm">
            <h2 className="text-lg font-black text-ciDark mt-6">1. Acceptation des conditions</h2>
            <p>En utilisant la plateforme CIV-Alerts, vous acceptez les présentes conditions d'utilisation.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">2. Utilisation du service</h2>
            <p>Les signalements doivent être authentiques et ne pas contenir de fausses informations. Tout abus peut entraîner la suspension du compte.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">3. Compte utilisateur</h2>
            <p>Vous êtes responsable de la confidentialité de vos identifiants. Les informations fournies lors de l'inscription doivent être exactes et à jour.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">4. Contenu des signalements</h2>
            <p>Les signalements doivent respecter les lois en vigueur en République de Côte d'Ivoire. Il est interdit de diffuser des contenus injurieux, diffamatoires ou illégaux.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">5. Limitation de responsabilité</h2>
            <p>CIV-Alerts s'efforce de traiter chaque signalement mais ne garantit pas un délai de résolution spécifique. La plateforme sert d'intermédiaire entre les citoyens et les autorités.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">6. Modification des conditions</h2>
            <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés de tout changement significatif.</p>

            <p className="text-gray-400 mt-8">Dernière mise à jour : Mai 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
