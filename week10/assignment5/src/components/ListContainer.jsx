// src/components/ListContainer.jsx

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { DEFAULT_LIST_ID } from "../hooks/useListStorage";

/**
 * ListContainer Component
 *
 * Renders all task lists (columns). Each column contains:
 * - a list title (rename on double-click)
 * - a delete button (except for the default list)
 * - an input field to add tasks to that list
 * - a TaskList containing the tasks for that list
 *
 * Props:
 * - lists: array of all list objects
 * - filteredTasks: tasks after applying the current filter (all/active/completed)
 * - onAddTask:    adds a new task to a specific list
 * - onToggleTask: toggles a task as completed/uncompleted
 * - onDeleteTask: deletes a task
 * - onDeleteList: deletes an entire list (except "General")
 * - onRenameList: renames a list title
 * - onReorderTask: reorders tasks within a list (drag-and-drop)
 */
function ListContainer({
  lists,
  filteredTasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteList,
  onRenameList,
  onReorderTask,
}) {

  // Users can rename each list
  function handleRenameClick(list) {
    if (!onRenameList) return;

    const newName = window.prompt("Rename list", list.name);
    if (!newName) return;

    const trimmed = newName.trim();
    if (!trimmed) return;

    onRenameList(list.id, trimmed);
  }

  return (
    <div className="task-lists-container">
      {lists.map((list) => {
        // Filter tasks belonging to this list
        const tasksForList = filteredTasks.filter(
          (task) => (task.listId || DEFAULT_LIST_ID) === list.id
        );

        return (
          <div key={list.id} className="task-list-column">
            {/* Header row: list title + delete button */}
            <div className="task-list-header-row">
              <h2
                className="task-list-title"
                title="Double-click to rename"
                onDoubleClick={() => handleRenameClick(list)}
              >
                {list.name}
              </h2>

              {/* Prevent deleting the default list */}
              {list.id === DEFAULT_LIST_ID ? (
                <button
                  type="button"
                  className="delete-list-button delete-list-button--disabled"
                  disabled
                  title="This is the default list"
                >
                  ✕
                </button>
              ) : (
                <button
                  type="button"
                  className="delete-list-button"
                  onClick={() => onDeleteList(list.id)}
                  title="Delete this list"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Add task input for this list */}
            <TaskInput onAddTask={(text) => onAddTask(text, list.id)} />

            {/* Task list (with drag-to-reorder) */}
            <TaskList
              tasks={tasksForList}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onReorderTask={onReorderTask}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListContainer;
