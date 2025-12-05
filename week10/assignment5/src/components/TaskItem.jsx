// src/components/TaskItem.jsx

/**
 * TaskItem Component
 *
 * Represents a single task row inside a TaskList.
 * Supports:
 * - toggling completion
 * - deleting the task
 * - drag-and-drop for reordering
 *
 * Props:
 * - task (object): { id, text, completed, createdAt, listId }
 * - onToggle (function): marks the task as completed/uncompleted
 * - onDelete (function): deletes this task
 * - onDragStart (function): fired when drag begins
 * - onDragOverItem (function): fired when dragged over another item
 * - onDrop (function): triggered when dropped on this item
 * - onDragEnd (function): fired when dragging stops
 * - isDragging (boolean): indicates if the item is currently dragged
 * - isDragOver (boolean): indicates if another item is dragged over this item
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
  // Convert createdAt safely into a Date object
  const createdAtDate =
    task.createdAt instanceof Date
      ? task.createdAt
      : task.createdAt
      ? new Date(task.createdAt)
      : null;

  // Build class names based on drag state
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
        e.preventDefault();
        onDragOverItem();
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
    >
      {/* Drag handle */}
      <span
        className="drag-handle"
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        title="Drag to reorder"
      >
        ⋮⋮
      </span>

      {/* Checkbox + task text + timestamp */}
      <label className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span className={task.completed ? "task-text completed" : "task-text"}>
          {task.text}

          {createdAtDate && (
            <small className="task-date">
              {createdAtDate.toLocaleDateString()}{" "}
              {createdAtDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          )}
        </span>
      </label>

      {/* Delete button */}
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
