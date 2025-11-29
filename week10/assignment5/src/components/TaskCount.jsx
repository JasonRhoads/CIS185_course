function TaskCount({ filter, activeCount, completedCount }) {
  return (
    <p className="task-count">
      {filter === "all" && (
        <>Active: {activeCount} — Completed: {completedCount}</>
      )}

      {filter === "active" && `Active: ${activeCount}`}
      {filter === "completed" && `Completed: ${completedCount}`}
    </p>
  );
}

export default TaskCount;
