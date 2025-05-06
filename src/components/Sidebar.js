// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUsersCog, FaCircle, FaUserTie, FaBullhorn, FaChartLine } from 'react-icons/fa';
import {
  faBars,
  faTimes,
  faCalendar,
  faCheckSquare,
  faClipboardList,
  faBell,
  faCog,
  faQuestionCircle,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ logout, onSelect }) {
  const [hrOpen, setHrOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [utilitiesOpen, setUtilitiesOpen] = useState(false);

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
        {/* GENERAL */}
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
           
          </div>
        </div>

        {/* PROJECTS */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">PROJECTS</h3>
          <div className="sidebar-item" onClick={() => setHrOpen(!hrOpen)}>
            <FaUsersCog /><span style={{ marginLeft: '8px' ,fontSize:"14px"}}>HR</span>
          </div>
          {hrOpen && (
            <div className="dropdown-container open">
              <div className="dropdown-item" onClick={() => onSelect('addEmployee')}>
                <FaCircle className="dropdown-icon" /><span>Add Employee</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('manageTeam')}>
                <FaCircle className="dropdown-icon" /><span>Manage Team</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('attendance')}>
                <FaCircle className="dropdown-icon" /><span>Attendance</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('payroll')}>
                <FaCircle className="dropdown-icon" /><span>Payroll</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('performance')}>
                <FaCircle className="dropdown-icon" /><span>Performance Management</span>
              </div>
            </div>
          )}
        </div>

        {/* UTILITIES */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">UTILITIES</h3>
          <div className="sidebar-item" onClick={() => setUtilitiesOpen(!utilitiesOpen)}>
            <FaUserTie /><span style={{ marginLeft: '8px' }}>Utilities</span>
          </div>
          {utilitiesOpen && (
            <div className="dropdown-container open">
              <div className="dropdown-item" onClick={() => onSelect('management')}>
                <FaUserTie className="dropdown-icon" /><span>Management</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('marketing')}>
                <FaBullhorn className="dropdown-icon" /><span>Marketing</span>
              </div>
              <div className="dropdown-item" onClick={() => onSelect('sales')}>
                <FaChartLine className="dropdown-icon" /><span>Sales</span>
              </div>
            </div>
          )}
        </div>

        {/* OTHER */}
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

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="sidebar-item logout" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /><span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
