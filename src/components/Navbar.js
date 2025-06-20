import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faVideo, faEye } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ onAddMember, onViewCameraFeed }) {
  // Grab the saved user (set by Login) from localStorage:
  const storedUser = localStorage.getItem('user');
  const role = storedUser
    ? JSON.parse(storedUser).role?.toString().trim().toLowerCase()
    : null;

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

        {/* Camera Monitor System — only if role === "manager" */}
        {role === 'manager' && (
          <div
            className="camera-system"
            onClick={onViewCameraFeed}
            title="View Camera Feed"
          >
            <FontAwesomeIcon icon={faVideo} className="camera-icon" />
            <button className="view-btn">
              <FontAwesomeIcon icon={faEye} /> View
            </button>
          </div>
        )}
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
