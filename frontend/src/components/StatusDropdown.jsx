import React from 'react';

export default function StatusDropdown({ issue, onStatusChange }) {
  const styles = {
    'Signalé': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'En cours': 'bg-blue-50 text-blue-700 border-blue-200',
    'Résolu': 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <select
      value={issue.status}
      onChange={(e) => onStatusChange(issue._id, e.target.value)}
      className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer transition-all outline-none focus:ring-2 focus:ring-ciGreen/30 ${styles[issue.status] || 'bg-gray-100 text-gray-600'}`}
    >
      <option value="Signalé">Signalé</option>
      <option value="En cours">En cours</option>
      <option value="Résolu">Résolu</option>
    </select>
  );
}
