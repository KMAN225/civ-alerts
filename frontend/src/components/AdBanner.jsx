import React from 'react';

export default function AdBanner({ slot, format = 'auto', className = '' }) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className="ad-container bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl flex items-center justify-center min-h-[90px] text-gray-300 text-xs font-medium"
          data-ad-client="ca-pub-4484826917625401"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        >
          Publicité
        </div>
      </div>
    </div>
  );
}
