/**
 * String sanitization helpers for safely handling user-supplied input.
 * These utilities are useful in route handlers, logging, and content display
 * to reduce the risk of HTML injection and ensure consistent string formatting.
 */

/**
 * Removes all HTML tags from a string using a basic regex approach.
 * Suitable for cases where the DOM API is unavailable (e.g. backend/node).
 */
export const stripHtmlTags = (input: string): string => {
  if (!input) return "";
  return input.replace(/<[^>]*>/g, "").trim();
};

/**
 * Truncates a string to a maximum length, appending a suffix if truncation occurred.
 * If the string is shorter than maxLength, it is returned unchanged.
 */
export const truncate = (
  input: string,
  maxLength: number,
  suffix = "..."
): string => {
  if (!input) return "";
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Collapses multiple consecutive whitespace characters into a single space
 * and trims leading/trailing whitespace.
 */
export const normalizeWhitespace = (input: string): string => {
  if (!input) return "";
  return input.replace(/\s+/g, " ").trim();
};
