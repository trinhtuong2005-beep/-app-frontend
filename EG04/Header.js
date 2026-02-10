import React from "react";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header" data-testid="app-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🎬</span>
          <h1 data-testid="app-title">Movie Discovery</h1>
        </div>
        
        <div className="theme-toggle" data-testid="theme-toggle">
          <span className="theme-label">{theme === "light" ? "☀️" : "🌙"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              data-testid="theme-toggle-input"
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Header;
