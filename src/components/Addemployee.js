import React, { useState } from "react";
import {
    FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaVenusMars, FaBuilding,
    FaBriefcase, FaCalendarAlt, FaHome, FaImage, FaMoneyBillWave, FaUniversity,
    FaIdCard, FaAddressCard
} from "react-icons/fa";
import "./EmployeeForm.css";
import { useNavigate } from "react-router-dom";

export default function EmployeeForm() {
    const [formData, setFormData] = useState({
        firstName: "", middleName: "", lastName: "", dob: "", gender: "",
        email: "", phone: "", department: "", designation: "", joinDate: "", address: "", profilePic: null,
        emergencyName: "", emergencyRelation: "", emergencyPhone: "",
        salary: "", taxDetails: "", bankName: "", accountNumber: "",
        employmentHistory: "", qualifications: "", certifications: ""
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
        alert("Form submitted!");
        console.log(formData);
    };

    const renderInput = (label, icon, name, type = "text", required = false) => (
        <div className="form-group">
            <label><span>{icon}</span> {label}{required && " *"}</label>
            <input type={type} name={name} onChange={handleChange} required={required} />
        </div>
    );

    return (
        <div className="employee-form-container">
            <form className="employee-form" onSubmit={handleSubmit}>
                <h1 className="form-title" style={{ paddingBottom: "40px" }}> Employee Onboarding</h1>

                {/* Personal Info */}
                <section>
                    <div className="form-grid">
                        {renderInput("First Name", <FaUser />, "firstName", "text", true)}
                        {renderInput("Middle Name", <FaUser />, "middleName")}
                        {renderInput("Last Name", <FaUser />, "lastName", "text", true)}
                        {renderInput("Date of Birth", <FaBirthdayCake />, "dob", "date", true)}
                        {renderInput("Join Date", <FaCalendarAlt />, "joinDate", "date", true)}
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
                <section>
                    <h2 className="section-title" style={{paddingBottom:"20px"}}> Contact & Job Info</h2>
                    <div className="form-grid">
                        {renderInput("Email", <FaEnvelope />, "email", "email", true)}
                        {renderInput("Phone", <FaPhone />, "phone", "tel", true)}

                        <div className="form-group">
                            <label><FaBuilding /> Department *</label>
                            <select name="department" onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {[
                                    "Accounting", "Administration", "Business Development", "Compliance", "Consulting", "Customer Support",
                                    "Data Analytics", "Data Science", "Design", "DevOps", "Digital Marketing", "Editorial",
                                    "Education & Training", "Engineering", "Environmental Health", "Finance", "Graphic Design", "Healthcare",
                                    "Human Resources", "Information Security", "Information Technology", "Innovation", "Investor Relations",
                                    "Legal", "Logistics", "Maintenance", "Manufacturing", "Marketing", "Network Engineering", "Operations",
                                    "Payroll", "Product Management", "Procurement", "Project Management", "Public Relations",
                                    "Quality Assurance", "Real Estate", "Recruitment", "Research & Development", "Risk Management", "Sales",
                                    "Security", "Software Development", "Strategic Planning", "Supply Chain", "Tax & Audit",
                                    "Technical Support", "UX/UI Design", "Vendor Management"
                                ].map((dept, index) => (
                                    <option key={index}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label><FaBriefcase /> Designation *</label>
                            <select name="designation" onChange={handleChange} required>
                                <option value="">Select Designation</option>
                                {[
                                    "Software Developer", "Senior Developer", "Frontend Developer", "Backend Developer",
                                    "Full Stack Developer", "Project Manager", "Product Manager", "Business Analyst", "UI/UX Designer",
                                    "Graphic Designer", "Web Designer", "Data Analyst", "Data Scientist", "Database Administrator",
                                    "QA Engineer", "Test Engineer", "DevOps Engineer", "System Administrator", "Network Engineer",
                                    "Security Analyst", "Cloud Engineer", "Mobile App Developer", "iOS Developer", "Android Developer",
                                    "Machine Learning Engineer", "AI Engineer", "Blockchain Developer", "HR Executive", "HR Manager",
                                    "Recruiter", "Finance Executive", "Accountant", "Auditor", "Marketing Specialist", "Digital Marketer",
                                    "SEO Specialist", "Content Writer", "Copywriter", "Sales Executive", "Sales Manager",
                                    "Customer Support Executive", "Technical Support Engineer", "Operations Manager", "Office Administrator",
                                    "Legal Advisor", "Training Coordinator", "Logistics Manager", "Procurement Officer", "Intern"
                                ].map((role, index) => (
                                    <option key={index}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group address-group">
                            <label><FaHome /> Address</label>
                            <textarea name="address" onChange={handleChange} rows="2" />
                        </div>

                        <div className="form-group file-group">
                            <label><FaImage /> Profile Picture</label>
                            <input type="file" name="profilePic" accept="image/*" onChange={handleChange} />
                            {preview && <div className="preview"><img src={preview} alt="Preview" /></div>}
                        </div>
                    </div>
                </section>

                {/* Emergency Contact */}
                <section>
                    <h2 className="section-title" style={{paddingBottom:"20px"}}> Emergency Contact</h2>
                    <div className="form-grid">
                        {renderInput("Contact Name", <FaUser />, "emergencyName")}
                        {renderInput("Relationship", <FaIdCard />, "emergencyRelation")}
                        {renderInput("Phone", <FaPhone />, "emergencyPhone", "tel")}
                    </div>
                </section>

                {/* Financial */}
                <section>
                    <h2 className="section-title" style={{paddingBottom:"20px"}} > Financial Details</h2>
                    <div className="form-grid">
                        {renderInput("Salary", <FaMoneyBillWave />, "salary", "number")}
                        {renderInput("Tax Details", <FaAddressCard />, "taxDetails")}
                        <div className="form-group">
                            <label htmlFor="bankName" className="form-label">
                                <FaUniversity className="form-icon" />
                                Bank Name
                            </label>
                            <select
                                id="bankName"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="">-- Select Bank --</option>
                                <option value="State Bank of India">State Bank of India</option>
                                <option value="HDFC Bank">HDFC Bank</option>
                                <option value="ICICI Bank">ICICI Bank</option>
                                <option value="Axis Bank">Axis Bank</option>
                                <option value="Punjab National Bank">Punjab National Bank</option>
                                <option value="Bank of Baroda">Bank of Baroda</option>
                                <option value="Canara Bank">Canara Bank</option>
                                <option value="IDBI Bank">IDBI Bank</option>
                                <option value="Union Bank of India">Union Bank of India</option>
                                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                                <option value="Yes Bank">Yes Bank</option>
                                <option value="IndusInd Bank">IndusInd Bank</option>
                                <option value="Indian Bank">Indian Bank</option>
                                <option value="Central Bank of India">Central Bank of India</option>
                                <option value="UCO Bank">UCO Bank</option>
                                <option value="Bank of India">Bank of India</option>
                                <option value="Federal Bank">Federal Bank</option>
                                <option value="RBL Bank">RBL Bank</option>
                                <option value="South Indian Bank">South Indian Bank</option>
                                <option value="Karnataka Bank">Karnataka Bank</option>
                                <option value="Karur Vysya Bank">Karur Vysya Bank</option>
                                <option value="DCB Bank">DCB Bank</option>
                                <option value="Bandhan Bank">Bandhan Bank</option>
                                <option value="Dhanlaxmi Bank">Dhanlaxmi Bank</option>
                                <option value="Jammu and Kashmir Bank">Jammu and Kashmir Bank</option>
                                <option value="City Union Bank">City Union Bank</option>
                                <option value="Tamilnad Mercantile Bank">Tamilnad Mercantile Bank</option>
                                <option value="Lakshmi Vilas Bank">Lakshmi Vilas Bank</option>
                                <option value="Andhra Bank">Andhra Bank</option>
                                <option value="Corporation Bank">Corporation Bank</option>
                                <option value="Syndicate Bank">Syndicate Bank</option>
                                <option value="Oriental Bank of Commerce">Oriental Bank of Commerce</option>
                                <option value="United Bank of India">United Bank of India</option>
                                <option value="Allahabad Bank">Allahabad Bank</option>
                                <option value="Vijaya Bank">Vijaya Bank</option>
                                <option value="Nainital Bank">Nainital Bank</option>
                                <option value="Punjab & Sind Bank">Punjab & Sind Bank</option>
                                <option value="Au Small Finance Bank">Au Small Finance Bank</option>
                                <option value="Equitas Small Finance Bank">Equitas Small Finance Bank</option>
                                <option value="Ujjivan Small Finance Bank">Ujjivan Small Finance Bank</option>
                                <option value="Jana Small Finance Bank">Jana Small Finance Bank</option>
                                <option value="Fincare Small Finance Bank">Fincare Small Finance Bank</option>
                                <option value="North East Small Finance Bank">North East Small Finance Bank</option>
                                <option value="ESAF Small Finance Bank">ESAF Small Finance Bank</option>
                                <option value="Suryoday Small Finance Bank">Suryoday Small Finance Bank</option>
                                <option value="Paytm Payments Bank">Paytm Payments Bank</option>
                                <option value="India Post Payments Bank">India Post Payments Bank</option>
                                <option value="NSDL Payments Bank">NSDL Payments Bank</option>
                            </select>
                        </div>

                        {renderInput("Account Number", <FaIdCard />, "accountNumber")}
                    </div>
                </section>

                {/* History & Qualifications */}
                <section>
                    <h2 className="section-title"style={{paddingBottom:"20px"}}> History & Qualifications</h2>
                    <textarea name="employmentHistory" placeholder="Employment History" onChange={handleChange} />
                    <textarea name="qualifications" placeholder="Qualifications" onChange={handleChange} />
                    <textarea name="certifications" placeholder="Certifications" onChange={handleChange} />
                </section>

                {/* Buttons */}
                <div className="form-buttons">
                    <button type="button" className="btn btn-secondary btn-small" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-small">
                        <i className="fas fa-paper-plane"></i> Submit
                    </button>
                </div>

            </form>
        </div>
    );
}
