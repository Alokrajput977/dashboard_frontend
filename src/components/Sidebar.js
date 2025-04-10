// src/components/Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCheckSquare,
  faClipboardList,
  faBell,
  faProjectDiagram,
  faPaintBrush,
  faStar,
  faCog,
  faQuestionCircle,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ logout, theme }) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <span>Dashboard</span>
      </div>
      <div className="sidebar-sections">
        <div className="sidebar-section">
          <h3 className="sidebar-heading">GENERAL</h3>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faCalendar} /><span>My Time</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faCheckSquare} /><span>My Work</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faClipboardList} /><span>Boards</span>
          </div>
          <div className="sidebar-item notification-item">
            <FontAwesomeIcon icon={faBell} /><span>Notification</span>
            <span className="notification-badge">4</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-heading">PROJECTS</h3>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faProjectDiagram} /><span>Hologram</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faPaintBrush} /><span>DailyArt App</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faStar} /><span>Weszio.com</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faStar} /><span>Starlight Team</span>
          </div>
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-heading">OTHER</h3>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faCog} /><span>Settings</span>
          </div>
          <div className="sidebar-item">
            <FontAwesomeIcon icon={faQuestionCircle} /><span>Help Center</span>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item" onClick={logout} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
