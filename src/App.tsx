import React from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import ProgressTracker from './components/ProgressTracker';
import LanguageToggle from './components/LanguageToggle';
import ErrorBoundary from './components/ErrorBoundary';
import { useChatFlow } from './hooks/useChatFlow';

function App() {
  const {
    language,
    changeLanguage,
    messages,
    currentStep,
    isTyping,
    isRestoring,
    saveStatus,
    handleOptionSelect,
    handleTextInput
  } = useChatFlow('en');

  if (isRestoring) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
        Loading session...
      </div>
    );
  }

  const currentMessage = messages[messages.length - 1];
  const requiresInput = currentMessage?.inputType === 'text' && 
                        (!currentMessage.options || currentMessage.options.length === 0) &&
                        !isTyping && 
                        currentMessage.sender === 'bot';

  const onInputSubmit = (text: string) => {
    if (requiresInput && currentMessage.nextState) {
       handleTextInput(text, currentMessage.nextState);
    }
  };

  return (
    <ErrorBoundary>
      <LanguageToggle currentLang={language} onToggle={changeLanguage} />
      
      {/* Session Persistence Indicator */}
      <div 
        aria-live="polite"
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          opacity: saveStatus === 'idle' ? 0.5 : 1,
          transition: 'opacity 0.3s'
        }}
      >
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: saveStatus === 'saving' ? '#ffeb3b' : saveStatus === 'saved' ? 'var(--success)' : 'var(--text-secondary)'
        }} />
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved securely' : 'Session active'}
      </div>

      <ProgressTracker currentStep={currentStep} />
      
      <ChatWindow 
        messages={messages} 
        isTyping={isTyping} 
        onOptionSelect={handleOptionSelect} 
      />
      
      {requiresInput && (
        <InputBar 
          placeholder={currentMessage.inputPlaceholder} 
          onSubmit={onInputSubmit} 
        />
      )}
    </ErrorBoundary>
  );
}

export default App;
