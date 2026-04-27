import { translations } from './constants';
import { StateNode, StateNodeID, MessageOption, LanguageCode } from '../types';

/**
 * Evaluates the next state based on current state and user input.
 * Acts as the centralized state machine for the chat assistant.
 * 
 * @param language - The current language code
 * @param currentStateId - The ID of the current conversation node
 * @param input - User action payload
 * @returns The next message block object or null if none found
 */
export const getNextState = (
  language: LanguageCode, 
  currentStateId: string, 
  input: MessageOption
): (StateNode & { stateId: StateNodeID }) | null => {
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
      let nextId: StateNodeID | undefined;
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
