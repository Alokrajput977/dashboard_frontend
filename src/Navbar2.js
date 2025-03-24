import React from 'react';
// Import the FontAwesome icon(s) you need
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './Navbar2.css';

function Navbar2() {
  return (
    <nav className="navbar2-container">
      <div className="navbar2-brand">
        <h1>Dashboard Board 2</h1>
      </div>

      <ul className="navbar2-links">
        <li>Overview</li>
        <li>Tasks</li>
        <li>Timeline</li>
        <li>Notes</li>
        <li>Files</li>
        <li>Members</li>
      </ul>

      <div className="navbar2-right">
        <button className="navbar2-add-btn">
          <FontAwesomeIcon icon={faPlus} /> Add Member
        </button>
      </div>
    </nav>
  );
}

export default Navbar2;
