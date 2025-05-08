import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoon, faSun, faSearch } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ theme, toggleTheme, onAddMember }) {
  return (
    <nav className={`navbar-container ${theme}`}>
      <div className="navbar-title">
        <h2></h2>
      </div>

      <div className="navbar-right">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <button className="search-btn" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
        </button>

        <button
          className="add-member-btn"
          onClick={onAddMember}
          title="Add a new member"
        >
          <FontAwesomeIcon icon={faPlus} /> Employee Table
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
