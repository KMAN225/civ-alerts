import React from 'react';
import { Link } from 'react-router-dom';

const statsData = [
  { value: '2,450+', label: 'Signalements traités', sub: 'Depuis le lancement de la plateforme' },
  { value: '85%', label: 'Taux de résolution', sub: 'Problèmes résolus dans un délai moyen de 72h' },
  { value: '3,200+', label: 'Citoyens inscrits', sub: 'Utilisateurs actifs sur l\'ensemble du territoire' },
  { value: '48h', label: 'Délai moyen', sub: 'Premier retour des autorités compétentes' },
];

const sectorStats = [
  { sector: 'Transport', count: 680, pct: 28, color: 'bg-ciGreen' },
  { sector: 'Énergie', count: 520, pct: 21, color: 'bg-ciOrange' },
  { sector: 'Santé', count: 390, pct: 16, color: 'bg-red-500' },
  { sector: 'Éducation', count: 340, pct: 14, color: 'bg-blue-500' },
  { sector: 'Agriculture', count: 290, pct: 12, color: 'bg-amber-600' },
  { sector: 'Numérique', count: 230, pct: 9, color: 'bg-purple-500' },
];

const regions = [
  { name: 'Abidjan', count: 890 },
  { name: 'Bouaké', count: 310 },
  { name: 'Korhogo', count: 245 },
  { name: 'Daloa', count: 210 },
  { name: 'San-Pédro', count: 185 },
  { name: 'Yamoussoukro', count: 160 },
  { name: 'Gagnoa', count: 140 },
  { name: 'Man', count: 120 },
  { name: 'Odienné', count: 95 },
  { name: 'Bondoukou', count: 95 },
];

export default function Rapports() {
  const maxRegion = Math.max(...regions.map(r => r.count));

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-ciGreen/10 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-ciGreen border border-ciGreen/20 mb-4">
            Données & Analyses
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-ciDark mb-4">
            Rapports <span className="text-ciOrange">CIV-Alerts</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Visualisez l'impact de la plateforme à travers les données de signalement,
            la répartition par secteur et les tendances régionales.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {statsData.map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition-all">
              <p className="text-2xl sm:text-3xl font-black text-ciGreen mb-1">{s.value}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-[10px] text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-lg font-black text-ciDark mb-6">Signalements par secteur</h2>
            <div className="space-y-4">
              {sectorStats.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-bold text-ciDark">{s.sector}</span>
                    <span className="text-xs font-bold text-gray-400">{s.count} ({s.pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${s.color}`}
                      style={{ width: `${s.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-lg font-black text-ciDark mb-6">Top 10 des villes signalantes</h2>
            <div className="space-y-3">
              {regions.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-6 text-xs font-bold text-gray-400 text-right">{i + 1}</span>
                  <span className="text-sm font-bold text-ciDark flex-1">{r.name}</span>
                  <div className="flex-1 max-w-[200px]">
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ciGreen rounded-full"
                        style={{ width: `${(r.count / maxRegion) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 w-12 text-right">{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl border border-gray-200 shadow-sm p-8 sm:p-12 mb-8">
          <h2 className="text-2xl font-black text-ciDark mb-6 text-center">
            Analyse & <span className="text-ciOrange">Tendances</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 text-sm text-gray-500 leading-relaxed">
            <p>
              Depuis son lancement, <strong>CIV-Alerts</strong> a permis de traiter plus de 2 450 signalements
              à travers toute la Côte d'Ivoire. Le taux de résolution de 85% témoigne de l'efficacité
              de la plateforme dans la mise en relation entre les citoyens et les autorités compétentes.
            </p>
            <p>
              Le secteur des <strong>Transports</strong> concentre le plus grand nombre de signalements (28%),
              reflétant les défis de mobilité auxquels sont confrontés les Ivoiriens au quotidien.
              Les problèmes d'<strong>Énergie</strong> arrivent en deuxième position (21%), avec une
              concentration de signalements dans les zones périurbaines et rurales.
            </p>
            <p>
              La région d'<strong>Abidjan</strong> représente 36% des signalements, ce qui s'explique par
              sa densité de population et la concentration des infrastructures. Cependant, les villes
              de l'intérieur du pays montrent une adoption croissante de la plateforme, avec Bouaké,
              Korhogo et Daloa en tête.
            </p>
            <p>
              Ces données sont mises à jour régulièrement et permettent d'identifier les tendances
              émergentes, d'alerter les décideurs sur les problématiques prioritaires et d'évaluer
              l'impact des interventions publiques. La transparence est au coeur de notre mission.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 bg-ciGreen text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciDark transition-all shadow-lg shadow-ciGreen/25">
            Voir la carte des signalements
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
