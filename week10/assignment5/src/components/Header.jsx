// src/components/Header.jsx

/**
 * Header Component
 *
 * Displays the app title and the light/dark mode toggle button.
 *
 * Props:
 * - theme (string): current theme ("light" or "dark")
 * - onToggleTheme (function): toggles between light and dark themes
 */
function Header({ theme, onToggleTheme }) {
  // Determine whether the current theme is dark mode
  const isDark = theme === "dark";

  return (
    <header className="app-header">
      <div className="app-header-inner">
        {/* App Title + Subtitle */}
        <div>
          <h1>Task Manager</h1>
          <p>Track your tasks, stay organized.</p>
        </div>

        {/* Light / Dark mode toggle */}
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
