import React from 'react';
import { LanguageCode } from '../types';

interface LanguageToggleProps {
  currentLang: LanguageCode;
  onToggle: (lang: LanguageCode) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div 
      className="glass" 
      role="group"
      aria-label="Language selection"
      style={{
        position: 'absolute',
        top: '15px',
        right: '20px',
        display: 'flex',
        borderRadius: '20px',
        padding: '4px',
        zIndex: 20
      }}
    >
      <button
        onClick={() => onToggle('en')}
        aria-pressed={currentLang === 'en'}
        aria-label="Switch to English"
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 'bold',
          background: currentLang === 'en' ? 'var(--accent-gradient)' : 'transparent',
          color: currentLang === 'en' ? '#fff' : 'var(--text-secondary)',
          transition: 'all 0.3s ease'
        }}
      >
        EN
      </button>
      <button
        onClick={() => onToggle('hi')}
        aria-pressed={currentLang === 'hi'}
        aria-label="Switch to Hindi"
        style={{
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 'bold',
          background: currentLang === 'hi' ? 'var(--accent-gradient)' : 'transparent',
          color: currentLang === 'hi' ? '#fff' : 'var(--text-secondary)',
          transition: 'all 0.3s ease'
        }}
      >
        HI
      </button>
    </div>
  );
};

export default React.memo(LanguageToggle);
