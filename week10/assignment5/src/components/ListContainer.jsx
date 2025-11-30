// src/components/ListContainer.jsx
import { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { DEFAULT_LIST_ID } from "../hooks/useListStorage";

function ListContainer({
  lists,
  tasks,
  filteredTasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteList,
  onRenameList,
  onMoveTask,
}) {
  const [draggedTask, setDraggedTask] = useState(null); // { id, listId }
  const [dragOverTask, setDragOverTask] = useState(null); // { id, listId }

  function startEditing(list) {
    // handled in App via onRenameList; editing UI is in this component,
    // but you already wired that part earlier
  }

  function handleDragStart(taskId, listId) {
    setDraggedTask({ id: taskId, listId });
  }

  function handleDragOverItem(taskId, listId) {
    setDragOverTask({ id: taskId, listId });
  }

  function handleDropOnItem(taskId, listId) {
    if (!draggedTask) return;
    onMoveTask(draggedTask.id, taskId, listId);
    setDraggedTask(null);
    setDragOverTask(null);
  }

  function handleDropOnList(listId) {
    if (!draggedTask) return;
    // Drop into empty space in this list → end of that list
    onMoveTask(draggedTask.id, null, listId);
    setDraggedTask(null);
    setDragOverTask(null);
  }

  function handleDragEnd() {
    setDraggedTask(null);
    setDragOverTask(null);
  }

  return (
    <div className="task-lists-container">
      {lists.map((list) => {
        const tasksForList = filteredTasks.filter(
          (task) => (task.listId || DEFAULT_LIST_ID) === list.id
        );

        return (
          <div
            key={list.id}
            className="task-list-column"
            onDragOver={(e) => {
              e.preventDefault();
              // If the list is empty, allow dropping on the column itself
              if (tasksForList.length === 0) {
                setDragOverTask(null);
              }
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (tasksForList.length === 0) {
                handleDropOnList(list.id);
              }
            }}
          >
            <div className="task-list-header-row">
              {/* editing UI you already wired lives here */}
              {/* simplified title+delete version shown for context */}
              <h2
                className="task-list-title"
                title="Double-click to rename"
                onDoubleClick={() =>
                  onRenameList && onRenameList(list.id, list.name)
                }
              >
                {list.name}
              </h2>

              {/* Protect General (DEFAULT_LIST_ID) from deletion */}
              {list.id === DEFAULT_LIST_ID ? (
                <button
                  type="button"
                  className="delete-list-button delete-list-button--disabled"
                  disabled
                  title="Cannot delete the default list"
                >
                  ✕
                </button>
              ) : (
                <button
                  type="button"
                  className="delete-list-button"
                  onClick={() => onDeleteList(list.id)}
                  title="Delete list"
                >
                  ✕
                </button>
              )}
            </div>

            <TaskInput onAddTask={(text) => onAddTask(text, list.id)} />

            <TaskList
              listId={list.id}
              tasks={tasksForList}
              draggedTask={draggedTask}
              dragOverTask={dragOverTask}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onDragStart={handleDragStart}
              onDragOverItem={handleDragOverItem}
              onDropOnItem={handleDropOnItem}
              onDropOnList={handleDropOnList}
              onDragEnd={handleDragEnd}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListContainer;
