import React, { Suspense } from 'react';

// Lazy load the MapComponent to reduce initial bundle size
const MapComponent = React.lazy(() => import('./MapComponent'));

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div 
      className={`animate-slide-up ${isBot ? 'bot-message' : 'user-message'}`} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isBot ? 'flex-start' : 'flex-end',
        margin: '12px 0',
        width: '100%'
      }}
      role="listitem"
      aria-label={isBot ? "Assistant message" : "User message"}
    >
      <div 
        style={{
          maxWidth: '85%',
          padding: '14px 18px',
          borderRadius: isBot ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
          background: isBot ? 'var(--bg-tertiary)' : 'var(--accent-gradient)',
          color: 'var(--text-primary)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          fontSize: '15px',
          lineHeight: '1.5',
          position: 'relative',
          wordWrap: 'break-word',
          whiteSpace: 'pre-line'
        }}
        tabIndex={0}
      >
        {message.text}
      </div>

      {message.showMapMockup && (
        <Suspense fallback={
          <div className="glass animate-pop-in" style={{ width: '100%', maxWidth: '300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '12px', borderRadius: '12px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Loading Map...</span>
          </div>
        }>
           <MapComponent />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(MessageBubble);
