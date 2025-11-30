// src/components/TaskItem.jsx

/**
 * TaskItem Component
 *
 * Represents a single task row inside a TaskList.
 * Supports:
 * - toggling completion
 * - deleting the task
 * - drag-and-drop for reordering within the same list
 *
 * Props:
 * - task (object): the task data { id, text, completed, listId }
 * - onToggle (function): marks the task as completed/uncompleted
 * - onDelete (function): deletes this task
 * - onDragStart (function): fired when drag begins
 * - onDragOverItem (function): fired when dragged over another item
 * - onDrop (function): triggered when dropped on this item
 * - onDragEnd (function): fired when dragging stops
 * - isDragging (boolean): true if this task is currently being dragged
 * - isDragOver (boolean): true if another task is hovering over this one
 */
function TaskItem({
  task,
  onToggle,
  onDelete,
  onDragStart,
  onDragOverItem,
  onDrop,
  onDragEnd,
  isDragging,
  isDragOver,
}) {
  // Compute CSS class list for drag states
  const liClassNames = [
    "task-item",
    isDragging ? "task-item--dragging" : "",
    isDragOver ? "task-item--drag-over" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      className={liClassNames}
      onDragOver={(e) => {
        e.preventDefault(); // Allow dropping
        onDragOverItem();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      {/* Drag handle used to reorder tasks */}
      <span
        className="drag-handle"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Drag to reorder"
      >
        ⋮⋮
      </span>

      {/* Checkbox + task text */}
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span className={task.completed ? "task-text completed" : "task-text"}>
          {task.text}
        </span>
      </label>

      {/* Delete task button */}
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
      >
        ✕
      </button>
    </li>
  );
}

export default TaskItem;
