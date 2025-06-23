// src/components/Navbar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faVideo,
  faEye,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({ onAddMember, onViewCameraFeed, onMessagesClick }) {
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
        {/* Search */}
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

        {/* Camera System - only visible for manager */}
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

        {/* Messages Icon - opens chatbox */}
        <div
          className="message-system"
          onClick={onMessagesClick}
          title="View Messages"
        >
          <FontAwesomeIcon icon={faCommentDots} className="message-icon" />
        </div>

        {/* Employee Table Button */}
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
