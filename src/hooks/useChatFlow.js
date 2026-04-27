import { useState, useCallback, useRef } from 'react';
import { CHAT_FLOW, translations } from '../utils/constants';
import { getNextState } from '../utils/decisionEngine';
import { logUserSession } from '../services/firebase';
import { sanitizeInput, isValidState } from '../utils/sanitization';

/**
 * Custom hook to manage the state machine and conversation logic
 * @param {string} initialLanguage - Default language code
 */
export const useChatFlow = (initialLanguage = 'en') => {
  const [language, setLanguage] = useState(initialLanguage);

  const [messages, setMessages] = useState([
    {
      id: Date.now().toString(),
      stateId: CHAT_FLOW.START,
      sender: 'bot',
      ...translations[initialLanguage][CHAT_FLOW.START]
    }
  ]);

  const [userData, setUserData] = useState({
    ageGroup: null,
    state: null,
    isRegistered: null,
    voterIdStatus: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // Track a session ID for logging
  const sessionIdRef = useRef(`session_${Date.now()}`);

  const addMessage = useCallback((msg) => {
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), ...msg }]);
  }, []);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    setMessages([{
      id: Date.now().toString(),
      stateId: CHAT_FLOW.START,
      sender: 'bot',
      ...translations[initialLanguage][CHAT_FLOW.START]
    }]);
    setUserData({ ageGroup: null, state: null, isRegistered: null, voterIdStatus: null });
    setCurrentStep(1);
  }, []);

  const handleOptionSelect = useCallback((option) => {
    const currentMessage = messages[messages.length - 1];
    if (!currentMessage || currentMessage.sender !== 'bot') return;

    // Add user message
    addMessage({ sender: 'user', text: option.label });

    // Process internal state logic
    let newUserData = { ...userData };
    if (option.value) {
      if (option.value === '18+' || option.value === '<18') {
        newUserData.ageGroup = option.value;
        setUserData(newUserData);
        setCurrentStep(2);
      }
    }

    // Get next state from decision engine
    const nextResponse = getNextState(language, currentMessage.stateId, option);
    if (!nextResponse) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({ sender: 'bot', ...nextResponse });

      // Update steps based on state
      if (nextResponse.stateId === CHAT_FLOW.REGISTERED_CHECK) setCurrentStep(3);
      if (nextResponse.stateId === CHAT_FLOW.POLLING_BOOTH) setCurrentStep(4);
      if (nextResponse.stateId === CHAT_FLOW.ELECTION_TIMELINE) setCurrentStep(5);

      // Log progress to Firebase
      logUserSession(sessionIdRef.current, { ...newUserData, lastStep: nextResponse.stateId });
    }, 800);
  }, [messages, language, userData, addMessage]);

  const handleTextInput = useCallback((text, nextStateId) => {
    const sanitizedText = sanitizeInput(text);

    if (nextStateId === CHAT_FLOW.REGISTERED_CHECK && !isValidState(sanitizedText)) {
      addMessage({ sender: 'bot', text: language === 'en' ? "That doesn't look like a valid state name. Please try again." : "यह एक मान्य राज्य का नाम नहीं लगता है। कृपया पुनः प्रयास करें।" });
      return;
    }

    addMessage({ sender: 'user', text: sanitizedText });

    let newUserData = { ...userData, state: sanitizedText };
    setUserData(newUserData);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = translations[language][nextStateId];
      if (botResponse) {
        addMessage({ sender: 'bot', stateId: nextStateId, ...botResponse });
        setCurrentStep(3);
        logUserSession(sessionIdRef.current, { ...newUserData, lastStep: nextStateId });
      }
    }, 800);
  }, [language, userData, addMessage]);

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
