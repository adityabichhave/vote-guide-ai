import { describe, it, expect } from 'vitest';
import { sanitizeInput, isValidState } from '../utils/sanitization';

describe('sanitization utilities', () => {
  describe('sanitizeInput', () => {
    it('should strip HTML tags from input', () => {
      const input = '<script>alert("xss")</script>Hello <b onmouseover="alert()">World</b>';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle undefined and null inputs gracefully', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(undefined)).toBe('');
    });
  });

  describe('isValidState', () => {
    it('should validate correct state names', () => {
      expect(isValidState('Maharashtra')).toBe(true);
      expect(isValidState('Tamil Nadu')).toBe(true);
    });

    it('should invalidate numbers and short names', () => {
      expect(isValidState('123')).toBe(false);
      expect(isValidState('A')).toBe(false); // too short
      expect(isValidState('Gujarat123')).toBe(false);
    });
  });
});
