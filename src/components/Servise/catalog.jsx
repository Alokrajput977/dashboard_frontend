// ServiceCatalog.jsx
import React, { useState } from 'react';
import './ServiceCatalog.css';

const ServiceCatalog = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    serviceType: '',
    serviceLevel: '',
    pricing: '',
    availability: false,
    slaDuration: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleReset = () => {
    setFormData({
      serviceName: '',
      description: '',
      serviceType: '',
      serviceLevel: '',
      pricing: '',
      availability: false,
      slaDuration: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Service Added Successfully!');
    console.log('Submitted:', formData);
  };

  return (
    <div className="catalog-wrapper">
      <div className="card">
        <h2 className="card-title">
          <i className="fas fa-server"></i> Service Catalog
        </h2>

        <div className="info-grid">
          <div className="info-box">
            <i className="fas fa-cogs"></i>
            <p>Types of services offered</p>
          </div>
          <div className="info-box">
            <i className="fas fa-sliders-h"></i>
            <p>Service levels & pricing</p>
          </div>
          <div className="info-box">
            <i className="fas fa-clock"></i>
            <p>Availability & SLA durations</p>
          </div>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          {/* Row of 3 inputs */}
          <div className="row">
            <div className="form-group">
              <input
                type="text"
                name="serviceName"
                placeholder="Service Name"
                value={formData.serviceName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="serviceType"
                placeholder="Service Type"
                value={formData.serviceType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="pricing"
                placeholder="Pricing (INR)"
                value={formData.pricing}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Single full-width fields */}
          <div className="form-group">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="row">
            <div className="form-group">
              <select
                name="serviceLevel"
                value={formData.serviceLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Service Level</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="slaDuration"
                placeholder="SLA Duration (hours)"
                value={formData.slaDuration}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
              />
              <span>Available</span>
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="btn submit">
              <i className="fas fa-paper-plane"></i> Submit
            </button>
            <button type="button" className="btn reset" onClick={handleReset}>
              <i className="fas fa-sync-alt"></i> Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCatalog;
