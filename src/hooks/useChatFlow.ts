import { useState, useCallback, useRef, useEffect } from 'react';
import { CHAT_FLOW, translations } from '../utils/constants';
import { getNextState } from '../utils/decisionEngine';
import { logUserSession, getExistingSession } from '../services/firebase';
import { sanitizeInput, isValidState } from '../utils/sanitization';
import { LanguageCode, ChatMessage, UserSessionData, MessageOption, StateNodeID } from '../types';

export const useChatFlow = (initialLanguage: LanguageCode = 'en') => {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userData, setUserData] = useState<UserSessionData>({
    ageGroup: null,
    state: null,
    isRegistered: null,
    voterIdStatus: null
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    // 1. Check local storage for an existing session
    const storedSessionId = localStorage.getItem('voteGuideSessionId');
    if (storedSessionId) {
      sessionIdRef.current = storedSessionId;
      getExistingSession(storedSessionId).then((data) => {
        if (data && data.messages.length > 0) {
          setUserData(data.userData);
          setMessages(data.messages);
          // Calculate step based on last message
          const lastBotMsg = [...data.messages].reverse().find(m => m.sender === 'bot');
          if (lastBotMsg && lastBotMsg.stateId) {
            updateStepFromState(lastBotMsg.stateId);
          }
        } else {
          initializeNewSession();
        }
        setIsRestoring(false);
      });
    } else {
      sessionIdRef.current = `session_${Date.now()}`;
      localStorage.setItem('voteGuideSessionId', sessionIdRef.current);
      initializeNewSession();
      setIsRestoring(false);
    }
  }, []);

  const initializeNewSession = useCallback((lang: LanguageCode = initialLanguage) => {
    const initMsg: ChatMessage = {
      id: Date.now().toString(),
      stateId: CHAT_FLOW.START,
      sender: 'bot',
      ...translations[lang][CHAT_FLOW.START]
    };
    setMessages([initMsg]);
    setUserData({ ageGroup: null, state: null, isRegistered: null, voterIdStatus: null });
    setCurrentStep(1);
  }, [initialLanguage]);

  const updateStepFromState = (stateId: StateNodeID) => {
    if (stateId === CHAT_FLOW.REGISTERED_CHECK) setCurrentStep(3);
    if (stateId === CHAT_FLOW.POLLING_BOOTH) setCurrentStep(4);
    if (stateId === CHAT_FLOW.ELECTION_TIMELINE) setCurrentStep(5);
  };

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => {
      const newMessages = [...prev, { id: Date.now().toString() + Math.random(), ...msg }];
      
      // Trigger background save
      setSaveStatus('saving');
      logUserSession(sessionIdRef.current, userData, newMessages).then(() => {
         setSaveStatus('saved');
         setTimeout(() => setSaveStatus('idle'), 2000);
      });
      
      return newMessages;
    });
  }, [userData]);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
    initializeNewSession(lang);
  }, [initializeNewSession]);

  const handleOptionSelect = useCallback((option: MessageOption) => {
    const currentMessage = messages[messages.length - 1];
    if (!currentMessage || currentMessage.sender !== 'bot' || !currentMessage.stateId) return;

    // Add user message
    addMessage({ sender: 'user', text: option.label });
    
    // Process internal state logic
    const newUserData = { ...userData };
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
      updateStepFromState(nextResponse.stateId);
    }, 800);
  }, [messages, language, userData, addMessage]);

  const handleTextInput = useCallback((text: string, nextStateId: StateNodeID) => {
    const sanitizedText = sanitizeInput(text);
    
    if (nextStateId === CHAT_FLOW.REGISTERED_CHECK && !isValidState(sanitizedText)) {
      addMessage({ 
        sender: 'bot', 
        text: language === 'en' ? "That doesn't look like a valid state name. Please try again." : "यह एक मान्य राज्य का नाम नहीं लगता है। कृपया पुनः प्रयास करें।" 
      });
      return;
    }

    addMessage({ sender: 'user', text: sanitizedText });
    
    const newUserData = { ...userData, state: sanitizedText };
    setUserData(newUserData);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = translations[language][nextStateId];
      if (botResponse) {
        addMessage({ sender: 'bot', stateId: nextStateId, ...botResponse });
        updateStepFromState(nextStateId);
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
    isRestoring,
    saveStatus,
    handleOptionSelect,
    handleTextInput
  };
};
