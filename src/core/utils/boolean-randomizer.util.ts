/**
 * Get "true" or "false" with a certain possibility
 * @param possibilityPercent Percent of possibility,
 * @type Number from 0 to 100
 */
export const booleanRandomizer = (possibilityPercent: number): boolean => {
  return Math.random() * 100 >= 100 - possibilityPercent;
};
