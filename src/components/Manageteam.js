import React from "react";
import "./EmployeeTable.css";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const employees = [
  {
    id: 1,
    name: "Alice Johnson",
    position: "Software Engineer",
    department: "Development",
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    position: "UI/UX Designer",
    department: "Design",
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    name: "Clara Lee",
    position: "Project Manager",
    department: "Management",
    email: "clara.lee@example.com",
  },
  {
    id: 4,
    name: "Daniel Kim",
    position: "QA Engineer",
    department: "Testing",
    email: "daniel.kim@example.com",
  },
];

const EmployeeTable = () => {
  return (
    <div className="employee-card-container">
      <div className="employee-card-header">
        <FaUserCircle className="header-icon" />
        <h2 className="employee-card-title">Employee Data</h2>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Email</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td className="actions">
                <button className="edit-btn"><FaEdit /></button>
                <button className="delete-btn"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
