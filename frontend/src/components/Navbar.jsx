import React, { useState, useEffect, useRef } from 'react';
import AuthModal from './AuthModal';
import { useToast } from './Toast';
import { sectors } from '../data/sectorData';
import { getUser, clearAuth } from '../utils/auth';

export default function Navbar({ selectedSector, setSelectedSector }) {
  const toast = useToast();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSectorsOpen, setIsSectorsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(getUser);
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav-scrolled', window.scrollY > 40);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) setUser(storedUser);
  }, [isAuthOpen]);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-all duration-300 nav-logo">
                  🇨🇮
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black tracking-tighter uppercase transition-colors duration-300 nav-title">
                    Civ<span className="text-ciOrange">Alerts</span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 nav-subtitle">
                    Portail National
                  </span>
                </div>
              </a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/10 nav-navgroup">
                <a
                  href="/"
                  onClick={() => setSelectedSector('Tous')}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 text-center bg-ciGreen text-white shadow-lg shadow-ciGreen/25 hover:bg-ciDark active:scale-[0.97]"
                >
                  Accueil
                </a>

                <div className="relative">
                  <button
                    onClick={() => setIsSectorsOpen(!isSectorsOpen)}
                    onMouseEnter={() => setIsSectorsOpen(true)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 bg-ciGreen text-white shadow-lg shadow-ciGreen/25 hover:bg-ciDark active:scale-[0.97]"
                  >
                    Secteurs
                    <svg className={`w-3 h-3 transition-transform duration-200 ${isSectorsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isSectorsOpen && (
                    <div
                      onMouseEnter={() => setIsSectorsOpen(true)}
                      onMouseLeave={() => setIsSectorsOpen(false)}
                      className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 dark:border-gray-700 py-2 animate-scale-in overflow-hidden z-50"
                    >
                      <div className="px-3 py-2 border-b border-gray-50 dark:border-gray-700 mb-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Choisir un secteur</p>
                      </div>
                      {sectors.map(sector => (
                        <button
                          key={sector}
                          onClick={() => {
                            setSelectedSector(sector);
                            setIsSectorsOpen(false);
                            setTimeout(() => document.getElementById('signalement')?.scrollIntoView({ behavior: 'smooth' }), 100);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase transition-all hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 ${
                            selectedSector === sector ? 'text-ciGreen bg-green-50 dark:bg-green-900/20' : 'text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedSector === sector ? 'bg-ciGreen' : 'bg-gray-200 dark:bg-gray-600'}`}></span>
                          {sector}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="#explorer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 bg-ciGreen text-white shadow-lg shadow-ciGreen/25 hover:bg-ciDark active:scale-[0.97] text-center"
                >
                  Explorateur
                </a>

                {user && user.role === 'admin' && (
                  <a
                    href="/admin"
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-ciOrange bg-ciOrange/10 hover:bg-ciOrange/20 transition-all duration-200"
                  >
                    Admin
                  </a>
                )}
                {user && (
                  <a
                    href="/trash"
                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Corbeille
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 nav-usertag">
                    <div className="w-6 h-6 bg-ciGreen/20 rounded-lg flex items-center justify-center text-xs font-black text-ciGreen">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-bold nav-username">
                      {user.username}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all duration-200 nav-logout"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="group relative inline-flex items-center gap-2 bg-ciGreen text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciDark transition-all duration-300 shadow-lg shadow-ciGreen/25 hover:shadow-xl active:scale-[0.97]"
                >
                  <span>Connexion</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl transition-colors nav-hamburger"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 shadow-xl animate-slide-down">
            <div className="px-4 py-4 space-y-1">
              <button
                onClick={() => { setSelectedSector('Tous'); setIsMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedSector === 'Tous' ? 'bg-ciGreen text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Accueil
              </button>
              {sectors.map(sector => (
                <button
                  key={sector}
                  onClick={() => {
                    setSelectedSector(sector);
                    setIsMobileMenuOpen(false);
                    setTimeout(() => document.getElementById('signalement')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    selectedSector === sector ? 'bg-ciGreen text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {sector}
                </button>
              ))}
              <a href="#explorer" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-ciGreen text-white">Explorateur</a>
              {user && user.role === 'admin' && (
                <a href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-ciOrange bg-orange-50 dark:bg-orange-900/20">Admin</a>
              )}
              {user && (
                <a href="/trash" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">Corbeille</a>
              )}
              {user && (
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
                  <div className="px-4 py-2 flex items-center gap-2">
                    <div className="w-8 h-8 bg-ciGreen/10 rounded-lg flex items-center justify-center text-xs font-black text-ciGreen">{user.username.charAt(0).toUpperCase()}</div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{user.username}</span>
                  </div>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Déconnexion</button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}
