import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faTimes, faCheckSquare, faClipboardList, faBell, faCog, faQuestionCircle,
  faSignOutAlt, faUserPlus, faUsers, faCalendarCheck, faMoneyCheckAlt, faChartBar,
  faUserTie, faBullhorn, faChartLine, faUserShield, faCalendarAlt, faTasks,
  faMapMarkerAlt, faExclamationTriangle, faProjectDiagram, faAddressCard, faHandshake,
  faFileInvoiceDollar, faFileSignature
} from '@fortawesome/free-solid-svg-icons';

import './Sidebar.css';

function Sidebar({ logout, onSelect }) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [hrOpen, setHrOpen] = useState(false);
  const [crmOpen, setCrmOpen] = useState(false);
  const [crmOpenn, setCrmOpenn] = useState(false);
  const [managementOpen, setManagementOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);

  // Close all dropdowns when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setHrOpen(false);
      setCrmOpen(false);
      setCrmOpenn(false);
      setManagementOpen(false);
      setProjectOpen(false);
      setClientOpen(false);
    }
  }, [collapsed]);

  const toggleCollapse = () => {
    setCollapsed(prev => !prev);
  };

  const handleSelect = (key) => {
    setActiveItem(key);
    onSelect(key);
  };

  const isActive = (key) => activeItem === key ? 'active' : '';

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
          <div className={`sidebar-item ${isActive('boards')}`} onClick={() => handleSelect('boards')}>
            <FontAwesomeIcon icon={faClipboardList} /><span>Tasks</span>
          </div>
          <div className={`sidebar-item ${isActive('work')}`} onClick={() => handleSelect('work')}>
            <FontAwesomeIcon icon={faCheckSquare} /><span>My Work</span>
          </div>
        </div>

        {/* ERP */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">ERP</h3>

          <div className="sidebar-item" onClick={() => setHrOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faAddressCard} />
            <span className="dropdown-label">Human Resource</span>
            <span className={`arrow ${hrOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${hrOpen ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('addEmployee')}`} onClick={() => handleSelect('addEmployee')}>
              <FontAwesomeIcon icon={faUserPlus} /><span>Add Employee</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('manageTeam')}`} onClick={() => handleSelect('manageTeam')}>
              <FontAwesomeIcon icon={faUsers} /><span>Manage Team</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('attendance')}`} onClick={() => handleSelect('attendance')}>
              <FontAwesomeIcon icon={faCalendarCheck} /><span>Attendance</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('payroll')}`} onClick={() => handleSelect('payroll')}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} /><span>Payroll</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('performance')}`} onClick={() => handleSelect('performance')}>
              <FontAwesomeIcon icon={faChartBar} /><span>Performance</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('AdminControls')}`} onClick={() => handleSelect('AdminControls')}>
              <FontAwesomeIcon icon={faUserShield} /><span>Admin Controls</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('ShiftScheduling')}`} onClick={() => handleSelect('ShiftScheduling')}>
              <FontAwesomeIcon icon={faCalendarAlt} /><span>Shift Scheduling</span>
            </div>
          </div>

          <div className="sidebar-item" onClick={() => setManagementOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faUserTie} />
            <span className="dropdown-label">Management</span>
            <span className={`arrow ${managementOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${managementOpen ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('TaskManager')}`} onClick={() => handleSelect('TaskManager')}>
              <FontAwesomeIcon icon={faTasks} /><span>Task Manager</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Assignment')}`} onClick={() => handleSelect('Assignment')}>
              <FontAwesomeIcon icon={faUserShield} /><span>Assignment</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Tracking')}`} onClick={() => handleSelect('Tracking')}>
              <FontAwesomeIcon icon={faMapMarkerAlt} /><span>Tracking</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Notifications')}`} onClick={() => handleSelect('Notifications')}>
              <FontAwesomeIcon icon={faBell} /><span>Notifications</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('NotificationsEscalation')}`} onClick={() => handleSelect('NotificationsEscalation')}>
              <FontAwesomeIcon icon={faExclamationTriangle} /><span>Escalations</span>
            </div>
          </div>

          <div className="sidebar-item" onClick={() => setProjectOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faProjectDiagram} />
            <span className="dropdown-label">Project Management</span>
            <span className={`arrow ${projectOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${projectOpen ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('Lifecycle')}`} onClick={() => handleSelect('Lifecycle')}>
              <FontAwesomeIcon icon={faChartLine} /><span>Project Lifecycle</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Financial')}`} onClick={() => handleSelect('Financial')}>
              <FontAwesomeIcon icon={faBullhorn} /><span>Financial Tracking</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Resource')}`} onClick={() => handleSelect('Resource')}>
              <FontAwesomeIcon icon={faTasks} /><span>Resource</span>
            </div>
          </div>

          <div className="sidebar-item" onClick={() => setClientOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faAddressCard} />
            <span className="dropdown-label">Client Management</span>
            <span className={`arrow ${clientOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${clientOpen ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('ClientOnboarding')}`} onClick={() => handleSelect('ClientOnboarding')}>
              <FontAwesomeIcon icon={faUserPlus} /><span>Client Onboarding</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('ClientRevenue')}`} onClick={() => handleSelect('ClientRevenue')}>
              <FontAwesomeIcon icon={faChartBar} /><span>Project & Revenue</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('ClientAdminControls')}`} onClick={() => handleSelect('ClientAdminControls')}>
              <FontAwesomeIcon icon={faUserShield} /><span>Admin Controls</span>
            </div>
          </div>

          <div className="sidebar-item" onClick={() => setCrmOpen(prev => !prev)}>
            <FontAwesomeIcon icon={faHandshake} />
            <span className="dropdown-label">Sales Management</span>
            <span className={`arrow ${crmOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${crmOpen ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('SalesLifecycle')}`} onClick={() => handleSelect('SalesLifecycle')}>
              <FontAwesomeIcon icon={faFileSignature} /><span>Sales Lifecycle</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('InvoiceTracking')}`} onClick={() => handleSelect('InvoiceTracking')}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} /><span>Delivery Tracking</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('SalesLineItems')}`} onClick={() => handleSelect('SalesLineItems')}>
              <FontAwesomeIcon icon={faHandshake} /><span>Sales Line Items</span>
            </div>
          </div>



           <div className="sidebar-item" onClick={() => setCrmOpenn(prev => !prev)}>
            <FontAwesomeIcon icon={faFileSignature} />
            <span className="dropdown-label">Service Management</span>
            <span className={`arrow ${crmOpenn ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`dropdown-container ${crmOpenn ? 'open' : ''}`}>            
            <div className={`sidebar-item gap-item ${isActive('Service')}`} onClick={() => handleSelect('Service')}>
              <FontAwesomeIcon icon={faHandshake} /><span>Service Catalog</span>
            </div>
            <div className={`sidebar-item gap-item ${isActive('Inventory')}`} onClick={() => handleSelect('Inventory')}>
              <FontAwesomeIcon icon={faFileInvoiceDollar} /><span>Service Inventory</span>
            </div>
          </div>
        </div>

        {/* OTHER */}
        <div className="sidebar-section">
          <h3 className="sidebar-heading">OTHER</h3>
          <div className={`sidebar-item ${isActive('settings')}`} onClick={() => handleSelect('settings')}>
            <FontAwesomeIcon icon={faCog} /><span>Settings</span>
          </div>
          <div className={`sidebar-item ${isActive('help')}`} onClick={() => handleSelect('help')}>
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
