// src/components/TaskList.jsx

import { useState } from "react";
import TaskItem from "./TaskItem";

/**
 * TaskList Component
 *
 * Renders a list of TaskItem components for a single list.
 * Also manages local drag-and-drop state for reordering tasks
 * within this list only.
 *
 * Props:
 * - tasks (array): tasks that belong to this list
 * - onToggleTask (function): toggles a task's completed state
 * - onDeleteTask (function): deletes a task
 * - onReorderTask (function): reorders tasks (draggedId, targetId)
 */
function TaskList({ tasks, onToggleTask, onDeleteTask, onReorderTask }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  // Show an empty state if there are no tasks in this list
  if (tasks.length === 0) {
    return <p className="empty-list">No tasks yet.</p>;
  }

  // Called when the user starts dragging a task
  function handleDragStart(id) {
    setDraggedId(id);
  }

  // Track which task the dragged item is currently hovering over
  function handleDragOverItem(id) {
    if (id !== dragOverId) {
      setDragOverId(id);
    }
  }

  // Called when a dragged task is dropped on another task
  function handleDrop(targetId) {
    if (!draggedId) return;

    onReorderTask(draggedId, targetId);
    setDraggedId(null);
    setDragOverId(null);
  }

  // Reset drag state when dragging stops
  function handleDragEnd() {
    setDraggedId(null);
    setDragOverId(null);
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onDragStart={() => handleDragStart(task.id)}
          onDragOverItem={() => handleDragOverItem(task.id)}
          onDrop={() => handleDrop(task.id)}
          onDragEnd={handleDragEnd}
          isDragging={draggedId === task.id}
          isDragOver={dragOverId === task.id}
        />
      ))}
    </ul>
  );
}

export default TaskList;
