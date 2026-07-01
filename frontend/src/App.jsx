import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Trash from './pages/Trash';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Guide from './pages/Guide';
import Rapports from './pages/Rapports';
import { ToastProvider } from './components/Toast';
import { API_URL } from './config';
import { sectors } from './data/sectorData';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 text-center">
          <div className="max-w-md p-10 bg-gray-50 rounded-3xl border border-gray-200 shadow-xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-ciDark mb-3">Erreur d'affichage</h2>
            <p className="text-gray-500 mb-8 font-medium">Une erreur critique a empêché le chargement de la page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-ciGreen text-white px-8 py-3 rounded-xl font-bold hover:bg-ciDark transition-all"
            >
              Actualiser la page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [mapCenter, setMapCenter] = useState(null);
  const [allIssues, setAllIssues] = useState([]);

  const fetchIssues = () => {
    fetch(`${API_URL}/api/issues`)
      .then(res => res.ok ? res.json() : [])
      .then(setAllIssues)
      .catch(() => setAllIssues([]));
  };

  useEffect(() => {
    fetchIssues();
    fetch(`${API_URL}/api/stats/visit`, { method: 'POST' }).catch(() => {});
  }, []);

  const handleSectorClick = (sector) => {
    setSelectedSector(sector);
  };

  return (
    <>
      <Navbar selectedSector={selectedSector} setSelectedSector={setSelectedSector} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero mapCenter={mapCenter} issues={allIssues} />
            <Home selectedSector={selectedSector} setSelectedSector={setSelectedSector} mapCenter={mapCenter} issues={allIssues} onLocateIssue={(coords) => setMapCenter(coords)} onIssueAdded={fetchIssues} />
          </>
        } />
        <Route path="/trash" element={<Trash />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/rapports" element={<Rapports />} />
      </Routes>
      <footer className="bg-ciDark text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-ciGreen rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                  <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                    <rect width="32" height="32" rx="7" fill="white"/>
                    <path d="M16 6c-5 0-9 4-9 9 0 7 9 14 9 14s9-7 9-14c0-5-4-9-9-9z" fill="#F89406"/>
                    <circle cx="16" cy="15" r="3.5" fill="white"/>
                  </svg>
                </div>
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
                    <a href="/" onClick={(e) => { e.preventDefault(); handleSectorClick(s); }} className="text-xs text-gray-500 hover:text-white transition-colors font-medium">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Liens utiles</h4>
              <ul className="space-y-2.5">
                <li><a href="/guide" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Guide</a></li>
                <li><a href="/blog" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Blog</a></li>
                <li><a href="/rapports" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Rapports</a></li>
                <li><a href="/about" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">À propos</a></li>
                <li><a href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors font-medium">Conditions</a></li>
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
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ToastProvider>
        <div className="min-h-screen bg-gray-50 font-sans text-ciDark">
          <AppContent />
        </div>
      </ToastProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
