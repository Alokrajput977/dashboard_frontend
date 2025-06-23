import React, { useState } from 'react';
import './ServiceInventory.css';
import { FaPlus, FaEdit, FaTrash, FaLink } from 'react-icons/fa';

const ServiceInventory = () => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serial: '',
    location: '',
    assignedTo: '',
    status: '',
    purchaseDate: '',
    warranty: '',
    serviceId: '',
    billingRef: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAssets([...assets, formData]);
    setFormData({
      name: '',
      type: '',
      serial: '',
      location: '',
      assignedTo: '',
      status: '',
      purchaseDate: '',
      warranty: '',
      serviceId: '',
      billingRef: '',
      description: '',
    });
  };

  const handleDelete = (index) => {
    const updatedAssets = [...assets];
    updatedAssets.splice(index, 1);
    setAssets(updatedAssets);
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Service Inventory</h1>

      <div className="form-section">
        <h2>Add / Manage Service Asset</h2>
        <form className="inventory-form" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Asset Name" required />
          <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Asset Type" required />
          <input type="text" name="serial" value={formData.serial} onChange={handleChange} placeholder="Serial Number" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} placeholder="Assigned To" />
          <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="Status (Active/Inactive)" />
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} placeholder="Purchase Date" />
          <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} placeholder="Warranty Expiry" />
          <input type="text" name="serviceId" value={formData.serviceId} onChange={handleChange} placeholder="Linked Service Request ID" />
          <input type="text" name="billingRef" value={formData.billingRef} onChange={handleChange} placeholder="Billing Reference" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
          <button type="submit" className="btn-add">
            <FaPlus /> Add Asset
          </button>
        </form>
      </div>

      <div className="table-section">
        <h2>Inventory List</h2>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Serial</th>
              <th>Location</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Service Req ID</th>
              <th>Billing Ref</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.serial}</td>
                <td>{asset.location}</td>
                <td>{asset.status}</td>
                <td>{asset.assignedTo}</td>
                <td>{asset.serviceId}</td>
                <td>{asset.billingRef}</td>
                <td className="actions">
                  <button onClick={() => handleDelete(index)} title="Delete"><FaTrash /></button>
                  <button title="Edit"><FaEdit /></button>
                  <button title="Link"><FaLink /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceInventory;