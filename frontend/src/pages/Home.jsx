import React, { useState, useMemo } from 'react';
import IssueCard from '../components/IssueCard';
import IssueForm from '../components/IssueForm';
import TimelineFeed from '../components/TimelineFeed';
import { sectorData, sectors as sectorList } from '../data/sectorData';
import { SectorIcon, EmptyIllustration, ReportIllustration } from '../components/Illustrations';

export default function Home({ selectedSector, setSelectedSector, onLocateIssue, mapCenter, issues = [], onIssueAdded }) {
  const [selectedPriority, setSelectedPriority] = useState('Tous');

  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      const sectorMatch = selectedSector === 'Tous' || issue.sector === selectedSector;
      const priorityMatch = selectedPriority === 'Tous' || issue.priority === selectedPriority;
      return sectorMatch && priorityMatch;
    });
  }, [issues, selectedSector, selectedPriority]);

  const sectors = ['Tous', ...sectorList];
  const priorities = ['Tous', 'Critique', 'Moyenne', 'Faible'];

  const sectorIcons = {
    Tous: null,
    Agriculture: <SectorIcon sector="Agriculture" className="w-4 h-4 inline-block" />,
    Santé: <SectorIcon sector="Santé" className="w-4 h-4 inline-block" />,
    Éducation: <SectorIcon sector="Éducation" className="w-4 h-4 inline-block" />,
    Transport: <SectorIcon sector="Transport" className="w-4 h-4 inline-block" />,
    Numérique: <SectorIcon sector="Numérique" className="w-4 h-4 inline-block" />,
    Énergie: <SectorIcon sector="Énergie" className="w-4 h-4 inline-block" />,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <section className="py-12 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-h-[500px] overflow-y-auto">
              <TimelineFeed issues={filteredIssues} onLocateOnMap={onLocateIssue} onIssueSelect={() => {
                document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
              }} />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-6 bg-ciGreen rounded-full"></div>
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Filtres</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">Secteur</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sectors.map(sector => (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all duration-200 border ${
                          selectedSector === sector
                            ? 'bg-ciGreen text-white border-ciGreen shadow-sm shadow-ciGreen/20 scale-[0.97]'
                            : 'bg-white text-gray-500 border-gray-100 hover:border-ciGreen/30 hover:text-ciGreen'
                        }`}
                      >
                        {sectorIcons[sector] && <span className="mr-1.5">{sectorIcons[sector]}</span>}
                        {sector}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block">Urgence</label>
                  <div className="grid grid-cols-2 gap-2">
                    {priorities.map(prio => (
                      <button
                        key={prio}
                        onClick={() => setSelectedPriority(prio)}
                        className={`px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all duration-200 border ${
                          selectedPriority === prio
                            ? 'bg-ciOrange text-white border-ciOrange shadow-sm shadow-ciOrange/20 scale-[0.97]'
                            : 'bg-white text-gray-500 border-gray-100 hover:border-ciOrange/30 hover:text-ciOrange'
                        }`}
                      >
                        {prio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedSector !== 'Tous' && sectorData[selectedSector] && (
              <div className="p-5 bg-gradient-to-br from-ciGreen/[0.04] to-transparent rounded-2xl border border-ciGreen/10 animate-slide-up">
                <div className="flex items-center gap-2 mb-3">
                  {sectorIcons[selectedSector] && <span className="flex-shrink-0">{sectorIcons[selectedSector]}</span>}
                  <h4 className="text-xs font-black text-ciDark uppercase tracking-wider">{selectedSector}</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{sectorData[selectedSector].description}</p>
                {sectorData[selectedSector].commonIssues && (
                  <div className="mt-3 space-y-1">
                    {sectorData[selectedSector].commonIssues.slice(0, 3).map((issue, i) => (
                      <div key={i} className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        {issue}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <IssueForm onIssueAdded={onIssueAdded} initialSector={selectedSector !== 'Tous' ? selectedSector : null} />
        </div>

        <div className="lg:col-span-8 space-y-8" id="explorer">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-ciDark tracking-tight">
                {selectedSector === 'Tous' ? 'Registre National' : `Secteur : ${selectedSector}`}
              </h2>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-1">
                Consultation des signalements citoyens
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ciGreen/5 rounded-xl border border-ciGreen/10">
              <span className={`w-2 h-2 rounded-full ${filteredIssues.length > 0 ? 'bg-ciGreen animate-pulse-soft' : 'bg-gray-300'}`}></span>
              <span className="text-xs font-bold text-ciGreen">{filteredIssues.length} signalement{filteredIssues.length > 1 ? 's' : ''}</span>
            </div>
          </div>

          {filteredIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIssues.map(issue => (
                <IssueCard key={issue._id} issue={issue} onDelete={onIssueAdded} />
              ))}
            </div>
          ) : (
            <div className="col-span-2 py-16 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <EmptyIllustration className="w-32 h-28 mx-auto mb-4 opacity-60" />
              <p className="text-gray-400 text-sm font-bold">Aucun signalement trouvé</p>
              <p className="text-gray-300 text-xs mt-1">Essayez de modifier vos filtres ou soyez le premier à signaler</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ciGreen/5 rounded-full text-[10px] font-bold text-ciGreen uppercase tracking-wider border border-ciGreen/10 mb-4">À propos</span>
                <h2 className="text-3xl sm:text-4xl font-black text-ciDark tracking-tight">
                  CIV<span className="text-ciOrange">-Alerts</span>
                </h2>
                <p className="text-gray-500 leading-relaxed text-base mt-4 font-medium">
                  Plateforme d'intérêt public visant à optimiser la maintenance urbaine et la qualité des services publics en Côte d'Ivoire. En digitalisant le signalement des anomalies, nous permettons une intervention plus rapide et une meilleure allocation des ressources publiques.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { num: '01', title: 'Transparence Administrative', desc: 'Chaque étape du traitement est visible par le citoyen, garantissant la redevabilité des services.', color: 'ciGreen' },
                  { num: '02', title: 'Intelligence Artificielle', desc: 'Catégorisation et priorisation objective des signalements via des modèles de langage avancés.', color: 'ciOrange' },
                  { num: '03', title: 'Engagement Citoyen', desc: 'Le vote communautaire permet d\'identifier les urgences collectives prioritaires.', color: 'blue-600' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300 group">
                    <div className={`flex-shrink-0 w-10 h-10 bg-${item.color} text-white rounded-xl flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform shadow-sm`} style={{ backgroundColor: item.color === 'ciGreen' ? '#008532' : item.color === 'ciOrange' ? '#F89406' : '#2563eb' }}>
                      {item.num}
                    </div>
                    <div>
                      <h4 className="font-black text-ciDark text-xs uppercase tracking-wide">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <ReportIllustration className="w-16 h-20 mx-auto mb-3 opacity-70" />
                <h3 className="text-sm font-black text-ciDark text-center uppercase tracking-widest">
                  Procédure de signalement</h3>
                <div className="space-y-6">
                  {[
                    { step: '1', text: 'Identification d\'une anomalie dans l\'espace public ou un service.' },
                    { step: '2', text: 'Soumission du rapport via le formulaire avec preuve photographique.' },
                    { step: '3', text: 'Analyse automatisée par l\'IA pour l\'orientation sectorielle.' },
                    { step: '4', text: 'Traitement par les services techniques et mise à jour du statut.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group">
                      <span className="flex-shrink-0 w-8 h-8 bg-ciGreen text-white rounded-xl flex items-center justify-center text-xs font-black group-hover:scale-110 transition-transform shadow-sm shadow-ciGreen/20">{item.step}</span>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
