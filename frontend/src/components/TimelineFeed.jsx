import React, { useMemo } from 'react';
import { VerifiedBadge } from './Illustrations';
import { formatShortDate } from '../utils/dates';

const priorityColors = {
  Critique: { dot: 'bg-red-500', line: 'border-red-300', bg: 'bg-red-50', text: 'text-red-600', label: 'Urgent' },
  Moyenne: { dot: 'bg-amber-500', line: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-600', label: 'Modéré' },
  Faible: { dot: 'bg-blue-500', line: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-600', label: 'Faible' }
};

export default function TimelineFeed({ issues, onIssueSelect, onLocateOnMap }) {
  const sorted = useMemo(() => {
    return [...issues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [issues]);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl mb-4">📭</div>
        <p className="text-gray-400 text-sm font-bold">Aucune activité récente</p>
        <p className="text-gray-300 text-xs mt-1">Les nouveaux signalements apparaîtront ici</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-50">
      <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2">
        <span className="w-2 h-2 bg-ciGreen rounded-full animate-pulse-soft"></span>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Activité récente</span>
        <span className="ml-auto text-[10px] font-bold text-gray-400">{sorted.length} signalement{sorted.length > 1 ? 's' : ''}</span>
      </div>

      {sorted.slice(0, 8).map((issue, idx) => {
        const prio = priorityColors[issue.priority] || priorityColors.Moyenne;
        const initials = issue.title.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

        return (
          <div
            key={issue._id}
            className="group flex items-start gap-4 px-6 py-4 hover:bg-gray-50/70 transition-all duration-200 cursor-pointer"
            onClick={() => {
              if (onIssueSelect) onIssueSelect(issue);
              if (onLocateOnMap && issue.coordinates?.coordinates?.length) {
                onLocateOnMap([issue.coordinates.coordinates[1], issue.coordinates.coordinates[0]]);
              }
              const el = document.getElementById('explorer');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="relative flex-shrink-0 mt-0.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${prio.bg} ${prio.text} shadow-sm`}>
                {initials}
              </div>
              {idx < sorted.length - 1 && (
                <div className="absolute top-10 left-1/2 w-px h-[calc(100%+4px)] bg-gray-100 -translate-x-1/2"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm font-bold text-ciDark group-hover:text-ciGreen transition-colors truncate">
                  {issue.title}
                </h4>
                {issue.verified && <VerifiedBadge className="w-3.5 h-3.5 flex-shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 line-clamp-1 mb-2">{issue.description}</p>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <span className={`inline-flex items-center gap-1 font-semibold ${prio.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${prio.dot}`}></span>
                  {prio.label}
                </span>
                <span>•</span>
                <span>{issue.sector}</span>
                <span>•</span>
                <span>{issue.location}</span>
                <span>•</span>
                <span>{formatShortDate(issue.createdAt)}</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              <div className={`text-center ${prio.text}`}>
                <span className="text-lg font-black">{issue.votes}</span>
                <p className="text-[8px] font-bold uppercase tracking-wider opacity-60">votes</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        );
      })}

      {sorted.length > 8 && (
        <div className="px-6 py-4 text-center">
          <span className="text-[10px] font-bold text-gray-400">+ {sorted.length - 8} autres signalements</span>
        </div>
      )}
    </div>
  );
}
