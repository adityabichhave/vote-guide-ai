import { describe, it, expect } from 'vitest';
import { getNextState } from '../utils/decisionEngine';
import { CHAT_FLOW, translations } from '../utils/constants';

describe('decisionEngine', () => {
  it('should return next state object directly if nextState is provided', () => {
    const input = { label: 'Yes', nextState: CHAT_FLOW.AGE_CHECK };
    const result = getNextState('en', CHAT_FLOW.START, input);
    
    expect(result).not.toBeNull();
    expect(result.stateId).toBe(CHAT_FLOW.AGE_CHECK);
    expect(result.text).toBe(translations['en'][CHAT_FLOW.AGE_CHECK].text);
  });

  it('should return action-mapped state correctly', () => {
    const input = { label: 'I lost my card', action: 'lost_card' };
    const result = getNextState('en', CHAT_FLOW.VOTER_ID_ISSUES, input);
    
    expect(result).not.toBeNull();
    expect(result.stateId).toBe('lost_card_info');
    expect(result.text).toContain('lost your Voter ID card');
  });

  it('should return null for unmatched or undefined inputs', () => {
    const input = { label: 'Unknown', somethingElse: true };
    const result = getNextState('en', CHAT_FLOW.START, input);
    
    expect(result).toBeNull();
  });
});
