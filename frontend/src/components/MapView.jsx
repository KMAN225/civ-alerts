import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

const markerSvg = (color = '#008532') => `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="36" viewBox="0 0 24 36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="white"/>
  </svg>`;

const DefaultIcon = L.divIcon({
  html: markerSvg('#008532'),
  className: '',
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});
L.Marker.prototype.options.icon = DefaultIcon;

const priorityColors = {
  Critique: '#DC2626',
  Moyenne: '#D97706',
  Faible: '#2563EB'
};

function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { duration: 1 });
    }
  }, [center]);
  return null;
}

const userIcon = L.divIcon({
  html: `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px">
    <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:#F89406;animation:locate-pulse 2s ease-out infinite;opacity:0.3"></div>
    <div style="width:14px;height:14px;background:#F89406;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2)"></div>
  </div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -16],
});

function LocateButton() {
  const map = useMap();
  const [position, setPosition] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        map.flyTo(coords, 14, { duration: 1.5 });
        setLocating(false);
      },
      () => {
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  }, [map]);

  return (
    <>
      {position && (
        <Marker position={position} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-xs">Vous êtes ici</p>
              <p className="text-[10px] text-gray-400">
                {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      <div className="leaflet-bottom leaflet-left" style={{ zIndex: 1000, marginBottom: '20px', marginLeft: '10px' }}>
        <button
          onClick={handleLocate}
          disabled={locating}
          className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all text-xs font-bold text-gray-700 disabled:opacity-60"
        >
          {locating ? (
            <>
              <span className="w-3 h-3 border-2 border-gray-300 border-t-ciOrange rounded-full animate-spin"></span>
              Localisation...
            </>
          ) : (
            <>
              <span className="text-base leading-none">📍</span>
              Me localiser
            </>
          )}
        </button>
      </div>
    </>
  );
}

const MapView = ({ issues, compact, mapCenter }) => {
  const defaultCenter = [7.54, -5.55];
  const zoom = compact ? 5.5 : 7;
  const height = compact ? '220px' : '100%';

  const issueMarkers = issues?.filter(i => i.coordinates?.coordinates?.length) || [];

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={zoom}
        scrollWheelZoom={!compact}
        dragging={!compact}
        zoomControl={!compact}
        doubleClickZoom={!compact}
        touchZoom={!compact}
        keyboard={!compact}
        style={{ height: '100%', width: '100%', borderRadius: compact ? '10px' : '16px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={mapCenter} />
        <LocateButton />
        {issueMarkers.map(issue => {
          const [lng, lat] = issue.coordinates.coordinates;
          const pColor = priorityColors[issue.priority] || '#008532';
          const icon = L.divIcon({ html: markerSvg(pColor), className: '', iconSize: [24, 36], iconAnchor: [12, 36], popupAnchor: [0, -36] });
          return (
            <Marker key={issue._id} position={[lat, lng]} icon={icon}>
              <Popup>
                <div className="min-w-[180px] p-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColors[issue.priority] }} />
                    <h3 className="font-bold text-xs">{issue.title}</h3>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-1.5 line-clamp-2">{issue.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold text-gray-400">{issue.location}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      issue.priority === 'Critique' ? 'bg-red-100 text-red-600' :
                      issue.priority === 'Moyenne' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>{issue.priority}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
