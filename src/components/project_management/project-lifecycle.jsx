import React, { useState } from "react";
import './ProjectManagement.css';
import {
    FaProjectDiagram, FaCalendarAlt, FaUser, FaMoneyBill, FaFlag, FaUserTie, FaLayerGroup, FaUsers, FaCogs, FaTrash
} from "react-icons/fa";

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        manager: "",
        client: "",
        type: "",
        teamSize: "",
        techStack: "",
        startDate: "",
        endDate: "",
        status: "",
        budget: "",
        priority: "",
        description: "",
    });

  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProjects([...projects, formData]);
        setFormData({
            name: "",
            manager: "",
            client: "",
            type: "",
            teamSize: "",
            techStack: "",
            startDate: "",
            endDate: "",
            status: "",
            budget: "",
            priority: "",
            description: "",
        });
    };

    const handleDelete = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    return (
        <div className="project-management-wrapper">
            <div className="pm-header">
                <h1><FaProjectDiagram /> Project Management</h1>
            </div>

            <div className="pm-form-section">
                <form className="pm-form" onSubmit={handleSubmit}>
                    {/* All form fields */}
                    <div className="pm-form-group">
                        <label><FaFlag /> Project Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="pm-form-group">
                        <label><FaUserTie /> Manager</label>
                        <input type="text" name="manager" value={formData.manager} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaUser /> Client Name</label>
                        <input type="text" name="client" value={formData.client} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaLayerGroup /> Project Type</label>
                        <input type="text" name="type" value={formData.type} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaUsers /> Team Size</label>
                        <input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaCogs /> Tech Stack</label>
                        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaCalendarAlt /> Start Date</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaCalendarAlt /> End Date</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label>Status</label>
                        <input type="text" name="status" value={formData.status} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label><FaMoneyBill /> Budget (USD)</label>
                        <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group">
                        <label>Priority</label>
                        <input type="text" name="priority" value={formData.priority} onChange={handleChange} />
                    </div>
                    <div className="pm-form-group" style={{ gridColumn: "span 2" }}>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={3}></textarea>
                    </div>

                    <button className="pm-submit-btn" type="submit">
                        <FaFlag /> Add Project
                    </button>
                </form>
            </div>

            <div className="pm-projects">
                <h2 className="pm-subtitle">All Projects</h2>
                <div className="pm-project-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="pm-project-card">
                            <h3>📁 {project.name}</h3>
                            <p><strong>Manager:</strong> {project.manager}</p>
                            <p><strong>Client:</strong> {project.client}</p>
                            <p><strong>Type:</strong> {project.type}</p>
                            <p><strong>Team:</strong> {project.teamSize} people</p>
                            <p><strong>Tech:</strong> {project.techStack}</p>
                            <p><strong>Status:</strong> {project.status}</p>
                            <p><strong>Budget:</strong> ${project.budget}</p>
                            <p><strong>Priority:</strong> {project.priority}</p>
                            <p><strong>Description:</strong> {project.description}</p>
                            <button className="pm-delete-btn" onClick={() => handleDelete(index)}>
                                <FaTrash /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectManager;
