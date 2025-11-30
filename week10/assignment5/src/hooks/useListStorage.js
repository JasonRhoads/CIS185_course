// src/hooks/useListStorage.js

import { useState, useEffect } from "react";

/**
 * Default lists shown when the app first loads.
 * These act as starter categories for organizing tasks.
 */
export const INITIAL_LISTS = [
  { id: "general", name: "General" },
  { id: "work", name: "Work" },
];

/**
 * The "General" list is treated as the required default list
 * (cannot be deleted and used when a task has no listId assigned).
 */
export const DEFAULT_LIST_ID = INITIAL_LISTS[0].id;

// LocalStorage key for saving lists
const LISTS_STORAGE_KEY = "assignment5-lists";

/**
 * useListStorage Hook
 *
 * Manages the user's task lists with persistence in localStorage.
 *
 * Responsibilities:
 * - Load lists from storage on first run
 * - Validate the stored data
 * - Save updated lists whenever they change
 *
 * Returns:
 *   [lists, setLists]
 *      lists: array of list objects { id, name }
 *      setLists: state setter for updating lists
 */
export function useListStorage() {
  const [lists, setLists] = useState(() => {
    // Attempt to load saved lists from localStorage
    const stored = localStorage.getItem(LISTS_STORAGE_KEY);
    if (!stored) return INITIAL_LISTS;

    try {
      const parsed = JSON.parse(stored);

      // Basic validation: ensure it's an array
      if (!Array.isArray(parsed)) return INITIAL_LISTS;

      return parsed;
    } catch {
      // If JSON parsing fails, revert to defaults
      return INITIAL_LISTS;
    }
  });

  // Persist lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  return [lists, setLists];
}
