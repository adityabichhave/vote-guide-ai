import React from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import ProgressTracker from './components/ProgressTracker';
import LanguageToggle from './components/LanguageToggle';
import { useChatFlow } from './hooks/useChatFlow';

function App() {
  const {
    language,
    changeLanguage,
    messages,
    currentStep,
    isTyping,
    handleOptionSelect,
    handleTextInput
  } = useChatFlow('en');

  const currentMessage = messages[messages.length - 1];
  const requiresInput = currentMessage?.inputType === 'text' && 
                        (!currentMessage.options || currentMessage.options.length === 0) &&
                        !isTyping && 
                        currentMessage.sender === 'bot';

  const onInputSubmit = (text) => {
    if (requiresInput) {
       handleTextInput(text, currentMessage.nextState);
    }
  };

  return (
    <>
      <LanguageToggle currentLang={language} onToggle={changeLanguage} />
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
    </>
  );
}

export default App;
