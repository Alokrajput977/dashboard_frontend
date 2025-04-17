// frontend/src/components/Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        {/* You can add your logo or brand name here */}
        <h2>My Project</h2>
      </div>
      <ul className="navbar-links">
        <li>Overview</li>
        <li>Tasks</li>
        <li>Timeline</li>
        <li>Notes</li>
        <li>Files</li>
        <li>Members</li>
      </ul>
      <div className="navbar-right">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
        </button>
        <button className="add-member-btn" onClick={() => ("add-member")}>
          <FontAwesomeIcon icon={faPlus} /> Add Member
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
