import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ issues, onIssueSelect }) => {
  const defaultPosition = [5.45, -4.01]; // Abidjan, Côte d'Ivoire

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border-2 border-white">
      <MapContainer
        center={defaultPosition}
        zoom={12}
        scrollZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map(issue => {
          if (!issue.coordinates || issue.coordinates.length === 0) return null;

          // MongoDB GeoJSON is [lng, lat], Leaflet is [lat, lng]
          const [lng, lat] = issue.coordinates;

          return (
            <Marker
              key={issue._id}
              position={[lat, lng]}
              eventHandlers={{ click: () => onIssueSelect(issue) }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{issue.title}</h3>
                  <p className="text-sm">{issue.description}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    issue.priority === 'Critique' ? 'bg-red-100 text-red-600' :
                    issue.priority === 'Moyenne' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {issue.priority}
                  </span>
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
