// src/App.jsx
import { useState } from "react";
import { useTaskStorage } from "./hooks/useTaskStorage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskCount from "./components/TaskCount";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import "./App.css";

function App() {
  // tasks will be an array of { id, text, completed, createdAt }
  const [tasks, setTasks] = useTaskStorage();
  const [filter, setFilter] = useState("all");

  function handleAddTask(text) {
    const newTask = {
      id: Date.now(),        // simple unique-ish id
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    // add the new task to the beginning of the list
    setTasks((prevTasks) => [newTask, ...prevTasks]);
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


  // Filtering Logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true; // "all"
  });

  // Task Counts
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;


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

          <div className="task-lists-container">
            <TaskList
              tasks={filteredTasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
