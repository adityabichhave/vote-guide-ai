import React from 'react';

const MessageBubble = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`animate-slide-up ${isBot ? 'bot-message' : 'user-message'}`} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isBot ? 'flex-start' : 'flex-end',
      margin: '12px 0',
      width: '100%'
    }}>
      <div style={{
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
      }}>
        {message.text}
      </div>

      {message.showMapMockup && (
        <div className="glass animate-pop-in" style={{
            marginTop: '12px',
            width: '100%',
            maxWidth: '300px',
            height: '200px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px dashed var(--accent-secondary)'
        }}>
           <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
           <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '14px', padding: '0 10px' }}>
               Google Maps Placeholder<br/>
               <span style={{ fontSize: '12px' }}>[Polling Booth Location]</span>
           </p>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
