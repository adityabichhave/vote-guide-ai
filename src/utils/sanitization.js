import DOMPurify from 'dompurify';

/**
 * Sanitizes user input string to prevent XSS.
 * Since React automatically escapes text rendering, this is mainly for sanitizing data before storage or state mutation if needed.
 * 
 * @param {string} input - The dirty string from user
 * @returns {string} Sanitized string stripped of any HTML tags
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  // Strip all HTML tags to guarantee plain text
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
};

/**
 * Basic validation for general text input like a state name
 * @param {string} state - The text input
 * @returns {boolean} True if it seems like a valid reasonable text
 */
export const isValidState = (state) => {
  const sanitized = sanitizeInput(state);
  // Basic check: longer than 2 chars, letters and spaces only
  return sanitized.length >= 2 && sanitized.length <= 50 && /^[a-zA-Z\s]+$/.test(sanitized);
};
