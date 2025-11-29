// src/components/TaskInput.jsx
import { useState } from "react";

function TaskInput({ onAddTask }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    // We'll wire this up in the next step
    onAddTask(trimmed);
    setText("");
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
