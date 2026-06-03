import React from 'react';

const cities = [
  { name: 'Abidjan', x: 168, y: 210, size: 'lg', pulse: true },
  { name: 'Yamoussoukro', x: 145, y: 143, size: 'md' },
  { name: 'Bouaké', x: 170, y: 100, size: 'md' },
  { name: 'Korhogo', x: 170, y: 32, size: 'md' },
  { name: 'San-Pédro', x: 80, y: 228, size: 'sm' },
  { name: 'Gagnoa', x: 118, y: 168, size: 'sm' },
  { name: 'Daloa', x: 120, y: 130, size: 'sm' },
  { name: 'Man', x: 80, y: 105, size: 'sm' },
  { name: 'Odienné', x: 80, y: 40, size: 'sm' },
  { name: 'Bondoukou', x: 250, y: 95, size: 'sm' },
  { name: 'Abengourou', x: 230, y: 135, size: 'sm' },
  { name: 'Divo', x: 130, y: 188, size: 'sm' },
  { name: 'Aboisso', x: 200, y: 235, size: 'sm' },
  { name: 'Séguéla', x: 115, y: 75, size: 'sm' },
];

const regionColors = [
  { d: 'M85 40 Q90 30 100 35 Q130 20 160 30 Q180 25 200 35 Q230 30 250 45 Q260 60 265 80 Q270 100 260 120 Q265 140 250 160 Q245 180 230 200 Q220 220 200 240 Q185 255 170 260 Q155 265 140 258 Q125 252 115 240 Q100 225 85 210 Q70 195 60 175 Q50 155 45 130 Q40 110 45 85 Q50 65 65 50 Z', color: '#008532', opacity: 0.06 },
  { d: 'M120 90 Q135 70 160 75 Q175 80 190 95 Q200 110 195 130 Q190 145 175 155 Q160 160 145 155 Q130 145 125 125 Q120 110 120 90 Z', color: '#F89406', opacity: 0.08 },
  { d: 'M90 170 Q110 160 130 170 Q150 180 160 200 Q165 215 155 230 Q140 245 120 240 Q100 235 90 220 Q80 205 85 185 Z', color: '#008532', opacity: 0.05 },
  { d: 'M175 40 Q195 30 215 40 Q235 50 245 70 Q250 90 240 110 Q230 125 210 125 Q190 120 180 105 Q170 85 172 60 Z', color: '#2563EB', opacity: 0.05 },
  { d: 'M185 140 Q205 130 225 140 Q240 155 245 175 Q240 195 225 210 Q210 220 195 210 Q180 195 180 170 Q180 155 185 140 Z', color: '#F89406', opacity: 0.06 },
];

export default function CoteMap() {
  return (
    <div className="relative w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <svg viewBox="30 10 260 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="capitalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F89406" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#F89406" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="pulseDot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008532" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#008532" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {regionColors.map((r, i) => (
          <path key={i} d={r.d} fill={r.color} opacity={r.opacity} />
        ))}

        <path
          d="M85 40 Q90 30 100 35 Q130 20 160 30 Q180 25 200 35 Q230 30 250 45 Q260 60 265 80 Q270 100 260 120 Q265 140 250 160 Q245 180 230 200 Q220 220 200 240 Q185 255 170 260 Q155 265 140 258 Q125 252 115 240 Q100 225 85 210 Q70 195 60 175 Q50 155 45 130 Q40 110 45 85 Q50 65 65 50 Z"
          fill="white"
          stroke="#008532"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />

        <path
          d="M85 40 Q90 30 100 35 Q130 20 160 30 Q180 25 200 35 Q230 30 250 45 Q260 60 265 80 Q270 100 260 120 Q265 140 250 160 Q245 180 230 200 Q220 220 200 240 Q185 255 170 260 Q155 265 140 258 Q125 252 115 240 Q100 225 85 210 Q70 195 60 175 Q50 155 45 130 Q40 110 45 85 Q50 65 65 50 Z"
          fill="none"
          stroke="#F89406"
          strokeWidth="1"
          strokeDasharray="4 3"
          strokeLinejoin="round"
          opacity="0.4"
          transform="translate(3, 3)"
        />

        {cities.map((city, i) => {
          const dotRadius = city.size === 'lg' ? 7 : city.size === 'md' ? 4 : 3;
          const glowRadius = city.size === 'lg' ? 20 : city.size === 'md' ? 14 : 10;
          return (
            <g key={i}>
              {city.pulse && (
                <>
                  <circle cx={city.x} cy={city.y} r={glowRadius} fill="url(#pulseDot)">
                    <animate attributeName="r" values={`${glowRadius};${glowRadius + 8};${glowRadius}`} dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={city.x} cy={city.y} r={glowRadius} fill="url(#capitalGlow)"/>
                </>
              )}
              <circle
                cx={city.x}
                cy={city.y}
                r={dotRadius}
                fill={city.size === 'lg' ? '#F89406' : '#008532'}
                stroke="white"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <text
                x={city.size === 'lg' ? city.x + 12 : city.size === 'md' ? city.x + 8 : city.x + 6}
                y={city.y + (city.size === 'lg' ? 4 : 3)}
                fill={city.size === 'lg' ? '#F89406' : '#6B7280'}
                fontSize={city.size === 'lg' ? 9 : 7}
                fontWeight={city.size === 'lg' ? 900 : 600}
                fontFamily="system-ui"
                className="select-none"
              >
                {city.name}
                {city.size === 'lg' && (
                  <tspan fill="#6B7280" fontSize={6} fontWeight={500}> — Capitale économique</tspan>
                )}
              </text>
            </g>
          );
        })}

        <g opacity="0.5">
          <line x1="25" y1="4" x2="28" y2="4" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
          <line x1="26" y1="4" x2="26" y2="0" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
          <text x="12" y="3" fill="#9CA3AF" fontSize="6" fontWeight={500} fontFamily="system-ui">N</text>
        </g>

        <g opacity="0.2">
          <line x1="35" y1="270" x2="50" y2="270" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2 2"/>
          <line x1="270" y1="270" x2="285" y2="270" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2 2"/>
          <text x="42" y="268" fill="#9CA3AF" fontSize="5" fontFamily="system-ui">0</text>
          <text x="272" y="268" fill="#9CA3AF" fontSize="5" fontFamily="system-ui">500 km</text>
        </g>
      </svg>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] text-gray-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F89406' }}></span>
          Capitale
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#008532' }}></span>
          Villes principales
        </span>
      </div>
    </div>
  );
}
