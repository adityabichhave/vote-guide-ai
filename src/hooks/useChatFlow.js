import { useState, useCallback } from 'react';
import { CHAT_FLOW, translations } from '../utils/constants';

export const useChatFlow = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);
  
  // messages format: { id: string, sender: 'bot' | 'user', text: string, options: Array, inputType: string, inputPlaceholder: string, showMapMockup: boolean }
  const [messages, setMessages] = useState([
    { 
      id: Date.now().toString(), 
      sender: 'bot', 
      ...translations[initialLanguage][CHAT_FLOW.START] 
    }
  ]);
  
  // Track user data
  const [userData, setUserData] = useState({
    ageGroup: null,
    state: null,
    isRegistered: null,
    voterIdStatus: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = useCallback((msg) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), ...msg }]);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Restart flow on language change for simplicity
    setMessages([{ 
      id: Date.now().toString(), 
      sender: 'bot', 
      ...translations[lang][CHAT_FLOW.START] 
    }]);
    setUserData({ ageGroup: null, state: null, isRegistered: null, voterIdStatus: null });
    setCurrentStep(1);
  };

  const handleOptionSelect = (option) => {
    // 1. Add user message
    addMessage({ sender: 'user', text: option.label });
    
    // Process internal state logic based on the action
    if (option.value) {
        if (option.value === '18+' || option.value === '<18') {
             setUserData(prev => ({...prev, ageGroup: option.value}));
             setCurrentStep(2);
        }
    }
    
    // Determine next state
    let nextStateId = option.nextState;
    if (option.action) {
         if (option.action === 'lost_card') nextStateId = 'lost_card_info';
         if (option.action === 'corrections') nextStateId = 'corrections_info';
    }

    if (!nextStateId) return;

    // 2. Simulate typing then add bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = translations[language][nextStateId];
      if (botResponse) {
        addMessage({ sender: 'bot', ...botResponse });
        
        // Update steps based on state
        if (nextStateId === CHAT_FLOW.REGISTERED_CHECK) setCurrentStep(3);
        if (nextStateId === CHAT_FLOW.POLLING_BOOTH) setCurrentStep(4);
        if (nextStateId === CHAT_FLOW.ELECTION_TIMELINE) setCurrentStep(5);
      }
    }, 800);
  };

  const handleTextInput = (text, nextStateId) => {
     addMessage({ sender: 'user', text });
     setUserData(prev => ({...prev, state: text}));
     
     setIsTyping(true);
     setTimeout(() => {
       setIsTyping(false);
       const botResponse = translations[language][nextStateId];
       if (botResponse) {
         addMessage({ sender: 'bot', ...botResponse });
         setCurrentStep(3); // Moving to registration check
       }
     }, 800);
  };

  return {
    language,
    changeLanguage,
    messages,
    userData,
    currentStep,
    isTyping,
    handleOptionSelect,
    handleTextInput
  };
};
