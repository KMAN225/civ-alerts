import React, { useState, useEffect } from 'react';
import StatusDropdown from '../components/StatusDropdown';
import { useNavigate } from 'react-router-dom';
import { ShieldIllustration, SuccessIllustration } from '../components/Illustrations';
import { useToast } from '../components/Toast';
import { API_URL } from '../config';

export default function AdminDashboard() {
  const toast = useToast();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchIssues();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/issues/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setIssues(prev => prev.map(i => i._id === id ? { ...i, status: newStatus } : i));
        toast.success('Statut mis à jour');
      } else {
        const data = await res.json();
        toast.error(data.message || 'Erreur');
      }
    } catch {
      toast.error('Erreur de connexion');
    }
  };

  const fetchIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/api/issues`);
      setIssues(await res.json());
    } catch (error) {
      console.error('Erreur chargement signalements:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    all: issues.length,
    signaled: issues.filter(i => i.status === 'Signalé').length,
    ongoing: issues.filter(i => i.status === 'En cours').length,
    resolved: issues.filter(i => i.status === 'Résolu').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <span className="w-5 h-5 border-2 border-gray-200 border-t-ciGreen rounded-full animate-spin"></span>
          <span className="text-sm font-bold text-gray-500">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-ciDark tracking-tight">
              Administration
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1">Gestion des signalements citoyens</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour Accueil
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.all, color: 'bg-gray-500', icon: '📋' },
            { label: 'Signalés', value: stats.signaled, color: 'bg-yellow-500', icon: '🆕' },
            { label: 'En cours', value: stats.ongoing, color: 'bg-blue-500', icon: '🔄' },
            { label: 'Résolus', value: stats.resolved, color: 'bg-ciGreen', icon: '✅' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-ciDark">{stat.value}</span>
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${stat.color.replace('bg-', 'bg-')}/10`}>{stat.icon}</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-ciOrange rounded-full"></div>
            <h3 className="text-sm font-black text-ciDark uppercase tracking-wider">Signalements ({stats.all})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                  <th className="px-6 py-4">Signalement</th>
                  <th className="px-6 py-4">Secteur</th>
                  <th className="px-6 py-4">Votes</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {issues.map(issue => (
                  <tr key={issue._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-ciDark text-sm">{issue.title}</div>
                      <div className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">{issue.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold px-2.5 py-1.5 bg-gray-50 rounded-lg text-gray-600 border border-gray-100">
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
                      <button
                        onClick={() => document.getElementById(`issue-${issue._id}`)?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-[10px] font-bold text-ciGreen hover:text-ciDark transition-colors uppercase tracking-wider"
                      >
                        Détails →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {issues.length === 0 && (
            <div className="p-16 text-center">
              <div className="text-4xl mb-3 opacity-30">📋</div>
              <p className="text-gray-400 text-sm font-bold">Aucun signalement</p>
              <p className="text-gray-300 text-xs mt-1">Les signalements citoyens apparaîtront ici</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
