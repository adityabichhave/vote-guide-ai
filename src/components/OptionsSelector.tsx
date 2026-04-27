import React from 'react';
import { MessageOption } from '../types';

interface OptionsSelectorProps {
  options: MessageOption[];
  onSelect: (option: MessageOption) => void;
}

const OptionsSelector: React.FC<OptionsSelectorProps> = ({ options, onSelect }) => {
  if (!options || options.length === 0) return null;

  return (
    <div 
      className="animate-slide-up" 
      role="group" 
      aria-label="Available options"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '10px',
        marginBottom: '20px',
        paddingLeft: '10px'
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          aria-label={`Select option: ${option.label}`}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            background: 'transparent',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.background = 'var(--accent-primary)';
            (e.target as HTMLButtonElement).style.color = '#000';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.background = 'transparent';
            (e.target as HTMLButtonElement).style.color = 'var(--accent-primary)';
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(OptionsSelector);
