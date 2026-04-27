import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import OptionsSelector from './OptionsSelector';
import { ChatMessage, MessageOption } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onOptionSelect: (option: MessageOption) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping, onOptionSelect }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div 
      role="log" 
      aria-live="polite" 
      aria-relevant="additions text"
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }} role="banner">
         <h1 style={{ 
             margin: 0, 
             fontSize: '28px', 
             fontWeight: '700',
             background: 'var(--accent-gradient)',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             display: 'inline-block'
         }}>
             VoteGuide AI
         </h1>
         <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
             Your personal election assistant
         </p>
      </div>

      <div role="list" style={{ display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;
          
          return (
            <div key={msg.id} role="listitem">
              <MessageBubble message={msg} />
              {isLastMessage && !isTyping && msg.options && msg.options.length > 0 && (
                <OptionsSelector options={msg.options} onSelect={onOptionSelect} />
              )}
            </div>
          );
        })}
      </div>

      {isTyping && (
        <div 
          className="bot-message animate-slide-up" 
          aria-label="Assistant is typing"
          role="status"
          style={{
            alignSelf: 'flex-start',
            margin: '12px 0',
            padding: '14px 18px',
            borderRadius: '20px 20px 20px 4px',
            background: 'var(--bg-tertiary)',
            display: 'flex',
            gap: '6px'
          }}
        >
            <span style={{ animation: 'slideUp 1s infinite', animationDelay: '0s' }}>●</span>
            <span style={{ animation: 'slideUp 1s infinite', animationDelay: '0.2s' }}>●</span>
            <span style={{ animation: 'slideUp 1s infinite', animationDelay: '0.4s' }}>●</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default React.memo(ChatWindow);
