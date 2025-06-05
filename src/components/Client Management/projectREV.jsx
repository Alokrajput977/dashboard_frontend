// ProjectRevenue.js
import React, { useState } from 'react';
import './ProjectRevenue.css';
import { FaProjectDiagram, FaDollarSign, FaHistory, FaPlus } from 'react-icons/fa';

const initialClients = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Corp',
    projects: [
      { id: 'p1', name: 'Website Redesign' },
      { id: 'p2', name: 'Mobile App Development' }
    ],
    revenue: 42000,
    transactions: 8,
    avatar: 'https://i.pravatar.cc/100?img=10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'TechWave Ltd',
    projects: [
      { id: 'p3', name: 'Cloud Migration' },
      { id: 'p4', name: 'API Integration' },
      { id: 'p5', name: 'Security Audit' }
    ],
    revenue: 38500,
    transactions: 5,
    avatar: 'https://i.pravatar.cc/100?img=12'
  }
];

const ProjectRevenue = () => {
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    company: '',
    project: '',
    revenue: '',
    transactions: '',
    avatar: 'https://i.pravatar.cc/100'
  });

  const handleInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.company || !newClient.project) return;

    const client = {
      id: Date.now(),
      name: newClient.name,
      company: newClient.company,
      projects: [{ id: `p-${Date.now()}`, name: newClient.project }],
      revenue: parseInt(newClient.revenue || 0),
      transactions: parseInt(newClient.transactions || 0),
      avatar: newClient.avatar
    };

    setClients([client, ...clients]);
    setNewClient({
      name: '',
      company: '',
      project: '',
      revenue: '',
      transactions: '',
      avatar: 'https://i.pravatar.cc/100'
    });
    setShowModal(false);
  };

  return (
    <div className="project-revenue-container">
      <header>
        <h1>Project & Revenue Association</h1>
        <p>View all projects linked to clients and track revenue & transactions.</p>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Client
        </button>
      </header>

      <div className="clients-grid">
        {clients.map(client => (
          <div key={client.id} className="client-card">
            <img src={client.avatar} alt={client.name} className="avatar" />
            <h2>{client.name}</h2>
            <h4>{client.company}</h4>

            <div className="projects-section">
              <FaProjectDiagram className="icon" />
              <div>
                <h5>Projects</h5>
                <ul>
                  {client.projects.map(proj => (
                    <li key={proj.id}>{proj.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="revenue-transactions">
              <div className="revenue">
                <FaDollarSign className="icon" />
                <span>₹{client.revenue.toLocaleString()}</span>
              </div>
              <div className="transactions">
                <FaHistory className="icon" />
                <span>{client.transactions} transactions</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Client</h3>
            <input name="name" placeholder="Client Name" onChange={handleInputChange} value={newClient.name} />
            <input name="company" placeholder="Company" onChange={handleInputChange} value={newClient.company} />
            <input name="project" placeholder="Project Name" onChange={handleInputChange} value={newClient.project} />
            <input name="revenue" placeholder="Revenue (₹)" onChange={handleInputChange} value={newClient.revenue} />
            <input name="transactions" placeholder="Transactions" onChange={handleInputChange} value={newClient.transactions} />
            <input name="avatar" placeholder="Avatar URL" onChange={handleInputChange} value={newClient.avatar} />
            <div className="modal-buttons">
              <button className={{backgroundcolor:"black"}} onClick={handleAddClient}>Add</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRevenue;
