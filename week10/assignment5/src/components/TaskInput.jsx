// src/components/TaskInput.jsx

import { useState } from "react";

/**
 * TaskInput Component
 *
 * Renders the input field and button used to add a new task.
 *
 * Props:
 * - onAddTask (function): called when a valid task text is submitted
 */
function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");

  /**
   * Handles form submission for creating a new task.
   * Empty or whitespace-only entries are ignored.
   */
  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setText(""); // clear input field after successful add
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskInput;
