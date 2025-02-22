/**
 * Slices a text string to a specified length limit and adds ellipsis if truncated
 * @param {string} text - The input text to be sliced
 * @param {number} [limit=100] - Maximum length of the output text
 * @returns {string} Truncated text with ellipsis if exceeds limit, otherwise original text
 */

export const txtSlicer = (text: string, limit: number = 100) => {
  if (text.length >= limit) {
    return text.slice(0, limit) + "...";
  }
  return text;
};
