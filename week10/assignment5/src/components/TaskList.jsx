// src/components/TaskList.jsx
import TaskItem from "./TaskItem";

function TaskList({
  listId,
  tasks,
  draggedTask,
  dragOverTask,
  onToggleTask,
  onDeleteTask,
  onDragStart,
  onDragOverItem,
  onDropOnItem,
  onDropOnList,
  onDragEnd,
}) {
  if (tasks.length === 0) {
    return (
      <ul
        className="task-list"
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Empty list: only show a drop zone */}
        <li
          className="task-drop-zone"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDropOnList(listId); // -> handleMoveTask(draggedId, null, listId)
          }}
        >
          <span className="task-drop-zone-label">Drop here to add to this list</span>
        </li>
      </ul>
    );
  }

  return (
    <ul
      className="task-list"
      onDragOver={(e) => e.preventDefault()}
    >
      {tasks.map((task) => {
        const isDragging =
          draggedTask && draggedTask.id === task.id && draggedTask.listId === listId;
        const isDragOver =
          dragOverTask && dragOverTask.id === task.id && dragOverTask.listId === listId;

        return (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onDragStart={() => onDragStart(task.id, listId)}
            onDragOverItem={() => onDragOverItem(task.id, listId)}
            onDrop={() => onDropOnItem(task.id, listId)}
            onDragEnd={onDragEnd}
            isDragging={isDragging}
            isDragOver={isDragOver}
          />
        );
      })}

      {/* ✅ Bottom drop zone: "send to end of this list" */}
      <li
        className="task-drop-zone"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDropOnList(listId); // -> handleMoveTask(draggedId, null, listId)
        }}
      >
        {/* This can be invisible or subtle; label is optional */}
        <span className="task-drop-zone-label" />
      </li>
    </ul>
  );
}

export default TaskList;
