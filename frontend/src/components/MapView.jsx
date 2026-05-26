import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
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
        {issueMarkers.map(issue => {
          const [lng, lat] = issue.coordinates.coordinates;
          return (
            <Marker key={issue._id} position={[lat, lng]}>
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
