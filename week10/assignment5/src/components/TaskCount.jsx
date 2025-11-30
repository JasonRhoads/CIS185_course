// src/components/TaskCount.jsx

/**
 * TaskCount Component
 *
 * Displays a summary of task counts based on the current filter.
 *
 * Props:
 * - filter (string): the active filter ("all", "active", or "completed")
 * - activeCount (number): number of uncompleted tasks
 * - completedCount (number): number of completed tasks
 *
 * Behavior:
 * - "All" filter → shows both active + completed counts
 * - "Active" filter → shows only active count
 * - "Completed" filter → shows only completed count
 */
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
