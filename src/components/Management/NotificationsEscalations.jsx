import React from 'react';
import './NotificationsEscalations.css';
import { FaEnvelope, FaExclamationTriangle, FaUserShield } from 'react-icons/fa';

const NotificationsEscalations = () => {
  return (
    <div className="notif-container">
      <h2 className="notif-title">Notifications & Escalations</h2>

      {/* Top Info Boxes */}
      <div className="notif-info-boxes">
        <div className="notif-box">
          <FaEnvelope className="icon" />
          <div>
            <h4>Email Alerts</h4>
            <p>3 triggered today</p>
          </div>
        </div>
        <div className="notif-box">
          <FaExclamationTriangle className="icon red" />
          <div>
            <h4>Overdue Critical Tasks</h4>
            <p>5 critical</p>
          </div>
        </div>
        <div className="notif-box">
          <FaUserShield className="icon" />
          <div>
            <h4>Escalated to Managers</h4>
            <p>2 today</p>
          </div>
        </div>
      </div>

      {/* Settings Panels */}
      <div className="notif-panels">
        <div className="notif-panel">
          <h3>Email Alerts</h3>
          <ul>
            <li>✅ Alert on due dates</li>
            <li>✅ Alert on task changes</li>
            <li>✅ Alert on delays</li>
          </ul>
          <button className="btn">Configure Alerts</button>
        </div>

        <div className="notif-panel">
          <h3>Escalation Matrix</h3>
          <ul>
            <li>🔺 Escalate overdue critical tasks after 24 hrs</li>
            <li>🔁 Route based on role hierarchy (employee → lead → manager)</li>
            <li>📈 Auto-flag high-priority tasks</li>
          </ul>
          <button className="btn btn-secondary">Manage Matrix</button>
        </div>
      </div>

      {/* Table */}
      <div className="notif-table-section">
        <h3>Current Notifications & Escalations</h3>
        <table className="notif-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Criticality</th>
              <th>Escalated To</th>
              <th>Alert Sent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Design Review</td>
              <td>Overdue</td>
              <td>High</td>
              <td>Project Manager</td>
              <td>Email</td>
            </tr>
            <tr>
              <td>Bug Fix 231</td>
              <td>Pending</td>
              <td>Medium</td>
              <td>Team Lead</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Client Feedback</td>
              <td>Due Soon</td>
              <td>Low</td>
              <td>N/A</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationsEscalations;
