// src/components/ListContainer.jsx

import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { useState } from "react";
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

  // Track which list is currently being renamed
  const [editingListId, setEditingListId] = useState(null);
  const [editingName, setEditingName] = useState("");

  function beginRename(list) {
    setEditingListId(list.id);
    setEditingName(list.name);
  }

  function commitRename(listId) {
    const trimmed = editingName.trim();
    if (trimmed) onRenameList(listId, trimmed);
    setEditingListId(null);
  }

return (
    <div className="task-lists-container">
      {lists.map((list) => {
        const tasksForList = filteredTasks.filter(
          (task) => (task.listId || DEFAULT_LIST_ID) === list.id
        );

        const isEditing = editingListId === list.id;

        return (
          <div key={list.id} className="task-list-column">
            <div className="task-list-header-row">

              {/* ⭐ If editing, show input field */}
              {isEditing ? (
                <input
                  className="list-name-input"
                  value={editingName}
                  autoFocus
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => commitRename(list.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename(list.id);
                    if (e.key === "Escape") setEditingListId(null);
                  }}
                />
              ) : (
                <h2
                  className="task-list-title"
                  title="Double-click to rename"
                  onDoubleClick={() => beginRename(list)}
                >
                  {list.name}
                </h2>
              )}

              {/* Delete button (General disabled) */}
              {list.id === DEFAULT_LIST_ID ? (
                <button
                  type="button"
                  className="delete-list-button delete-list-button--disabled"
                  disabled
                  title="Cannot delete default list"
                >
                  ✕
                </button>
              ) : (
                <button
                  type="button"
                  className="delete-list-button"
                  onClick={() => onDeleteList(list.id)}
                >
                  ✕
                </button>
              )}
            </div>

            <TaskInput onAddTask={(text) => onAddTask(text, list.id)} />

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