import React, { useState } from 'react';
import axios from 'axios';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendarAlt,
  FaTransgender,
  FaBuilding,
  FaBriefcase,
  FaCertificate,
  FaClock,
  FaUserCircle
} from 'react-icons/fa';
import './AddMember.css';

const INITIAL_STATE = {
  fullName: '',
  username: '',
  password: '',
  dob: '',
  gender: '',
  phoneNumber: '',
  email: '',
  department: '',
  experience: '',
  qualification: '',
  shiftTiming: '',
  emergencyContact: '',
  dateOfJoining: '',
  employeeImage: null,
};

function AddMember() {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'employeeImage' ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== '') {
          fd.append(key, val);
        }
      });

      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/api/members',
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      setFormData({ ...INITIAL_STATE });
    } catch (err) {
      console.error('Error creating member:', err);
      alert(err.response?.data?.message || 'Error creating member');
    }
  };

  return (
    <div className="add-member-container">
      <div className="card">
        <div className="card-header">
          <FaUserCircle className="header-icon" />
          <h2 className="card-title">Create Employee Profile</h2>
        </div>
        <form className="form-body" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="settings-section">
            <h3 className="section-title">Personal Details</h3>

            <div className="settings-item">
              <div className="item-info">
                <FaUser /> <span>Full Name</span>
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaUser /> <span>Username</span>
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaLock /> <span>Password</span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaCalendarAlt /> <span>Date of Birth</span>
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaTransgender /> <span>Gender</span>
              </div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact & Work */}
          <div className="settings-section">
            <h3 className="section-title">Contact & Work</h3>

            <div className="settings-item">
              <div className="item-info">
                <FaPhone /> <span>Phone Number</span>
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +1 555-1234"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaEnvelope /> <span>Email Address</span>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@example.com"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaBuilding /> <span>Department</span>
              </div>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="hr">HR</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaBriefcase /> <span>Experience (years)</span>
              </div>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select Experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="settings-section">
            <h3 className="section-title">Additional Info</h3>

            <div className="settings-item">
              <div className="item-info">
                <FaCertificate /> <span>Qualification</span>
              </div>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. B.Com, M.Sc"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaClock /> <span>Shift Timing</span>
              </div>
              <input
                type="text"
                name="shiftTiming"
                value={formData.shiftTiming}
                onChange={handleChange}
                placeholder="e.g. 9:00 AM - 5:00 PM"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaPhone /> <span>Emergency Contact</span>
              </div>
              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Emergency contact number"
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaCalendarAlt /> <span>Date of Joining</span>
              </div>
              <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>

            <div className="settings-item">
              <div className="item-info">
                <FaUser /> <span>Employee Image</span>
              </div>
              <input
                type="file"
                name="employeeImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="save-btn">Create Profile</button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
