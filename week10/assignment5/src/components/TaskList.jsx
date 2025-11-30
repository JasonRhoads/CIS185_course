// src/components/TaskList.jsx
import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggleTask, onDeleteTask, onReorderTask }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  if (tasks.length === 0) {
    return <p className="empty-list">No tasks yet.</p>;
  }

  function handleDragStart(id) {
    setDraggedId(id);
  }

  function handleDragOver(id) {
    if (id !== dragOverId) {
      setDragOverId(id);
    }
  }

  function handleDrop(targetId) {
    if (!draggedId) return;
    onReorderTask(draggedId, targetId);
    setDraggedId(null);
    setDragOverId(null);
  }

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
          onDragStart={handleDragStart}
          onDragOverItem={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          isDragging={draggedId === task.id}
          isDragOver={dragOverId === task.id}
        />
      ))}
    </ul>
  );
}

export default TaskList;
