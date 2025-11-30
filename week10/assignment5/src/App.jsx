// src/App.jsx
import { useState } from "react";
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

  function handleReorderTask(draggedId, targetId) {
    if (draggedId === targetId) return;

    setTasks((prev) => {
      const items = [...prev];
      const fromIndex = items.findIndex((task) => task.id === draggedId);
      const toIndex = items.findIndex((task) => task.id === targetId);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);

      return items;
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
      <Header />

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
            onReorderTask={handleReorderTask}
          />

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
