import React, { memo, useState } from 'react';
import { VerifiedBadge } from './Illustrations';
import { useToast } from './Toast';
import { api } from '../utils/api';
import { formatDate } from '../utils/dates';
import { getUser } from '../utils/auth';

const priorityConfig = {
  Critique: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500', label: 'Urgent' },
  Moyenne: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Modéré' },
  Faible: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', dot: 'bg-blue-500', label: 'Faible' }
};

const statusConfig = {
  'Signalé': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', bar: 'bg-yellow-400', width: '15%' },
  'En cours': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', bar: 'bg-blue-500', width: '55%' },
  'Résolu': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', bar: 'bg-ciGreen', width: '100%' }
};

const IssueCard = memo(function IssueCard({ issue, onDelete }) {
  const toast = useToast();
  const [imgError, setImgError] = useState(false);
  const user = getUser();
  const isOwner = issue.userId?._id === user?._id || issue.userId === user?._id;

  const handleDelete = async () => {
    if (!confirm('Supprimer ce signalement ?')) return;
    try {
      await api(`/api/issues/${issue._id}`, { method: 'DELETE' });
      toast.success('Signalement supprimé');
      if (onDelete) onDelete(issue._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const vote = async () => {
    try {
      await api(`/api/issues/${issue._id}/vote`, { method: 'PATCH' });
      window.location.reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const prio = priorityConfig[issue.priority] || priorityConfig.Moyenne;
  const stat = statusConfig[issue.status] || statusConfig['Signalé'];

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-ciGreen/20 hover:shadow-xl hover:shadow-ciGreen/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {issue.mediaUrl && !imgError && (
        <div className="relative h-44 bg-gray-50 overflow-hidden">
          <img
            src={issue.mediaUrl}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
          {issue.verified && (
            <div className="absolute top-3 right-3 bg-ciGreen/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 shadow-lg">
              <VerifiedBadge className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black text-white uppercase tracking-wider">Vérifié</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${prio.bg} ${prio.text} ${prio.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${prio.dot}`}></span>
              {prio.label}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-600 border border-gray-100">
              {issue.sector}
            </span>
            {issue.verified && !issue.mediaUrl && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-ciGreen/10 text-ciGreen border border-ciGreen/20">
                <VerifiedBadge className="w-3 h-3" />
                Vérifié
              </span>
            )}
          </div>
        </div>

        <h4 className="text-lg font-black text-ciDark group-hover:text-ciGreen transition-colors duration-300 leading-tight mb-2">
          {issue.title}
        </h4>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium mb-4">
          {issue.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 font-medium mb-5">
          <span className="inline-flex items-center gap-1">📍 {issue.location}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="inline-flex items-center gap-1">📅 {formatDate(issue.createdAt)}</span>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl mb-4">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Traitement</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${stat.bg} ${stat.text} ${stat.border}`}>{issue.status}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ease-out ${stat.bar}`} style={{ width: stat.width }}></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${stat.bar} ${issue.status === 'Résolu' ? '' : 'animate-pulse-soft'}`}></span>
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{issue.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={vote}
              className="group/btn inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-ciOrange hover:text-white hover:border-ciOrange transition-all duration-200 active:scale-90"
            >
              <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              <span className="tabular-nums">{issue.votes}</span>
            </button>
            {isOwner && (
              <button
                onClick={handleDelete}
                className="group/btn inline-flex items-center gap-2 bg-white border border-red-200 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 active:scale-90"
                title="Supprimer mon signalement"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default IssueCard;
