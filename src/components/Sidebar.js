// Sidebar.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes, faCheckSquare, faClipboardList, faBell, faCog, faQuestionCircle,
  faSignOutAlt, faUserPlus, faUsers, faCalendarCheck, faMoneyCheckAlt, faChartBar,
  faUserTie, faBullhorn, faChartLine, faUserShield, faCalendarAlt, faTasks,faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { FaUsersCog } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ logout, onSelect }) {
  const [hrOpen, setHrOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const toggleHR = () => setHrOpen(prev => !prev);
  const toggleManagement = () => setManagementOpen(prev => !prev);

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
          <div className="sidebar-item" onClick={() => onSelect('work')}>
            <FontAwesomeIcon icon={faCheckSquare} /><span>My Work</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('boards')}>
            <FontAwesomeIcon icon={faClipboardList} /><span>Tasks</span>
          </div>
          <div className="sidebar-item notification-item" onClick={() => onSelect('notifications')}>
            <FontAwesomeIcon icon={faBell} /><span>Notifications</span>
          </div>
        </div>

        {/* ERP */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">ERP</h3>
          <div className="sidebar-item" onClick={toggleHR}>
            <FaUsersCog />
            <span style={{ marginLeft: '8px', fontSize: "14px" }}>HR</span>
            <span className={`arrow ${hrOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${hrOpen ? 'open' : ''}`}>
            <div className="dropdown-item" onClick={() => onSelect('addEmployee')}>
              <FontAwesomeIcon icon={faUserPlus} className="dropdown-icon" /><span>Add Employee</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('manageTeam')}>
              <FontAwesomeIcon icon={faUsers} className="dropdown-icon" /><span>Manage Team</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('attendance')}>
              <FontAwesomeIcon icon={faCalendarCheck} className="dropdown-icon" /><span>Attendance</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('payroll')}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} className="dropdown-icon" /><span>Payroll</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('performance')}>
              <FontAwesomeIcon icon={faChartBar} className="dropdown-icon" /><span>Performance Management</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('AdminControls')}>
              <FontAwesomeIcon icon={faUserShield} className="dropdown-icon" /><span>Admin Controls</span>
            </div>
            <div className="dropdown-item" onClick={() => onSelect('ShiftScheduling')}>
              <FontAwesomeIcon icon={faCalendarAlt} className="dropdown-icon" /><span>Shift Scheduling</span>
            </div>
          </div>

          {/* MANAGEMENT */}
          <div className="sidebar-item" onClick={toggleManagement}>
            <FontAwesomeIcon icon={faUserTie} />
            <span>Management</span>
            <span className={`arrow ${managementOpen ? 'rotate' : ''}`}>▼</span>
          </div>

          {managementOpen && (
            <div className={`sidebar-submenu ${managementOpen ? 'show' : ''}`}>
              <div className="sidebar-item" onClick={() => onSelect('TaskManager')}>
                <FontAwesomeIcon icon={faTasks} />
                <span>Task Manager</span>
              </div>
              <div className="sidebar-item" onClick={() => onSelect('Assignment')}>
                <FontAwesomeIcon icon={faUserShield} />
                <span>Assignment & Ownership</span>
              </div>
              <div className="sidebar-item" onClick={() => onSelect('Tracking')}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Tracking & Reporting</span>
              </div>

            </div>
          )}

          <div className="sidebar-item" onClick={() => onSelect('marketing')}>
            <FontAwesomeIcon icon={faBullhorn} /><span>Marketing</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('sales')}>
            <FontAwesomeIcon icon={faChartLine} /><span>Sales</span>
          </div>
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
