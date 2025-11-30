// src/components/TaskItem.jsx

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
        onDragOverItem(task.id);
      }}
      onDrop={() => onDrop(task.id)}
    >
      {/* Drag handle only */}
      <span
        className="drag-handle"
        draggable
        onDragStart={() => onDragStart(task.id)}
        onDragEnd={onDragEnd}
        title="Drag to reorder"
      >
        ⋮⋮
      </span>

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
