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
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { FaBullseye, FaStar, FaComments } from "react-icons/fa";

const pieData = [
  { name: "Exceeded", value: 45 },
  { name: "Met", value: 35 },
  { name: "Below", value: 20 },
];

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

const barData = [
  { name: "Q1", score: 75 },
  { name: "Q2", score: 85 },
  { name: "Q3", score: 65 },
  { name: "Q4", score: 90 },
];

const radialData = [{ name: "Engagement", value: 82, fill: "#8b5cf6" }];

const lineData = [
  { month: "Jan", improvement: 60 },
  { month: "Feb", improvement: 68 },
  { month: "Mar", improvement: 75 },
  { month: "Apr", improvement: 78 },
  { month: "May", improvement: 82 },
];

const areaData = [
  { month: "Jan", hours: 12 },
  { month: "Feb", hours: 18 },
  { month: "Mar", hours: 24 },
  { month: "Apr", hours: 30 },
  { month: "May", hours: 36 },
];

// (import section same as before)

const PerformanceDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="performance-dashboard">
      <h2 className="title"> Performance Management</h2>

      {/* Cards */}
      <div className="cards">
        <div className="card">
          <FaBullseye className="icon" />
          <h3>Goals</h3>
          <p>🎯 12 Active</p>
        </div>
        <div className="card">
          <FaStar className="icon" />
          <h3>Appraisals</h3>
          <p>✅ 8 Completed</p>
        </div>
        <div className="card">
          <FaComments className="icon" />
          <h3>Feedback</h3>
          <p>💬 24 Received</p>
        </div>
        <div className="card">
          <FaStar className="icon" />
          <h3>Rating</h3>
          <p>⭐ 4.3 Avg</p>
        </div>
      </div>

      {/* First row of charts */}
      <div className="charts-row">
        <div className="chart-container">
          <h3>Performance Distribution</h3>
          <PieChart width={250} height={250}>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="chart-container">
          <h3>Appraisal Scores</h3>
          <BarChart width={250} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
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
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
          </RadialBarChart>
          <div className="radial-text">82%</div>
        </div>
      </div>

      {/* Second row of charts */}
      <div className="charts-row">
        <div className="chart-container">
          <h3>Employee Growth Trend</h3>
          <LineChart width={250} height={250} data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="improvement" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </div>

        <div className="chart-container">
          <h3>Employee Decline Trend</h3>
          <LineChart width={250} height={250} data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="improvement" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </div>

        <div className="chart-container">
          <h3>Training Hours</h3>
          <AreaChart width={250} height={250} data={areaData}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorHours)"
            />
          </AreaChart>
        </div>
      </div>

      {/* User Table */}
      <div className="users-section">
        <h2 className="table-heading">📋 All Users</h2>
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
                      <span className={`status ${u.role === "manager" ? "active" : "pending"}`}>
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
