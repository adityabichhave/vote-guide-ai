import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const MapComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  // Default mock location: New Delhi
  const position = { lat: 28.6139, lng: 77.2090 };

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
             Map unavailable<br/>
             <span style={{ fontSize: '12px' }}>[Missing API Key]</span>
         </p>
      </div>
    );
  }

  return (
    <div className="animate-pop-in" style={{ marginTop: '12px', width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden' }}>
      <APIProvider apiKey={apiKey}>
        <Map defaultCenter={position} defaultZoom={13} mapId="polling-booth-map" disableDefaultUI={true}>
          <AdvancedMarker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default React.memo(MapComponent);
