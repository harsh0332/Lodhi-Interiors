/**
 * Utility functions for LODHI INTERIORS.
 * Clean, lightweight class concatenation without external runtime libraries.
 */

export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ').trim();
}

/**
 * Format a number as Indian Rupee (INR) or formatted square footage.
 */
export function formatSqft(sqft: number): string {
  return `${new Intl.NumberFormat('en-IN').format(sqft)} sq.ft.`;
}

/**
 * Format year as string
 */
export function formatYear(year: number): string {
  return year.toString();
}
