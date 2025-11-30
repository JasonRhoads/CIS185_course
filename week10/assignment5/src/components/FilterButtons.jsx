// src/components/FilterButtons.jsx

// Available filter modes for the task list.
// These match the three display options in the assignment specs.
const FILTER_OPTIONS = ["all", "active", "completed"];

/**
 * FilterButtons Component
 *
 * Renders a row of filter buttons (All, Active, Completed).
 * The "active" button receives a special CSS class for styling.
 *
 * Props:
 * - currentFilter (string): the currently selected filter
 * - onChangeFilter (function): callback to update the selected filter
 */
function FilterButtons({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-buttons">
      {FILTER_OPTIONS.map((filter) => {
        const isActive = filter === currentFilter;

        return (
          <button
            key={filter}
            type="button"
            className={isActive ? "active" : ""}
            onClick={() => onChangeFilter(filter)}
          >
            {/* Capitalize first letter for display */}
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;
