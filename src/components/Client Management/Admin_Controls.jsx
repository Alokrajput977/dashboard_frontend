import React, { useState } from 'react';
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaIdBadge,
  FaCalendarAlt,
  FaToggleOn,
  FaUser,
  FaLock,
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaImage,
} from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './AdminControls.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    accessLevel: '',
    company: '',
    clientId: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    gender: '',
    profilePic: '',
    createdDate: '',
    status: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send formData to your backend here
    console.log('Form submitted:', formData);
    alert('Form submitted:\n' + JSON.stringify(formData, null, 2));
  };

  // ========== Chart Data ==========
  const roleData = [
    { name: 'Super Admin', value: 40 },
    { name: 'Client Admin', value: 60 },
  ];
  const statusData = [
    { name: 'Active', value: 80 },
    { name: 'Inactive', value: 20 },
  ];
  const COLORS = ['#8b5cf6', '#6366f1'];

  const lineData = [
    { month: 'Jan', Super: 30, Client: 70 },
    { month: 'Feb', Super: 20, Client: 80 },
    { month: 'Mar', Super: 40, Client: 60 },
    { month: 'Apr', Super: 35, Client: 65 },
    { month: 'May', Super: 50, Client: 50 },
    { month: 'Jun', Super: 45, Client: 55 },
  ];

  return (
    <div className="admin-wrapper">
      {/* ========= CHART GRID AT TOP ========= */}
      <div className="chart-grid">
        {/* Pie Chart: Role Distribution */}
        <div className="chart-card">
          <h3 className="chart-heading">Role Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {roleData.map((entry, idx) => (
                  <Cell
                    key={`cell-role-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconSize={8}
                wrapperStyle={{ color: '#ffffff', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Active vs Inactive */}
        <div className="chart-card">
          <h3 className="chart-heading">Active vs Inactive</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                <Cell key="active" fill="#36cfc9" />
                <Cell key="inactive" fill="#ff4d4f" />
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconSize={8}
                wrapperStyle={{ color: '#ffffff', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart: Monthly Role Stats (spans full width) */}
        <div className="chart-card full-width">
          <h3 className="chart-heading">Monthly Role Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#444" strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                stroke="#ffffff"
                tick={{ fill: '#ffffff', fontSize: 12 }}
              />
              <YAxis
                stroke="#ffffff"
                tick={{ fill: '#ffffff', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2a2f4a',
                  border: '1px solid #555',
                  color: '#ffffff',
                }}
                itemStyle={{ color: '#ffffff' }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Legend
                verticalAlign="top"
                iconSize={8}
                wrapperStyle={{ color: '#ffffff', paddingBottom: '10px' }}
              />
              <Line
                type="monotone"
                dataKey="Super"
                stroke="#8b5cf6"
                strokeWidth={3}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Client"
                stroke="#6366f1"
                strokeWidth={3}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ========= FORM CARD BELOW ========= */}
      <div className="form-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Role */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Client Admin">Client Admin</option>
              </select>
            </div>

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">
                <FaUser className="label-icon" /> Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">
                <FaLock className="label-icon" /> Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">
                <FaUserTie className="label-icon" /> Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope className="label-icon" /> Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">
                <FaPhone className="label-icon" /> Phone
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="department">
                <FaBuilding className="label-icon" /> Department
              </label>
              <input
                id="department"
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. HR, IT"
                required
              />
            </div>

            {/* Access Level */}
            <div className="form-group">
              <label htmlFor="accessLevel">
                <FaIdBadge className="label-icon" /> Access Level
              </label>
              <input
                id="accessLevel"
                type="text"
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
                placeholder="e.g. Full, Limited"
                required
              />
            </div>

            {/* Company */}
            <div className="form-group">
              <label htmlFor="company">
                <FaBuilding className="label-icon" /> Company
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Client ID */}
            <div className="form-group">
              <label htmlFor="clientId">
                <FaIdBadge className="label-icon" /> Client ID
              </label>
              <input
                id="clientId"
                type="text"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                placeholder="Enter client ID"
                required
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">
                <FaHome className="label-icon" /> Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                required
              />
            </div>

            {/* City */}
            <div className="form-group">
              <label htmlFor="city">
                <FaCity className="label-icon" /> City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            {/* State */}
            <div className="form-group">
              <label htmlFor="state">
                <FaMapMarkerAlt className="label-icon" /> State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>

            {/* ZIP Code */}
            <div className="form-group">
              <label htmlFor="zip">
                <FaMapMarkerAlt className="label-icon" /> ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="e.g. 560001"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <label htmlFor="dob">
                <FaBirthdayCake className="label-icon" /> Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">
                <FaVenusMars className="label-icon" /> Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Profile Picture URL */}
            <div className="form-group">
              <label htmlFor="profilePic">
                <FaImage className="label-icon" /> Profile Pic URL
              </label>
              <input
                id="profilePic"
                type="url"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {/* Created Date */}
            <div className="form-group">
              <label htmlFor="createdDate">
                <FaCalendarAlt className="label-icon" /> Created Date
              </label>
              <input
                id="createdDate"
                type="date"
                name="createdDate"
                value={formData.createdDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Active Status */}
            <div className="form-group status-group">
              <label htmlFor="status">
                <FaToggleOn className="label-icon" /> Active Status
              </label>
              <div className="status-control">
                <input
                  id="status"
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
                <span className="status-text">
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="submit-btn">
            Save Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
