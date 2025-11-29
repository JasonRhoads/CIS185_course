import { useState, useEffect } from "react";

export function useTaskStorage() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("assignment5-tasks");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return parsed.map((task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("assignment5-tasks", JSON.stringify(tasks));
  }, [tasks]);

  return [tasks, setTasks];
}
