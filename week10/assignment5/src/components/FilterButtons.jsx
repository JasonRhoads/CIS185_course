// src/components/FilterButtons.jsx

const FILTER_OPTIONS = ["all", "active", "completed"];

function FilterButtons({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-buttons">
      {FILTER_OPTIONS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={filter === currentFilter ? "active" : ""}
          onClick={() => onChangeFilter(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
