// AssignmentOwnership.js
import React from 'react';
import './AssignmentOwnership.css';
import { FaUsers, FaUserTie, FaLock, FaEye } from 'react-icons/fa';

const AssignmentOwnership = () => {
  return (
    <div className="assignment-container">
      <h2 className="section-title"> Assignment & Ownership</h2>
      <p className="section-subtitle p">
        Manage task distribution efficiently with team-based assignment role-based access
      </p>
      <div className="card-grid">
        <div className="card">
          <div className="card-icon">
            <FaUsers />
          </div>
          <div className="card-content">
            <h3>Assign Tasks to Teams</h3>
            <p>Allocate tasks effortlessly to individual employees or entire teams, ensuring efficient workload management.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaUserTie />
          </div>
          <div className="card-content">
            <h3>Role-Based Permissions</h3>
            <p>Grant task-level control based on roles like Manager, Developer, or Team Lead to promote clear responsibility.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaLock />
          </div>
          <div className="card-content">
            <h3>Permission Settings</h3>
            <p>Define who can assign, edit, or complete tasks with customizable permission levels.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-icon">
            <FaEye />
          </div>
          <div className="card-content">
            <h3>Visibility Management</h3>
            <p>Configure visibility to ensure only authorized users can view or interact with specific tasks and details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentOwnership;
