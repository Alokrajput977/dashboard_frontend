import React from 'react';
// Import the FontAwesome icon(s) you need
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar-container">
      {/* Left Section: Title/Logo */}
      <div className="navbar-brand">
       
      </div>

      {/* Center Section: Links */}
      <ul className="navbar-links">
        <li>Overview</li>
        <li>Tasks</li>
        <li>Timeline</li>
        <li>Notes</li>
        <li>Files</li>
        <li>Members</li>
      </ul>

      {/* Right Section: Button */}
      <div className="navbar-right">
        <button className="add-member-btn">
          <FontAwesomeIcon icon={faPlus} /> Add Member
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
