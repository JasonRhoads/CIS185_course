// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import TaskCount from "./components/TaskCount";
import ListInput from "./components/ListInput";
import ListContainer from "./components/ListContainer";

import { useTaskStorage } from "./hooks/useTaskStorage";
import { useListStorage, DEFAULT_LIST_ID } from "./hooks/useListStorage";
import "./App.css";


function App() {
  // tasks will be an array of { id, text, completed, createdAt }
  const [tasks, setTasks] = useTaskStorage();
  const [filter, setFilter] = useState("all");
  const [lists, setLists] = useListStorage();
  const [newListName, setNewListName] = useState("");

    // NEW: theme state
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("assignment5-theme");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("assignment5-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }


  function handleAddTask(text, listId) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      listId: listId || DEFAULT_LIST_ID,
    };

    setTasks((prev) => [newTask, ...prev]);
  }



  function handleToggleTask(id) {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }


  function handleDeleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  function handleAddList(name) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newList = {
      id: Date.now().toString(),
      name: trimmed,
    };

    setLists((prev) => [...prev, newList]);
  }

  function handleAddListSubmit(e) {
    e.preventDefault();
    handleAddList(newListName);
    setNewListName("");
  }

  function handleDeleteList(listId) {
    // Don't allow deleting the default "General" list
    if (listId === DEFAULT_LIST_ID) {
      console.warn("Cannot delete the default General list.");
      return;
    }
    setLists((prev) => prev.filter((list) => list.id !== listId));

    setTasks((prev) => prev.filter((task) => task.listId !== listId));
  }

  function handleRenameList(listId, newName) {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, name: trimmed } : list
      )
    );
  }

  function handleMoveTask(draggedId, targetId, targetListId) {
    setTasks((prev) => {
      const getListId = (t) => t.listId || DEFAULT_LIST_ID;

      const dragged = prev.find((t) => t.id === draggedId);
      if (!dragged) return prev;

      const originalListId = getListId(dragged);
      const newListId = targetListId || originalListId;
      const sameList = originalListId === newListId;

      // ----------------------------------
      // Case 1: Reorder within the same list
      // ----------------------------------
      if (sameList) {
        const listId = originalListId;

        // Tasks in this list, in current order
        const listTasks = prev.filter((t) => getListId(t) === listId);

        // Remove dragged from that sequence
        const withoutDragged = listTasks.filter((t) => t.id !== draggedId);

        let reorderedList;

        if (!targetId) {
          // No specific target → drop at END of this list
          reorderedList = [...withoutDragged, dragged];
        } else {
          const targetIndex = withoutDragged.findIndex((t) => t.id === targetId);
          if (targetIndex === -1) {
            // If target not found, still drop at end
            reorderedList = [...withoutDragged, dragged];
          } else {
            // ✅ Always insert ABOVE the target
            reorderedList = [...withoutDragged];
            reorderedList.splice(targetIndex, 0, dragged);
          }
        }

        // Rebuild global array using the reordered list sequence
        const result = [];
        let listPos = 0;

        for (const t of prev) {
          if (getListId(t) === listId) {
            result.push(reorderedList[listPos++]);
          } else {
            result.push(t);
          }
        }

        return result;
      }

      // ----------------------------------
      // Case 2: Move across lists
      // ----------------------------------
      const origId = originalListId;
      const newId = newListId;

      // Tasks in original list (minus dragged)
      const origTasks = prev.filter(
        (t) => getListId(t) === origId && t.id !== draggedId
      );

      // Tasks already in target list
      const baseNewTasks = prev.filter((t) => getListId(t) === newId);

      const draggedForNewList = { ...dragged, listId: newId };

      let newTasks;
      if (!targetId) {
        // No specific target → go to END of target list
        newTasks = [...baseNewTasks, draggedForNewList];
      } else {
        const targetIndex = baseNewTasks.findIndex((t) => t.id === targetId);
        const insertIndex =
          targetIndex === -1 ? baseNewTasks.length : targetIndex; // ABOVE target
        newTasks = [...baseNewTasks];
        newTasks.splice(insertIndex, 0, draggedForNewList);
      }

      // Rebuild global array with updated orig + new list sequences
      const result = [];
      let origPos = 0;
      let newPos = 0;

      for (const t of prev) {
        const lid = getListId(t);

        if (lid === origId) {
          if (origPos < origTasks.length) {
            result.push(origTasks[origPos++]);
          }
        } else if (lid === newId) {
          if (newPos < newTasks.length) {
            result.push(newTasks[newPos++]);
          }
        } else {
          result.push(t);
        }
      }

      return result;
    });
  }




  // Filtering Logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = filteredTasks.filter((task) => !task.completed).length;
  const completedCount = filteredTasks.filter((task) => task.completed).length;
  const totalCount = filteredTasks.length;



  return (
    <div className="app">
      <Header 
        theme={theme} 
        onToggleTheme={handleToggleTheme} 
      />


      <main className="app-main">
        <section className="task-panel">
          <TaskInput onAddTask={handleAddTask} />

          <FilterButtons
            currentFilter={filter}
            onChangeFilter={setFilter}
          />
          
          <TaskCount
            filter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={totalCount}
          />

          <ListInput
            newListName={newListName}
            setNewListName={setNewListName}
            onAddList={handleAddList}
          />

          <ListContainer
            lists={lists}
            tasks={tasks}
            filteredTasks={filteredTasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onDeleteList={handleDeleteList}
            onRenameList={handleRenameList}
            onMoveTask={handleMoveTask}
          />

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
