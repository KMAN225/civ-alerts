import React, { useState, useEffect } from 'react';
import { ShieldIllustration } from './Illustrations';
import MapView from './MapView';
import { API_URL } from '../config';

export default function Hero({ mapCenter, issues }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`${API_URL}/api/stats`)
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (mounted) { setStats(data); setLoading(false); } })
      .catch(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const statItems = stats ? [
    { value: stats.resolvedIssues, label: 'Signalements résolus', icon: '✓' },
    { value: stats.totalSectors, label: 'Secteurs couverts', icon: '⊕' },
    { value: stats.totalUsers, label: 'Citoyens engagés', icon: '◉' },
    { value: stats.inProgressIssues, label: 'En cours de traitement', icon: '⚡' },
  ] : [];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-ciGreen/5 via-transparent to-ciOrange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-ciOrange/5 via-transparent to-ciGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] left-[20%] w-2 h-2 bg-ciGreen/20 rounded-full"></div>
        <div className="absolute top-[30%] right-[30%] w-3 h-3 bg-ciOrange/20 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-ciGreen/30 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-200 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-ciGreen animate-pulse-soft"></span>
              <span className="bg-ciGreen text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">Officiel</span>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tight">République de Côte d'Ivoire</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-ciDark leading-[1.05] tracking-tight text-balance">
              Contribuez à{' '}
              <span className="bg-gradient-to-r from-ciGreen to-emerald-400 bg-clip-text text-transparent">
                l'amélioration
              </span>
              <br />
              de notre cadre de vie.
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl max-w-xl leading-relaxed font-medium">
              Le portail <strong className="text-ciDark">CIV-Alerts</strong> permet à chaque citoyen de signaler les dysfonctionnements urbains et sectoriels pour une résolution rapide et transparente.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#signalement"
                className="group relative inline-flex items-center gap-2 bg-ciGreen text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wide hover:bg-ciDark transition-all duration-300 shadow-lg shadow-ciGreen/25 hover:shadow-xl hover:shadow-ciGreen/30 active:scale-[0.98]"
              >
                <span>Déposer un signalement</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#explorer"
                className="group inline-flex items-center gap-2 bg-white text-ciDark border-2 border-gray-200 px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-wide hover:border-ciGreen hover:text-ciGreen transition-all duration-300 active:scale-[0.98] shadow-sm"
              >
                <span>Consulter les dossiers</span>
                <span className="text-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ciGreen/10 to-ciOrange/10 rounded-3xl blur-2xl -translate-y-4 translate-x-4"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2 px-1">
                    <span className="w-1 h-1 rounded-full bg-ciGreen animate-pulse-soft"></span>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Carte Nationale</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-200/50 shadow-inner" style={{ height: '260px' }}>
                    <MapView issues={issues} mapCenter={mapCenter} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5 px-1">
                    <span className="text-[8px] text-gray-400 font-medium">Côte d'Ivoire</span>
                    <span className="text-[8px] font-bold text-ciGreen">Navigation interactive</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
              <ShieldIllustration className="w-10 h-12 flex-shrink-0" />
              <div>
                <p className="text-xs font-black text-ciDark">Signalements vérifiés</p>
                <p className="text-[10px] text-gray-400 font-medium">Chaque rapport est traité par les autorités compétentes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-fade-in">
          {loading ? (
            <>
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-2" />
                </div>
              ))}
            </>
          ) : (
            statItems.map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-white/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 dark:bg-gray-900/60 rounded-2xl p-5 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:border-ciGreen/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-black text-ciDark dark:text-white">{stat.value}</span>
                  <span className="w-8 h-8 bg-ciGreen/10 rounded-lg flex items-center justify-center text-ciGreen text-sm font-bold group-hover:bg-ciGreen group-hover:text-white transition-all duration-300">{stat.icon}</span>
                </div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
