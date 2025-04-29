// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faCalendar,
  faCheckSquare,
  faClipboardList,
  faBell,
  faProjectDiagram,
  faPaintBrush,
  faStar,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ logout, onSelect }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <div className={`sidebar-container${collapsed ? ' collapsed' : ''}`}>      
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo" onClick={toggleCollapse}>
            <span>Dashboard</span>
          </div>
        )}
        <div className="toggle-btn" onClick={toggleCollapse}>
          <FontAwesomeIcon icon={collapsed ? faBars : faTimes} />
        </div>
      </div>

      <div className="sidebar-sections">
        <div className="sidebar-section">
          <h3 className="sidebar-heading">GENERAL</h3>
          <div className="sidebar-item" onClick={() => onSelect('time')}>
            <FontAwesomeIcon icon={faCalendar} /><span>My Time</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('work')}>
            <FontAwesomeIcon icon={faCheckSquare} /><span>My Work</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('boards')}>
            <FontAwesomeIcon icon={faClipboardList} /><span>Boards</span>
          </div>
          <div className="sidebar-item notification-item" onClick={() => onSelect('notifications')}>
            <FontAwesomeIcon icon={faBell} /><span>Notifications</span>
            <span className="notification-badge">4</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-heading">PROJECTS</h3>
          <div className="sidebar-item" onClick={() => onSelect('hologram')}>
            <FontAwesomeIcon icon={faProjectDiagram} /><span>Hologram</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('dailyart')}>
            <FontAwesomeIcon icon={faPaintBrush} /><span>DailyArt App</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('weszio')}>
            <FontAwesomeIcon icon={faStar} /><span>Weszio.com</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('starlight')}>
            <FontAwesomeIcon icon={faStar} /><span>Starlight Team</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-heading">OTHER</h3>
          <div className="sidebar-item" onClick={() => onSelect('settings')}>
            <FontAwesomeIcon icon={faCog} /><span>Settings</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('help')}>
            <FontAwesomeIcon icon={faQuestionCircle} /><span>Help Center</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-item logout" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

