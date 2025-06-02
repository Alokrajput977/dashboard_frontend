import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes, faCheckSquare, faClipboardList, faBell, faCog, faQuestionCircle,
  faSignOutAlt, faUserPlus, faUsers, faCalendarCheck, faMoneyCheckAlt, faChartBar,
  faUserTie, faBullhorn, faChartLine, faUserShield, faCalendarAlt, faTasks,
  faMapMarkerAlt, faExclamationTriangle, faProjectDiagram,faAddressCard,
} from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

function Sidebar({ logout, onSelect }) {
  const [hrOpen, setHrOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const toggleHR = () => setHrOpen(prev => !prev);
  const toggleManagement = () => setManagementOpen(prev => !prev);
  const toggleProject = () => setProjectOpen(prev => !prev);

  return (
    <div className={`sidebar-container${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo" onClick={toggleCollapse}>
            <span>Dashboard</span>
          </div>
        )}
        <div className="toggle-btnn" onClick={toggleCollapse}>
          <FontAwesomeIcon icon={collapsed ? faBars : faTimes} />
        </div>
      </div>

      <div className="sidebar-sections">
        {/* GENERAL */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">GENERAL</h3>
           <div className="sidebar-item" onClick={() => onSelect('boards')}>
            <FontAwesomeIcon icon={faClipboardList} /><span>Tasks</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('work')}>
            <FontAwesomeIcon icon={faCheckSquare} /><span>My Work</span>
          </div>
        </div>

        {/* ERP */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">ERP</h3>

          {/* HR Dropdown */}
          <div className="sidebar-item sidebar-itemm" onClick={toggleHR}>
            <FontAwesomeIcon icon={faAddressCard} />
             <span className="dropdown-label">Human Resource</span>
            <span className={`arrow ${hrOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${hrOpen ? 'open' : ''}`}>
            <div className="sidebar-item gap-item" onClick={() => onSelect('addEmployee')}>
              <FontAwesomeIcon icon={faUserPlus} /><span>Add Employee</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('manageTeam')}>
              <FontAwesomeIcon icon={faUsers} /><span>Manage Team</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('attendance')}>
              <FontAwesomeIcon icon={faCalendarCheck} /><span>Attendance</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('payroll')}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} /><span>Payroll</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('performance')}>
              <FontAwesomeIcon icon={faChartBar} /><span>Performance</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('AdminControls')}>
              <FontAwesomeIcon icon={faUserShield} /><span>Admin Controls</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('ShiftScheduling')}>
              <FontAwesomeIcon icon={faCalendarAlt} /><span>Shift Scheduling</span>
            </div>
          </div>

          {/* Management Dropdown */}
          <div className="sidebar-item" onClick={toggleManagement}>
            <FontAwesomeIcon icon={faUserTie} />
            <span className="dropdown-label">Management</span>
            <span className={`arrow ${managementOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${managementOpen ? 'open' : ''}`}>
            <div className="sidebar-item gap-item" onClick={() => onSelect('TaskManager')}>
              <FontAwesomeIcon icon={faTasks} /><span>Task Manager</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Assignment')}>
              <FontAwesomeIcon icon={faUserShield} /><span>Assignment</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Tracking')}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /><span>Tracking</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Notifications')}>
              <FontAwesomeIcon icon={faBell} /><span>Notifications</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('NotificationsEscalation')}>
              <FontAwesomeIcon icon={faExclamationTriangle} /><span>Escalations</span>
            </div>
          </div>

          {/* Project Management Dropdown */}
          <div className="sidebar-item" onClick={toggleProject}>
            <FontAwesomeIcon icon={faProjectDiagram} />
            <span className="dropdown-label">Project Management</span>
            <span className={`arrow ${projectOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${projectOpen ? 'open' : ''}`}>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Lifecycle')}>
              <FontAwesomeIcon icon={faChartLine} /><span>Project Lifecycle </span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Financial')}>
              <FontAwesomeIcon icon={faBullhorn} /><span>Financial Tracking</span>
            </div>
            <div className="sidebar-item gap-item" onClick={() => onSelect('Resource')}>
              <FontAwesomeIcon icon={faTasks} /><span>Resource </span>
            </div>
          </div>
        </div>

        {/* OTHER */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">OTHER</h3>
          <div className="sidebar-item" onClick={() => onSelect('settings')}>
            <FontAwesomeIcon icon={faCog} /><span>Settings</span>
          </div>
          <div className="sidebar-item" onClick={() => onSelect('help')}>
            <FontAwesomeIcon icon={faQuestionCircle} /><span>Help</span>
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
