// AddMember.js
import React, { useState } from "react";
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
  FaUserCircle,
} from "react-icons/fa";
import "./AddMember.css";

function AddMember() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    dob: "",
    gender: "",
    phoneNumber: "",
    email: "",
    department: "",
    experience: "",
    qualification: "",
    shiftTiming: "",
    emergencyContact: "",
    dateOfJoining: "",
    employeeImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "employeeImage") {
      setFormData((prev) => ({
        ...prev,
        employeeImage: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Employee profile created successfully!");
    // Reset form optionally
    setFormData({
      fullName: "",
      username: "",
      password: "",
      dob: "",
      gender: "",
      phoneNumber: "",
      email: "",
      department: "",
      experience: "",
      qualification: "",
      shiftTiming: "",
      emergencyContact: "",
      dateOfJoining: "",
      employeeImage: null,
    });
  };

  const {
    fullName,
    username,
    password,
    dob,
    gender,
    phoneNumber,
    email,
    department,
    experience,
    qualification,
    shiftTiming,
    emergencyContact,
    dateOfJoining,
  } = formData;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <FaUserCircle className="header-icon" />
          <h2>Create Employee Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-body">
          <div className="fields-grid">
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="input-group">
              <FaCalendarAlt className="icon" />
              <input
                type="date"
                name="dob"
                value={dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <FaTransgender className="icon" />
              <select
                name="gender"
                value={gender}
                onChange={handleChange}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="input-group">
              <FaBuilding className="icon" />
              <select
                name="department"
                value={department}
                onChange={handleChange}
                required
              >
                <option value="">Department</option>
                <option value="hr">HR</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div className="input-group">
              <FaBriefcase className="icon" />
              <select
                name="experience"
                value={experience}
                onChange={handleChange}
                required
              >
                <option value="">Experience</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} year{ i > 0 ? "s" : "" }
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <FaCertificate className="icon" />
              <input
                type="text"
                name="qualification"
                value={qualification}
                onChange={handleChange}
                placeholder="Qualification"
                required
              />
            </div>
            <div className="input-group">
              <FaClock className="icon" />
              <input
                type="text"
                name="shiftTiming"
                value={shiftTiming}
                onChange={handleChange}
                placeholder="Shift Timing"
                required
              />
            </div>
            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="emergencyContact"
                value={emergencyContact}
                onChange={handleChange}
                placeholder="Emergency Contact"
                required
              />
            </div>
            <div className="input-group file-input">
              <input
                type="file"
                name="employeeImage"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <FaCalendarAlt className="icon" />
              <input
                type="date"
                name="dateOfJoining"
                value={dateOfJoining}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;

