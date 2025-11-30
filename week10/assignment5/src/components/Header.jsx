// src/components/Header.jsx

function Header({ theme, onToggleTheme }) {
  const isDark = theme === "dark";

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div>
          <h1>Task Manager</h1>
          <p>Track your tasks, stay organized.</p>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </header>
  );
}

export default Header;
