import React, { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBirthdayCake,
    FaVenusMars,
    FaBuilding,
    FaBriefcase,
    FaCalendarAlt,
    FaHome,
    FaImage,
} from "react-icons/fa";
import "./EmployeeForm.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        department: "",
        designation: "",
        joinDate: "",
        address: "",
        profilePic: null,
    });
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            setFormData((f) => ({ ...f, [name]: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Form submitted!");
    };

    return (
        <div className="employee-form-wrapper">
            <form className="employee-form" onSubmit={handleSubmit}>
                <h1 className="form-main-title">Employee Onboarding</h1>

                {/* Personal Section */}
                <section className="form-section">
                    <h2>Personal Details</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label><FaUser /> First Name *</label>
                            <input type="text" name="firstName" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaUser /> Middle Name</label>
                            <input type="text" name="middleName" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><FaUser /> Last Name *</label>
                            <input type="text" name="lastName" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaBirthdayCake /> Date of Birth *</label>
                            <input type="date" name="dob" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaCalendarAlt /> Join Date *</label>
                            <input type="date" name="joinDate" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaVenusMars /> Gender *</label>
                            <select name="gender" onChange={handleChange} required>
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Contact & Professional */}
                <section className="form-section">
                    <h2>Contact & Professional</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label><FaEnvelope /> Email *</label>
                            <input type="email" name="email" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaPhone /> Phone *</label>
                            <input type="tel" name="phone" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label><FaBuilding /> Department *</label>
                            <select name="Department" onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option>Accounting</option>
                                <option>Administration</option>
                                <option>Business Development</option>
                                <option>Compliance</option>
                                <option>Consulting</option>
                                <option>Customer Support</option>
                                <option>Data Analytics</option>
                                <option>Data Science</option>
                                <option>Design</option>
                                <option>DevOps</option>
                                <option>Digital Marketing</option>
                                <option>Editorial</option>
                                <option>Education & Training</option>
                                <option>Engineering</option>
                                <option>Environmental Health</option>
                                <option>Finance</option>
                                <option>Graphic Design</option>
                                <option>Healthcare</option>
                                <option>Human Resources</option>
                                <option>Information Security</option>
                                <option>Information Technology</option>
                                <option>Innovation</option>
                                <option>Investor Relations</option>
                                <option>Legal</option>
                                <option>Logistics</option>
                                <option>Maintenance</option>
                                <option>Manufacturing</option>
                                <option>Marketing</option>
                                <option>Network Engineering</option>
                                <option>Operations</option>
                                <option>Payroll</option>
                                <option>Product Management</option>
                                <option>Procurement</option>
                                <option>Project Management</option>
                                <option>Public Relations</option>
                                <option>Quality Assurance</option>
                                <option>Real Estate</option>
                                <option>Recruitment</option>
                                <option>Research & Development</option>
                                <option>Risk Management</option>
                                <option>Sales</option>
                                <option>Security</option>
                                <option>Software Development</option>
                                <option>Strategic Planning</option>
                                <option>Supply Chain</option>
                                <option>Tax & Audit</option>
                                <option>Technical Support</option>
                                <option>UX/UI Design</option>
                                <option>Vendor Management</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><FaBriefcase /> Designation *</label>
                            <select name="designation" onChange={handleChange} required>
                                <option value="">Select Designation</option>
                                <option>Software Developer</option>
                                <option>Senior Developer</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Full Stack Developer</option>
                                <option>Project Manager</option>
                                <option>Product Manager</option>
                                <option>Business Analyst</option>
                                <option>UI/UX Designer</option>
                                <option>Graphic Designer</option>
                                <option>Web Designer</option>
                                <option>Data Analyst</option>
                                <option>Data Scientist</option>
                                <option>Database Administrator</option>
                                <option>QA Engineer</option>
                                <option>Test Engineer</option>
                                <option>DevOps Engineer</option>
                                <option>System Administrator</option>
                                <option>Network Engineer</option>
                                <option>Security Analyst</option>
                                <option>Cloud Engineer</option>
                                <option>Mobile App Developer</option>
                                <option>iOS Developer</option>
                                <option>Android Developer</option>
                                <option>Machine Learning Engineer</option>
                                <option>AI Engineer</option>
                                <option>Blockchain Developer</option>
                                <option>HR Executive</option>
                                <option>HR Manager</option>
                                <option>Recruiter</option>
                                <option>Finance Executive</option>
                                <option>Accountant</option>
                                <option>Auditor</option>
                                <option>Marketing Specialist</option>
                                <option>Digital Marketer</option>
                                <option>SEO Specialist</option>
                                <option>Content Writer</option>
                                <option>Copywriter</option>
                                <option>Sales Executive</option>
                                <option>Sales Manager</option>
                                <option>Customer Support Executive</option>
                                <option>Technical Support Engineer</option>
                                <option>Operations Manager</option>
                                <option>Office Administrator</option>
                                <option>Legal Advisor</option>
                                <option>Training Coordinator</option>
                                <option>Logistics Manager</option>
                                <option>Procurement Officer</option>
                                <option>Intern</option>
                            </select>
                        </div>
                        <div className="form-group address-group">
                            <label><FaHome /> Address</label>
                            <textarea name="address" rows="2" onChange={handleChange} />
                        </div>
                        <div className="form-group file-group">
                            <label><FaImage /> Profile Picture</label>
                            <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
                            {preview && (
                                <div className="preview">
                                    <img src={preview} alt="Preview" />
                                    <span>Preview</span>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Buttons */}
                <div className="form-buttons">
                    <button type="button" className="submit-btn back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
        </div>
    );
}
