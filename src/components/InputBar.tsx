import React, { useState, useEffect, useRef } from 'react';

interface InputBarProps {
  placeholder?: string;
  onSubmit: (text: string) => void;
}

const InputBar: React.FC<InputBarProps> = ({ placeholder, onSubmit }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus management: focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit(text);
      setText('');
      
      // Debounce to prevent spam
      setTimeout(() => {
        setIsSubmitting(false);
        inputRef.current?.focus();
      }, 500);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="glass" 
      aria-label="Chat input form"
      style={{
        display: 'flex',
        padding: '12px',
        margin: '0 20px 20px',
        borderRadius: '30px',
        alignItems: 'center'
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Type your response..."}
        aria-label="Message input"
        disabled={isSubmitting}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '16px',
          padding: '8px 16px',
          outline: 'none',
          fontFamily: 'inherit'
        }}
      />
      <button 
        type="submit"
        disabled={!text.trim() || isSubmitting}
        aria-label="Send message"
        style={{
          background: text.trim() ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
          color: '#fff',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          opacity: text.trim() && !isSubmitting ? 1 : 0.5,
          cursor: text.trim() && !isSubmitting ? 'pointer' : 'not-allowed'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default React.memo(InputBar);
