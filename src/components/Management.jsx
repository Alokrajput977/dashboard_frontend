import React, { useEffect, useState } from "react";
import "./PerformanceDashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { FaBullseye, FaStar, FaComments } from "react-icons/fa";

const pieData = [
  { name: "Exceeded", value: 45 },
  { name: "Met", value: 35 },
  { name: "Below", value: 20 },
];

const COLORS = ["#34d399", "#60a5fa", "#f87171"];

const barData = [
  { name: "Q1", score: 75 },
  { name: "Q2", score: 85 },
  { name: "Q3", score: 65 },
  { name: "Q4", score: 90 },
];

const radialData = [{ name: "Engagement", value: 82, fill: "#8b5cf6" }];

const PerformanceDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="performance-dashboard">
      <h2 className="title">Performance Management</h2>

      <div className="cards">
        <div className="card">
          <FaBullseye className="icon" />
          <h3>Goals</h3>
          <p>12 Active</p>
        </div>
        <div className="card">
          <FaStar className="icon" />
          <h3>Appraisals</h3>
          <p>8 Completed</p>
        </div>
        <div className="card">
          <FaComments className="icon" />
          <h3>Feedback</h3>
          <p>24 Received</p>
        </div>
        <div className="card">
          <FaStar className="icon" />
          <div>
            <h4>Avg. Rating</h4>
            <p>4.3</p>
          </div>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Performance Distribution</h3>
          <PieChart width={280} height={280}>
            <Pie data={pieData} dataKey="value" outerRadius={110} label>
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="chart-container">
          <h3>Appraisal Scores</h3>
          <BarChart width={300} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
          </BarChart>
        </div>

        <div className="chart-container radial">
          <h3>360° Engagement</h3>
          <RadialBarChart
            width={250}
            height={250}
            innerRadius="70%"
            outerRadius="100%"
            data={radialData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="value" />
          </RadialBarChart>
          <div className="radial-text">
            <span>82%</span>
          </div>
        </div>
      </div>

      <div className="users-section">
        <h2 className="table-heading">All Users</h2>
        {loading ? (
          <p className="table-empty">Loading users…</p>
        ) : users.length === 0 ? (
          <p className="table-empty">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Created At</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullName}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="capitalize">{u.role}</td>
                    <td>{u.department}</td>
                    <td>
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <span
                        className={`status ${
                          u.role === "manager" ? "active" : "pending"
                        }`}
                      >
                        {u.role === "manager" ? "Active" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
