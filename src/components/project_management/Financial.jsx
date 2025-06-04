import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FinancialTracking.css';

const FinancialTracking = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project Alpha',
      client: 'ABC Corp',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      revenue: 120000,
      cost: 80000
    },
    {
      id: 2,
      name: 'Project Beta',
      client: 'XYZ Ltd',
      startDate: '2024-02-10',
      endDate: '2024-07-20',
      revenue: 95000,
      cost: 50000
    },
    {
      id: 3,
      name: 'Project Gamma',
      client: 'Innotech Pvt Ltd',
      startDate: '2024-03-01',
      endDate: '2024-08-30',
      revenue: 200000,
      cost: 120000
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    startDate: '',
    endDate: '',
    revenue: '',
    cost: ''
  });

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProject = () => {
    const { name, client, startDate, endDate, revenue, cost } = newProject;
    if (!name || !client || !startDate || !endDate || !revenue || !cost) {
      toast.warning('Please fill in all fields.');
      return;
    }

    const password = window.prompt("Enter password to add project:");
    if (password === 'password') {
      const newEntry = {
        ...newProject,
        id: Date.now(),
        revenue: parseFloat(revenue),
        cost: parseFloat(cost)
      };

      setProjects([...projects, newEntry]);
      setNewProject({
        name: '',
        client: '',
        startDate: '',
        endDate: '',
        revenue: '',
        cost: ''
      });

      toast.success("Project added successfully!");
    } else {
      toast.error("Incorrect password! Project not added.");
    }
  };

  const handleDelete = (id) => {
    const filteredProjects = projects.filter(project => project.id !== id);
    setProjects(filteredProjects);
    toast.info("Project deleted.");
  };

  const calculateProfit = (revenue, cost) => revenue - cost;
  const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
  const totalCost = projects.reduce((sum, p) => sum + p.cost, 0);
  const totalProfit = totalRevenue - totalCost;

  return (
    <div className="financial-tracking-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Financial Tracking</h2>

      <div className="summary">
        <div className="summary-box">
          <h3>Total Revenue</h3>
          <p>₹ {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="summary-box">
          <h3>Total Cost</h3>
          <p>₹ {totalCost.toLocaleString()}</p>
        </div>
        <div className="summary-box">
          <h3>Total Profit</h3>
          <p>₹ {totalProfit.toLocaleString()}</p>
        </div>
      </div>

      <div className="form-section">
        <h3>Add New Project</h3>
        <div className="form-row">
          <input type="text" name="name" placeholder="Project Name" value={newProject.name} onChange={handleInputChange} />
          <input type="text" name="client" placeholder="Client" value={newProject.client} onChange={handleInputChange} />
          <input type="date" name="startDate" value={newProject.startDate} onChange={handleInputChange} />
          <input type="date" name="endDate" value={newProject.endDate} onChange={handleInputChange} />
          <input type="number" name="revenue" placeholder="Revenue" value={newProject.revenue} onChange={handleInputChange} />
          <input type="number" name="cost" placeholder="Cost" value={newProject.cost} onChange={handleInputChange} />
          <button onClick={handleAddProject}>Add Project</button>
        </div>
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Revenue (₹)</th>
            <th>Cost (₹)</th>
            <th>Profit (₹)</th>
            <th>Profit Margin (%)</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.client}</td>
              <td>{project.startDate}</td>
              <td>{project.endDate}</td>
              <td>{project.revenue.toLocaleString()}</td>
              <td>{project.cost.toLocaleString()}</td>
              <td>{calculateProfit(project.revenue, project.cost).toLocaleString()}</td>
              <td>{((calculateProfit(project.revenue, project.cost) / project.revenue) * 100).toFixed(2)}</td>
              <td>
                <i className="fas fa-trash delete-icon" onClick={() => handleDelete(project.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTracking;
