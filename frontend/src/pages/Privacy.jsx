import React from 'react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/5 px-3 py-1.5 rounded-full text-[10px] font-bold text-ciGreen uppercase tracking-wider border border-ciGreen/10 mb-6">
            Confidentialité
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-ciDark mb-6">Politique de confidentialité</h1>
          <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed text-sm">
            <h2 className="text-lg font-black text-ciDark mt-6">1. Données collectées</h2>
            <p>Nous collectons les informations suivantes : nom, prénom, email, localisation et les photos que vous joignez à vos signalements.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">2. Utilisation des données</h2>
            <p>Vos données sont utilisées uniquement pour :</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Gérer votre compte et vos signalements</li>
              <li>Assurer le suivi des dossiers par les autorités compétentes</li>
              <li>Améliorer nos services</li>
            </ul>

            <h2 className="text-lg font-black text-ciDark mt-6">3. Partage des données</h2>
            <p>Vos signalements peuvent être partagés avec les services techniques et les autorités compétentes pour le traitement des dossiers. Nous ne revendons pas vos données à des tiers.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">4. Sécurité</h2>
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données personnelles contre tout accès non autorisé.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">5. Vos droits</h2>
            <p>Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous via la page Contact.</p>

            <h2 className="text-lg font-black text-ciDark mt-6">6. Cookies</h2>
            <p>Notre site utilise uniquement des cookies techniques nécessaires au fonctionnement de la plateforme. Aucun cookie publicitaire n'est utilisé.</p>

            <p className="text-gray-400 mt-8">Dernière mise à jour : Mai 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}
