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
}) {

  const [editingListId, setEditingListId] = useState(null);
  const [editingName, setEditingName] = useState("");

  function startEditing(list) {
    setEditingListId(list.id);
    setEditingName(list.name);
  }

  function cancelEditing() {
    setEditingListId(null);
    setEditingName("");
  }

  function saveEditing(listId) {
    onRenameList(listId, editingName);
    cancelEditing();
  }


  return (
    <div className="task-lists-container">
      {lists.map((list) => {
        const tasksForList = filteredTasks.filter(
          (task) => (task.listId || DEFAULT_LIST_ID) === list.id
        );

        return (
          <div key={list.id} className="task-list-column">
            <div className="task-list-header-row">
              {editingListId === list.id ? (
                <>
                  <input
                    className="list-name-input"
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveEditing(list.id);
                      } else if (e.key === "Escape") {
                        cancelEditing();
                      }
                    }}
                    autoFocus
                  />

                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}  // ⬅️ NEW
                    onClick={() => saveEditing(list.id)}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}  // ⬅️ NEW
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2
                    className="task-list-title"
                    onDoubleClick={() => startEditing(list)}
                    title="Double-click to rename"
                  >
                    {list.name}
                  </h2>

                  {/* Delete button: disabled for General */}
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
                </>
              )}
            </div>

            <TaskInput onAddTask={(text) => onAddTask(text, list.id)} />

            <TaskList
              tasks={tasksForList}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListContainer;
