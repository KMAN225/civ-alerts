import React from 'react';
import { sectors } from '../data/sectorData';

export default function Footer() {
  return (
    <footer className="bg-ciDark text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-ciGreen rounded-xl flex items-center justify-center text-lg shadow-sm">🇨🇮</div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black text-white tracking-tight uppercase">Civ<span className="text-ciOrange">Alerts</span></span>
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Portail National</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              Plateforme citoyenne de signalement des dysfonctionnements urbains et sectoriels en Côte d'Ivoire. Ensemble, améliorons notre cadre de vie.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Secteurs</h4>
            <ul className="space-y-2.5">
              {sectors.map(s => (
                <li key={s}>
                  <span className="text-xs text-gray-500 hover:text-white transition-colors font-medium cursor-default">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Liens utiles</h4>
            <ul className="space-y-2.5">
              <li><a href="/about" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">À propos</a></li>
              <li><a href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Conditions d'utilisation</a></li>
              <li><a href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Confidentialité</a></li>
              <li><a href="/contact" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-medium">
            © {new Date().getFullYear()} CIV-Alerts. République de Côte d'Ivoire.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 font-medium">Fait avec</span>
            <span className="text-sm">🇨🇮</span>
            <span className="text-xs text-gray-600 font-medium">pour la Côte d'Ivoire</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
