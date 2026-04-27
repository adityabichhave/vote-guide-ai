import { translations } from './constants';

/**
 * Evaluates the next state based on current state and user input.
 * Acts as the centralized state machine for the chat assistant.
 * 
 * @param {string} language - The current language code ('en' or 'hi')
 * @param {string} currentStateId - The ID of the current conversation node
 * @param {object} input - User action payload { type: 'option'|'text', value?: string, action?: string, nextState?: string }
 * @returns {object|null} The next message block object or null if none found
 */
export const getNextState = (language, currentStateId, input) => {
  const currentBlock = translations[language]?.[currentStateId];
  if (!currentBlock) return null;

  // 1. Explicit next state provided in the option
  if (input.nextState) {
      return {
          stateId: input.nextState,
          ...translations[language][input.nextState]
      };
  }
  
  // 2. Programmatic action requiring logic
  if (input.action) {
      let nextId;
      if (input.action === 'lost_card') nextId = 'lost_card_info';
      if (input.action === 'corrections') nextId = 'corrections_info';
      
      if (nextId && translations[language][nextId]) {
          return {
              stateId: nextId,
              ...translations[language][nextId]
          };
      }
  }

  // Fallback
  return null;
};
