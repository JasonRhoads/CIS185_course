// src/App.jsx

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskCount from "./components/TaskCount";
import ListInput from "./components/ListInput";
import ListContainer from "./components/ListContainer";

import { useTaskStorage } from "./hooks/useTaskStorage";
import { useListStorage, DEFAULT_LIST_ID } from "./hooks/useListStorage";
import "./App.css";

/**
 * App Component (root)
 *
 * Manages:
 * - tasks (add, toggle, delete, reorder)
 * - lists (add, delete, rename)
 * - filter state (all / active / completed)
 * - theme (light / dark) with localStorage persistence
 *
 * Renders:
 * - Header (with theme toggle)
 * - Main task panel (inputs, filters, lists)
 * - Footer
 */
function App() {
  // Tasks are stored and loaded via custom hook with localStorage
  // Shape: { id, text, completed, createdAt, listId }
  const [tasks, setTasks] = useTaskStorage();

  // Current filter: "all" | "active" | "completed"
  const [filter, setFilter] = useState("all");

  // Lists (columns) are also stored with localStorage
  const [lists, setLists] = useListStorage();

  // Controlled input state for creating a new list
  const [newListName, setNewListName] = useState("");

  // Theme state: "light" or "dark"
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("assignment5-theme");
    return stored === "dark" ? "dark" : "light";
  });

  // Apply theme on initial load and whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("assignment5-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  /**
   * Add a new task to a specific list.
   * If no listId is provided, use the default "General" list.
   */
  function handleAddTask(text, listId) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      listId: listId || DEFAULT_LIST_ID,
    };

    // Add newest tasks to the top
    setTasks((prev) => [newTask, ...prev]);
  }

  /**
   * Toggle a task's completed state.
   */
  function handleToggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  /**
   * Delete a task by id.
   */
  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  /**
   * Add a new list/column by name.
   */
  function handleAddList(name) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newList = {
      id: Date.now().toString(),
      name: trimmed,
    };

    setLists((prev) => [...prev, newList]);
  }

  /**
   * Delete a list and all tasks that belong to it.
   * The default list (General) cannot be deleted.
   */
  function handleDeleteList(listId) {
    if (listId === DEFAULT_LIST_ID) {
      console.warn("Cannot delete the default General list.");
      return;
    }

    setLists((prev) => prev.filter((list) => list.id !== listId));
    setTasks((prev) => prev.filter((task) => task.listId !== listId));
  }

  /**
   * Rename a list by id.
   */
  function handleRenameList(listId, newName) {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, name: trimmed } : list
      )
    );
  }

  /**
   * Reorder tasks based on drag-and-drop.
   * Only reorders within the same list; we don't move tasks across lists.
   */
  function handleReorderTask(draggedId, targetId) {
    if (draggedId === targetId) return;

    setTasks((prev) => {
      const items = [...prev];
      const fromIndex = items.findIndex((task) => task.id === draggedId);
      const toIndex = items.findIndex((task) => task.id === targetId);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);

      return items;
    });
  }

  // Filter tasks based on the selected filter mode
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  // Counts are based on the currently filtered set
  const activeCount = filteredTasks.filter((task) => !task.completed).length;
  const completedCount = filteredTasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={handleToggleTheme} />

      <main className="app-main">
        <section className="task-panel">
          {/* Add new task to the selected list (defaults to General) */}
          <TaskInput onAddTask={handleAddTask} />

          {/* Filter controls (All / Active / Completed) */}
          <FilterButtons
            currentFilter={filter}
            onChangeFilter={setFilter}
          />

          {/* Summary of task counts for the current filter */}
          <TaskCount
            filter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
          />

          {/* Add new list/column */}
          <ListInput
            newListName={newListName}
            setNewListName={setNewListName}
            onAddList={handleAddList}
          />

          {/* All lists (columns) and their tasks */}
          <ListContainer
            lists={lists}
            filteredTasks={filteredTasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onDeleteList={handleDeleteList}
            onRenameList={handleRenameList}
            onReorderTask={handleReorderTask}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
