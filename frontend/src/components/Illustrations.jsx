import React from 'react';

export const MapIllustration = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" rx="20" fill="white"/>
    <rect x="20" y="20" width="360" height="260" rx="12" fill="#F0FDF4"/>
    <path d="M40 120 L80 80 L140 100 L200 60 L260 110 L320 80 L360 130 L360 240 L320 260 L260 230 L200 250 L140 220 L80 240 L40 210 Z" fill="#DCFCE7" opacity="0.6"/>
    <path d="M80 80 L140 100 L140 220 L80 240 Z" fill="#BBF7D0" opacity="0.4"/>
    <circle cx="120" cy="140" r="12" fill="#008532" opacity="0.15"/>
    <circle cx="120" cy="140" r="6" fill="#008532"/>
    <circle cx="120" cy="140" r="2" fill="white"/>
    <circle cx="220" cy="120" r="12" fill="#F89406" opacity="0.15"/>
    <circle cx="220" cy="120" r="6" fill="#F89406"/>
    <circle cx="220" cy="120" r="2" fill="white"/>
    <circle cx="300" cy="180" r="12" fill="#008532" opacity="0.15"/>
    <circle cx="300" cy="180" r="6" fill="#008532"/>
    <circle cx="300" cy="180" r="2" fill="white"/>
    <circle cx="180" cy="200" r="12" fill="#008532" opacity="0.15"/>
    <circle cx="180" cy="200" r="6" fill="#008532"/>
    <circle cx="180" cy="200" r="2" fill="white"/>
    <circle cx="90" cy="190" r="8" fill="#F89406" opacity="0.15"/>
    <circle cx="90" cy="190" r="4" fill="#F89406"/>
    <circle cx="90" cy="190" r="1.5" fill="white"/>
    <rect x="155" y="15" width="90" height="20" rx="10" fill="#008532"/>
    <text x="200" y="29" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="system-ui">CARTE INTERACTIVE</text>
    <rect x="30" y="260" width="100" height="16" rx="8" fill="#DCFCE7"/>
    <rect x="140" y="260" width="100" height="16" rx="8" fill="#FEF3C7"/>
    <rect x="250" y="260" width="100" height="16" rx="8" fill="#DBEAFE"/>
  </svg>
);

export const EmptyIllustration = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="20" width="140" height="100" rx="16" fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 4"/>
    <rect x="55" y="40" width="90" height="8" rx="4" fill="#D1D5DB"/>
    <rect x="55" y="55" width="70" height="6" rx="3" fill="#E5E7EB"/>
    <rect x="55" y="68" width="80" height="6" rx="3" fill="#E5E7EB"/>
    <rect x="55" y="81" width="60" height="6" rx="3" fill="#E5E7EB"/>
    <rect x="30" y="85" width="8" height="8" rx="4" fill="#D1D5DB"/>
    <rect x="165" y="85" width="8" height="8" rx="4" fill="#D1D5DB"/>
    <circle cx="100" cy="140" r="18" fill="#D1D5DB" opacity="0.3"/>
    <circle cx="100" cy="140" r="10" fill="#D1D5DB" opacity="0.5"/>
    <circle cx="100" cy="140" r="4" fill="#9CA3AF"/>
    <path d="M15 145 L35 145" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
    <path d="M165 145 L185 145" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SuccessIllustration = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="55" fill="#F0FDF4" stroke="#008532" strokeWidth="3"/>
    <circle cx="60" cy="60" r="40" fill="#DCFCE7"/>
    <path d="M40 60 L55 75 L80 45" stroke="#008532" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="60" cy="60" r="55" fill="none" stroke="#008532" strokeWidth="3" strokeDasharray="10 5" opacity="0.3"/>
  </svg>
);

export const ShieldIllustration = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 L90 30 L90 60 C90 85 75 100 50 110 C25 100 10 85 10 60 L10 30 Z" fill="#F0FDF4" stroke="#008532" strokeWidth="3"/>
    <path d="M50 20 L80 35 L80 60 C80 80 68 92 50 100 C32 92 20 80 20 60 L20 35 Z" fill="#DCFCE7"/>
    <path d="M38 65 L48 75 L62 55" stroke="#008532" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ReportIllustration = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="10" width="90" height="120" rx="8" fill="white" stroke="#D1D5DB" strokeWidth="2"/>
    <rect x="25" y="20" width="70" height="6" rx="3" fill="#008532"/>
    <rect x="25" y="35" width="55" height="4" rx="2" fill="#D1D5DB"/>
    <rect x="25" y="45" width="60" height="4" rx="2" fill="#D1D5DB"/>
    <rect x="25" y="55" width="40" height="4" rx="2" fill="#D1D5DB"/>
    <rect x="25" y="70" width="70" height="6" rx="3" fill="#F89406"/>
    <rect x="25" y="82" width="55" height="4" rx="2" fill="#D1D5DB"/>
    <rect x="25" y="92" width="60" height="4" rx="2" fill="#D1D5DB"/>
    <rect x="25" y="102" width="35" height="4" rx="2" fill="#D1D5DB"/>
    <path d="M25 120 L15 130 L105 130 L95 120 Z" fill="#D1D5DB"/>
  </svg>
);

export const VerifiedBadge = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#008532"/>
    <path d="M8 12.5 L11 15.5 L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SectorIcon = ({ sector, className = '' }) => {
  const icons = {
    Agriculture: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#F0FDF4"/>
        <path d="M12 28 L20 12 L28 28" stroke="#008532" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24 L20 22 L24 24" stroke="#008532" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="18" y="28" width="4" height="3" rx="1" fill="#008532" opacity="0.5"/>
      </svg>
    ),
    Santé: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#FEF2F2"/>
        <rect x="14" y="10" width="12" height="20" rx="3" fill="#DC2626" opacity="0.3"/>
        <path d="M20 14 L20 26 M14 20 L26 20" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    Éducation: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#EFF6FF"/>
        <path d="M12 28 L20 12 L28 28" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="16" y="24" width="8" height="4" rx="1" fill="#2563EB" opacity="0.3"/>
      </svg>
    ),
    Transport: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#F5F5F4"/>
        <rect x="10" y="22" width="20" height="10" rx="3" fill="#78716C" opacity="0.3"/>
        <rect x="12" y="24" width="16" height="6" rx="1" fill="#78716C" opacity="0.5"/>
        <circle cx="15" cy="33" r="3" fill="#78716C"/>
        <circle cx="25" cy="33" r="3" fill="#78716C"/>
        <rect x="22" y="16" width="8" height="6" rx="2" fill="#78716C" opacity="0.3"/>
        <rect x="14" y="14" width="2" height="4" rx="1" fill="#78716C" opacity="0.2"/>
      </svg>
    ),
    Numérique: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#F5F3FF"/>
        <rect x="12" y="12" width="16" height="12" rx="2" fill="#7C3AED" opacity="0.3"/>
        <rect x="14" y="14" width="12" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>
        <path d="M18 26 L18 28 M22 26 L22 28" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="28" x2="24" y2="28" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    Énergie: (
      <svg className={className} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="18" fill="#FFF7ED"/>
        <path d="M22 8 L14 22 L20 22 L18 32 L28 18 L22 18 Z" fill="#F89406" opacity="0.6"/>
        <path d="M22 8 L14 22 L20 22 L18 32" stroke="#F89406" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[sector] || icons.Agriculture;
};
