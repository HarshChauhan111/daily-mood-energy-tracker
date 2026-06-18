import { useState, useEffect, useRef } from 'react';

/**
 * Generic hook that syncs a piece of state with localStorage.
 * Reads the initial value once on mount, then writes back to
 * localStorage whenever the state changes. Keeping this generic
 * (rather than baking "entries" logic into it) makes it reusable
 * for any future piece of persisted state.
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn(`Could not read "${key}" from localStorage:`, error);
      return defaultValue;
    }
  });

  // Skip writing on the very first render since we just read this value.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not write "${key}" to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
