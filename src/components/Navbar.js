// src/components/Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faVideo, faEye } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ onAddMember, onViewCameraFeed }) {
  return (
    <nav className="navbar-container">
      <div className="navbar-title">
        <h2>Dashboard</h2>
      </div>

      <div className="navbar-right">
        {/* Search Section */}
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

        {/* Camera Monitor System — CLICKABLE ICON */}
        <div className="camera-system" onClick={onViewCameraFeed} title="Add Camera">
          <FontAwesomeIcon icon={faVideo} className="camera-icon" />
          <button className="view-btn">
            <FontAwesomeIcon icon={faEye} /> View
          </button>
        </div>

        {/* Add Member */}
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
