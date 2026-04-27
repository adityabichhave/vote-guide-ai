import React, { useState } from 'react';

const InputBar = ({ placeholder, onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass" style={{
      display: 'flex',
      padding: '12px',
      margin: '0 20px 20px',
      borderRadius: '30px',
      alignItems: 'center'
    }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder || "Type your response..."}
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
        disabled={!text.trim()}
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
          opacity: text.trim() ? 1 : 0.5,
          cursor: text.trim() ? 'pointer' : 'not-allowed'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </form>
  );
};

export default InputBar;
