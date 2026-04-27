import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapComponent: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  // Default interactive mock location: New Delhi
  const [markerPosition, setMarkerPosition] = useState({ lat: 28.6139, lng: 77.2090 });

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="glass animate-pop-in" style={{
          marginTop: '12px',
          width: '100%',
          maxWidth: '300px',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px dashed var(--accent-secondary)'
      }}>
         <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
         <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '14px', padding: '0 10px' }}>
             Interactive Map unavailable<br/>
             <span style={{ fontSize: '12px' }}>[Missing API Key]</span>
         </p>
      </div>
    );
  }

  return (
    <div className="animate-pop-in" style={{ marginTop: '12px', width: '100%', height: '250px', borderRadius: '12px', overflow: 'hidden' }}>
      <APIProvider apiKey={apiKey}>
        <Map 
          defaultCenter={markerPosition} 
          defaultZoom={14} 
          mapId="polling-booth-interactive-map" 
          disableDefaultUI={true}
          gestureHandling="greedy"
        >
          <AdvancedMarker 
            position={markerPosition} 
            draggable={true}
            onDragEnd={(e) => {
              if (e.latLng) {
                setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }
            }}
          >
            <Pin background={'var(--accent-primary)'} borderColor={'var(--bg-primary)'} glyphColor={'var(--bg-primary)'} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
      <div style={{ padding: '8px', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
        Drag the pin to simulate finding a booth. (Lat: {markerPosition.lat.toFixed(4)}, Lng: {markerPosition.lng.toFixed(4)})
      </div>
    </div>
  );
};

export default React.memo(MapComponent);
