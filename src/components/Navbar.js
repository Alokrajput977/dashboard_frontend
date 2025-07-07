import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faVideo,
  faEye,
  faCommentDots,
  faPencilRuler
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar({
  theme,
  toggleTheme,
  onAddMember,
  onViewCameraFeed,
  onMessagesClick,
  onDrawClick,
  onLogout
}) {
  const storedUser = localStorage.getItem('user');
  const role = storedUser
    ? JSON.parse(storedUser).role?.toString().trim().toLowerCase()
    : null;

  return (
    <nav className="navbar-container">
      <div className="navbar-title">
        {/* You can add a title or logo here */}
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

        {/* Drawing / Excalidraw */}
        <button
          className="draw-btn"
          onClick={onDrawClick}
          title="Open Drawing Canvas"
        >
          <FontAwesomeIcon icon={faPencilRuler} />
        </button>

        {/* Camera Feed (managers only) */}
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

        {/* Messages */}
        <div
          className="message-system"
          onClick={onMessagesClick}
          title="View Messages"
        >
          <FontAwesomeIcon icon={faCommentDots} className="message-icon" />
        </div>

        {/* Add Member */}
        <button
          className="add-member-btn"
          onClick={onAddMember}
          title="Employee Table"
        >
          <FontAwesomeIcon icon={faPlus} /> Employee Table
        </button>

        
      </div>
    </nav>
  );
}

export default Navbar;
