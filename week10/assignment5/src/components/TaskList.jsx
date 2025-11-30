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
    return <p className="empty-list">No tasks yet.</p>;
  }

  return (
    <ul
      className="task-list"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        // Dropping into blank area at bottom of non-empty list
        onDropOnList(listId);
      }}
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
    </ul>
  );
}

export default TaskList;
