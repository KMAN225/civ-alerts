import React, { useState, useEffect, Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { ToastProvider } from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { API_URL } from './config';

const Home = lazy(() => import('./pages/Home'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Trash = lazy(() => import('./pages/Trash'));
const About = lazy(() => import('./pages/About'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 text-center">
          <div className="max-w-md p-10 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl">
            <div className="text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-ciDark dark:text-white mb-3">Erreur d'affichage</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Une erreur critique a empêché le chargement de la page.</p>
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

function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-ciGreen/30 border-t-ciGreen rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [selectedSector, setSelectedSector] = useState('Tous');
  const [mapCenter, setMapCenter] = useState(null);
  const [allIssues, setAllIssues] = useState([]);

  const fetchIssues = () => {
    fetch(`${API_URL}/api/issues`)
      .then(res => res.ok ? res.json() : [])
      .then(setAllIssues)
      .catch(() => setAllIssues([]));
  };

  useEffect(() => { fetchIssues(); }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <ToastProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ciDark dark:text-gray-100 transition-colors duration-300">
              <Navbar selectedSector={selectedSector} setSelectedSector={setSelectedSector} />
              <ThemeToggle />
              <Suspense fallback={<PageLoading />}>
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
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </ToastProvider>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
