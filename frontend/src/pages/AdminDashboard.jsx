import React, { useState, useEffect } from 'react';
import StatusDropdown from '../components/StatusDropdown';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { api } from '../utils/api';
import { getUser } from '../utils/auth';
import Spinner from '../components/Spinner';

export default function AdminDashboard() {
  const toast = useToast();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVisits, setTotalVisits] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [statsData, setStatsData] = useState({ signaled: 0, ongoing: 0, resolved: 0 });
  const user = getUser();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchAdminStats();
  }, []);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchPaginatedIssues();
    }
  }, [page]);

  const fetchAdminStats = async () => {
    try {
      const data = await api('/api/admin/stats');
      setTotalVisits(data.totalVisits || 0);
      setTotalCount(data.totalCount || 0);
      const agg = {};
      (data.issues || []).forEach(i => { agg[i._id] = i.count; });
      setStatsData({
        signaled: agg['Signalé'] || 0,
        ongoing: agg['En cours'] || 0,
        resolved: agg['Résolu'] || 0,
      });
    } catch (err) {
      toast.error(err.message || 'Erreur chargement statistiques');
    }
  };

  const fetchPaginatedIssues = async () => {
    setLoading(true);
    try {
      const data = await api(`/api/admin/issues?page=${page}&limit=20`);
      setIssues(data.issues || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      toast.error(err.message || 'Erreur chargement signalements');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api(`/api/admin/issues/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      setIssues(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i));
      fetchAdminStats();
      toast.success('Statut mis à jour');
    } catch (err) {
      toast.error(err.message || 'Erreur');
    }
  };

  const handleRefreshTrust = async () => {
    setRefreshing(true);
    try {
      const data = await api('/api/admin/refresh-trust', { method: 'POST' });
      toast.success(data.message || 'Scores de confiance mis à jour');
    } catch (err) {
      toast.error(err.message || 'Erreur mise à jour');
    } finally {
      setRefreshing(false);
    }
  };

  if (loading && page === 1) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spinner text="Chargement..." />
    </div>
  );

  const stats = {
    all: totalCount,
    signaled: statsData.signaled,
    ongoing: statsData.ongoing,
    resolved: statsData.resolved,
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-ciDark tracking-tight">
              Administration
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">Gestion des signalements citoyens</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshTrust}
              disabled={refreshing}
              className="inline-flex items-center gap-2 bg-ciGreen/10 text-ciGreen border border-ciGreen/20 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-ciGreen hover:text-white transition-all duration-200 disabled:opacity-50"
            >
              {refreshing ? (
                <span className="w-3 h-3 border-2 border-ciGreen/30 border-t-ciGreen rounded-full animate-spin"></span>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              {refreshing ? 'Mise à jour...' : 'RAFRAICHIR CONFIANCE'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-gray-50 text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour Accueil
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.all, color: 'bg-gray-500', icon: '📋' },
            { label: 'Page', value: `${page}/${totalPages}`, color: 'bg-gray-400', icon: '📄' },
            { label: 'Signalés', value: stats.signaled, color: 'bg-yellow-500', icon: '🆕' },
            { label: 'En cours', value: stats.ongoing, color: 'bg-blue-500', icon: '🔄' },
            { label: 'Visites', value: totalVisits, color: 'bg-purple-500', icon: '👁️' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-ciDark">{stat.value}</span>
                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm bg-gray-100">{stat.icon}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-ciOrange rounded-full"></div>
              <h3 className="text-sm font-black text-ciDark uppercase tracking-wider">Signalements ({totalCount})</h3>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{issues.length} résultat{issues.length > 1 ? 's' : ''}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100/80 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">Signalement</th>
                  <th className="px-6 py-4">Secteur</th>
                  <th className="px-6 py-4">Votes</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {issues.length > 0 ? issues.map(issue => (
                  <tr key={issue._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-ciDark text-sm">{issue.title}</div>
                      <div className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">{issue.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1.5 bg-gray-100 rounded-lg text-gray-600">
                        {issue.sector}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-ciDark">{issue.votes}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusDropdown issue={issue} onStatusChange={handleStatusChange} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {new Date(issue.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                  </tr>
                )) : !loading && (
                  <tr>
                    <td colSpan="5" className="p-16 text-center">
                      <div className="text-4xl mb-3 opacity-30">📋</div>
                      <p className="text-gray-400 text-sm font-bold">Aucun signalement</p>
                      <p className="text-gray-300 text-xs mt-1">Les signalements citoyens apparaîtront ici</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Précédent
              </button>
              <span className="text-xs font-bold text-gray-400">Page {page} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Suivant →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}