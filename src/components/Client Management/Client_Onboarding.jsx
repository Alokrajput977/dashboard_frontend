// ClientManagement.js
import React, { useState } from 'react';
import './ClientManagement.css';
import {
  FaUserPlus, FaEnvelope, FaPhone, FaFileInvoiceDollar,
  FaSearch, FaBuilding, FaMapMarkerAlt
} from 'react-icons/fa';

const initialClients = [
  {
    id: 1,
    name: 'John Doe',
    company: 'Acme Corp',
    email: 'john@example.com',
    phone: '+91-9876543210',
    address: 'Mumbai, India',
    billing: '₹12,000',
    history: '5 transactions',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: 'TechWave Ltd',
    email: 'jane@example.com',
    phone: '+91-9988776655',
    address: 'Delhi, India',
    billing: '₹8,500',
    history: '3 transactions',
    status: 'Inactive',
    avatar: 'https://i.pravatar.cc/100?img=2'
  }
];

const ClientManagement = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    billing: '',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/100'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    if (!formData.name || !formData.email) return;
    const newClient = {
      ...formData,
      id: Date.now(),
      history: '0 transactions'
    };
    setClients([newClient, ...clients]);
    setFormData({
      name: '', company: '', email: '', phone: '',
      address: '', billing: '', status: 'Active',
      avatar: 'https://i.pravatar.cc/100'
    });
    setShowModal(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="client-management">
      <div className="header">
        <h2>Client Onboarding & Profiles</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaUserPlus /> Add Client
        </button>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="client-grid">
        {filteredClients.map(client => (
          <div key={client.id} className="client-card">
            <img src={client.avatar} alt={client.name} className="avatar" />
            <h3>{client.name}</h3>
            <p><FaBuilding /> {client.company}</p>
            <p><FaEnvelope /> {client.email}</p>
            <p><FaPhone /> {client.phone}</p>
            <p><FaMapMarkerAlt /> {client.address}</p>
            <p><FaFileInvoiceDollar /> Billing: <strong>{client.billing}</strong></p>
            <p>History: {client.history}</p>
            <span className={`status ${client.status.toLowerCase()}`}>{client.status}</span>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Client</h3>
            <div className="form-profile">
              <div className="form-fields">
                <input name="name" placeholder="Full Name" onChange={handleInputChange} value={formData.name} />
                <input name="company" placeholder="Company" onChange={handleInputChange} value={formData.company} />
                <input name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} />
                <input name="phone" placeholder="Phone" onChange={handleInputChange} value={formData.phone} />
                <input name="address" placeholder="Address" onChange={handleInputChange} value={formData.address} />
                <input name="billing" placeholder="Billing Amount" onChange={handleInputChange} value={formData.billing} />
                <select name="status" onChange={handleInputChange} value={formData.status}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="form-avatar">
                <img src={formData.avatar} alt="avatar preview" />
              </div>
            </div>
            <div className="form-actions">
              <button className="add-btn" onClick={handleAddClient}>Add</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;