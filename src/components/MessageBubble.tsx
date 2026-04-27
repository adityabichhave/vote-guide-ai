import React, { Suspense } from 'react';
import { ChatMessage } from '../types';

// Lazy load the MapComponent to reduce initial bundle size
const MapComponent = React.lazy(() => import('./MapComponent'));

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
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
      aria-label={isBot ? "Assistant message" : "Your message"}
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
            <span style={{ color: 'var(--text-secondary)' }}>Loading Interactive Map...</span>
          </div>
        }>
           <MapComponent />
        </Suspense>
      )}
    </div>
  );
};

export default React.memo(MessageBubble);
