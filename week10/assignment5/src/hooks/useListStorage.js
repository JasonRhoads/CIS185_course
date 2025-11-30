// src/hooks/useListStorage.js
import { useState, useEffect } from "react";

export const INITIAL_LISTS = [
  { id: "general", name: "General" },
  { id: "work", name: "Work" },
];

export const DEFAULT_LIST_ID = INITIAL_LISTS[0].id;

const LISTS_STORAGE_KEY = "assignment5-lists";

export function useListStorage() {
  const [lists, setLists] = useState(() => {
    const stored = localStorage.getItem(LISTS_STORAGE_KEY);
    if (!stored) return INITIAL_LISTS;

    try {
      const parsed = JSON.parse(stored);
      // basic validation: must be array with id/name
      if (!Array.isArray(parsed)) return INITIAL_LISTS;
      return parsed;
    } catch {
      return INITIAL_LISTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  return [lists, setLists];
}
