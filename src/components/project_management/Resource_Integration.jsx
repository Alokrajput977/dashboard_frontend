// TeamResourceIntegration.js
import React, { useState } from 'react';
import './TeamResourceIntegration.css';
import { FaTasks, FaUsers, FaChartLine, FaBox, FaUserTie, FaBriefcase, FaCalendarAlt, FaClipboardCheck, FaProjectDiagram } from 'react-icons/fa';

const TeamResourceIntegration = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    assignedEmployees: '',
    client: '',
    inventoryItems: '',
    kpiTargets: '',
    utilization: '',
    deadline: '',
    projectManager: '',
    status: 'Planned',
    budget: '',
    department: '',
    priority: 'Medium',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="team-resource-container">
      <h2><FaProjectDiagram /> Team & Resource Integration</h2>
      <form onSubmit={handleSubmit} className="integration-form">
        <div className="form-group">
          <label><FaTasks /> Project Name</label>
          <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label><FaUsers /> Assigned Employees</label>
          <input type="text" name="assignedEmployees" value={formData.assignedEmployees} onChange={handleChange} placeholder="John, Jane, Doe..." />
        </div>

        <div className="form-group">
          <label><FaUserTie /> Client</label>
          <input type="text" name="client" value={formData.client} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><FaBox /> Inventory Items</label>
          <input type="text" name="inventoryItems" value={formData.inventoryItems} onChange={handleChange} placeholder="Monitors, Desks..." />
        </div>

        <div className="form-group">
          <label><FaChartLine /> KPI Targets</label>
          <input type="text" name="kpiTargets" value={formData.kpiTargets} onChange={handleChange} placeholder="Productivity, Timeliness..." />
        </div>

        <div className="form-group">
          <label><FaBriefcase /> Resource Utilization (%)</label>
          <input type="number" name="utilization" value={formData.utilization} onChange={handleChange} min="0" max="100" />
        </div>

        <div className="form-group">
          <label><FaCalendarAlt /> Deadline</label>
          <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><FaUserTie /> Project Manager</label>
          <input type="text" name="projectManager" value={formData.projectManager} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label><FaClipboardCheck /> Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Planned</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>

        <div className="form-group">
          <label>Budget ($)</label>
          <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label>Project Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the project scope, goals, and milestones..." style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#283059', color: '#fff', border: 'none', resize: 'none' }} />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default TeamResourceIntegration;