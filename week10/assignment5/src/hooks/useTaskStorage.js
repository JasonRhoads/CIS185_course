// src/hooks/useTaskStorage.js

import { useState, useEffect } from "react";

/**
 * useTaskStorage Hook
 *
 * Manages the array of tasks with persistence in localStorage.
 *
 * Responsibilities:
 * - Load tasks from localStorage on app start
 * - Convert saved date strings back into Date objects
 * - Save updated tasks whenever they change
 *
 * Returns:
 *   [tasks, setTasks]
 *      tasks: array of task objects
 *      setTasks: state setter for updating tasks
 */
export function useTaskStorage() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("assignment5-tasks");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);

      // Ensure createdAt is restored as a Date object for each task
      return parsed.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    } catch {
      // On JSON error or unexpected structure, fallback to empty list
      return [];
    }
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("assignment5-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
}
