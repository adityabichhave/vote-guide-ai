import React from 'react';

const ProgressTracker = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Eligibility' },
    { id: 2, label: 'Details' },
    { id: 3, label: 'Registration' },
    { id: 4, label: 'Polling' },
    { id: 5, label: 'Timeline' }
  ];

  return (
    <div className="progress-container glass animate-slide-up" style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 20px',
        margin: '10px 20px',
        borderRadius: 'var(--border-radius)',
        position: 'relative',
        zIndex: 10
    }}>
      {steps.map((step, index) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            backgroundColor: currentStep >= step.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            color: currentStep >= step.id ? '#000' : 'var(--text-secondary)',
            boxShadow: currentStep === step.id ? '0 0 10px var(--accent-primary)' : 'none'
          }}>
            {currentStep > step.id ? '✓' : step.id}
          </div>
          
          {index < steps.length - 1 && (
            <div style={{
              height: '2px',
              flex: 1,
              margin: '0 8px',
              backgroundColor: currentStep > step.id ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
              transition: 'background-color 0.3s ease'
            }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
