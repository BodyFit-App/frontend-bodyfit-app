import { useState, useEffect } from "react";

/**
 * Custom hook `useDebounce` that returns a debounced version of the provided value.
 * The returned value only updates after the specified delay has passed since the last change.
 * This is useful for scenarios like search input fields where you want to limit the number of updates.
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds after which the value will be updated.
 * @returns {string} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search action
 *   }
 * }, [debouncedSearchTerm]);
 */

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
