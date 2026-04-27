import DOMPurify from 'dompurify';
import { z } from 'zod';

/**
 * Sanitizes user input string to prevent XSS.
 * 
 * @param input - The dirty string from user
 * @returns Sanitized string stripped of any HTML tags
 */
export const sanitizeInput = (input: unknown): string => {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
};

// Zod schema for validating Indian states
const StateSchema = z.string()
  .min(2, "State name must be at least 2 characters long")
  .max(50, "State name is too long")
  .regex(/^[a-zA-Z\s]+$/, "State name can only contain letters and spaces");

/**
 * Zod validation for Indian state names
 * @param state - The text input
 * @returns True if valid
 */
export const isValidState = (state: string): boolean => {
  const sanitized = sanitizeInput(state);
  const result = StateSchema.safeParse(sanitized);
  return result.success;
};
