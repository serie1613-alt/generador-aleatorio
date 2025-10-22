// Utility functions for random generation

/**
 * Generate random numbers without repetition
 * @param {number} min - Minimum number (inclusive)
 * @param {number} max - Maximum number (inclusive)
 * @param {number} count - How many numbers to generate
 * @returns {Array} Array of unique random numbers
 */
export const generateRandomNumbers = (min, max, count) => {
  if (count > (max - min + 1)) {
    throw new Error('Cannot generate more unique numbers than the range allows');
  }

  const numbers = [];
  const available = [];
  
  // Create array of all possible numbers
  for (let i = min; i <= max; i++) {
    available.push(i);
  }

  // Fisher-Yates shuffle and pick first 'count' numbers
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  return available.slice(0, count).sort((a, b) => a - b);
};

/**
 * Generate multiple combinations of random numbers
 * @param {number} min - Minimum number
 * @param {number} max - Maximum number
 * @param {number} count - Numbers per combination
 * @param {number} combinations - How many combinations to generate
 * @returns {Array} Array of combinations
 */
export const generateMultipleCombinations = (min, max, count, combinations) => {
  const results = [];
  for (let i = 0; i < combinations; i++) {
    results.push(generateRandomNumbers(min, max, count));
  }
  return results;
};

/**
 * Generate random password
 * @param {number} length - Password length
 * @param {Object} options - Character options
 * @returns {string} Generated password
 */
export const generatePassword = (length, options) => {
  const { uppercase, lowercase, numbers, special } = options;
  
  let charset = '';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) charset += '0123456789';
  if (special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (charset === '') {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
};

/**
 * Calculate password strength
 * @param {string} password - Password to evaluate
 * @returns {Object} Strength info
 */
export const calculatePasswordStrength = (password) => {
  let strength = 0;
  let feedback = [];

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (password.length >= 16) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

  if (password.length < 8) feedback.push('Use at least 8 characters');
  if (!/[a-z]/.test(password)) feedback.push('Add lowercase letters');
  if (!/[A-Z]/.test(password)) feedback.push('Add uppercase letters');
  if (!/[0-9]/.test(password)) feedback.push('Add numbers');
  if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('Add special characters');

  let level = 'Weak';
  let color = '#ef4444'; // red
  if (strength >= 6) {
    level = 'Strong';
    color = '#22c55e'; // green
  } else if (strength >= 4) {
    level = 'Medium';
    color = '#eab308'; // yellow
  }

  return { strength, level, color, feedback, percentage: (strength / 7) * 100 };
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
