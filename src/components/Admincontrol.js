import React from 'react';
import './AdminControls.css';
import { FaUserShield, FaUsersCog, FaBuilding, FaUserFriends } from 'react-icons/fa';

const AdminControls = () => {
  return (
    <div className="admin-ui-container">
      <h1 className="admin-ui-title" style={{}}>Admin Control Panel</h1>
      <p className="admin-ui-subtitle">Effortlessly manage employees and clients with enhanced access control</p>

      <div className="admin-ui-grid">
        <div className="admin-ui-card">
          <FaUsersCog className="admin-ui-icon" />
          <h2>Client Admin</h2>
          <p>Manage all employees under a specific client. Add, update, or remove user records securely.</p>
          <button className="admin-ui-button">Go to Admin Panel</button>
        </div>

        <div className="admin-ui-card">
          <FaUserShield className="admin-ui-icon" />
          <h2>Super Admin</h2>
          <p>Full access to manage multiple clients, employees, and system-wide settings.</p>
          <button className="admin-ui-button">Go to Super Admin</button>
        </div>

        <div className="admin-ui-card">
          <FaUserFriends className="admin-ui-icon" />
          <h2>Employee Directory</h2>
          <p>View employee roles, departments, and profiles across all clients.</p>
          <button className="admin-ui-button">View Employees</button>
        </div>

        <div className="admin-ui-card">
          <FaBuilding className="admin-ui-icon" />
          <h2>Client Management</h2>
          <p>Create and manage client profiles, assign admins, and monitor client activities.</p>
          <button className="admin-ui-button">Manage Clients</button>
        </div>
      </div>
    </div>
  );
};

export default AdminControls;
