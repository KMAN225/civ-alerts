import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { api } from '../utils/api';
import { formatDate } from '../utils/dates';
import Spinner from '../components/Spinner';

export default function Trash() {
  const toast = useToast();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/'); return; }
    fetchTrash();
  }, []);

  const fetchTrash = async () => {
    try {
      setIssues(await api('/api/issues/trash'));
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  const handleRestore = async (id) => {
    try {
      await api(`/api/issues/${id}/restore`, { method: 'PATCH' });
      toast.success('Signalement restauré');
      setIssues(prev => prev.filter(i => i._id !== id));
    } catch (err) { toast.error(err.message); }
  };

  const handlePermanentDelete = async (id) => {
    if (!confirm('Supprimer définitivement ? Cette action est irréversible.')) return;
    try {
      await api(`/api/issues/${id}/permanent`, { method: 'DELETE' });
      toast.success('Signalement supprimé définitivement');
      setIssues(prev => prev.filter(i => i._id !== id));
    } catch (err) { toast.error(err.message); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Spinner text="Chargement de la corbeille..." />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-ciDark tracking-tight">Corbeille</h1>
            <p className="text-gray-400 text-sm font-medium mt-1">Signalements supprimés, en attente de restauration ou suppression définitive</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-white text-gray-600 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-50 transition-all"
          >
            ← Retour
          </button>
        </div>

        {issues.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="text-5xl mb-4 opacity-30">🗑️</div>
            <p className="text-gray-400 text-sm font-bold">Corbeille vide</p>
            <p className="text-gray-300 text-xs mt-1">Les signalements supprimés apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map(issue => (
              <div key={issue._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ciDark truncate">{issue.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">{issue.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-400 font-medium">
                    <span>{issue.sector}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{issue.location}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Supprimé le {formatDate(issue.deletedAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleRestore(issue._id)}
                    className="px-4 py-2 bg-ciGreen text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-ciDark transition-all"
                  >
                    Restaurer
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(issue._id)}
                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
