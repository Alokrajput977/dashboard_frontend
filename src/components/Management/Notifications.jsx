// NotificationsPage.jsx
import React from "react";
import "./NotificationsPage.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { FaEnvelope, FaBell, FaExclamationTriangle } from "react-icons/fa";

// Pie chart data
const data1 = [
  { name: "Completed", value: 60 },
  { name: "Pending", value: 30 },
  { name: "Overdue", value: 10 },
];

const data2 = [
  { name: "High Priority", value: 40 },
  { name: "Medium Priority", value: 35 },
  { name: "Low Priority", value: 25 },
];

// Bar chart data
const taskStatusData = [
  { name: "Completed", value: 60 },
 
  { name: "Pending", value: 30 },
  { name: "Pending", value: 30 },
   { name: "Completed", value: 60 },
  { name: "Overdue", value: 70 },
];

const notificationTypesData = [
  { name: "Email", value: 50 },
  { name: "SMS", value: 30 },
  { name: "Push", value: 20 },
  { name: "Push", value: 70 },
  { name: "Push", value: 10 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

const NotificationsPage = () => {
  return (
    <div className="notifications-container">
      <h2 className="title">Notifications & Escalations</h2>

      {/* Pie Charts */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Task Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data1}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data1.map((entry, index) => (
                  <Cell key={`cell-1-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data2}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data2.map((entry, index) => (
                  <Cell key={`cell-2-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Charts */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Task Status (Bar)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Notification Types</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={notificationTypesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="alerts-section">
        <div className="alert-card">
          <FaEnvelope className="icon" />
          <h4>Email Alerts</h4>
          <p>Notifications for due dates, changes, and delays.</p>
        </div>
        <div className="alert-card">
          <FaBell className="icon" />
          <h4>Escalation Alerts</h4>
          <p>Escalation by criticality and role when tasks are overdue.</p>
        </div>
        <div className="alert-card">
          <FaExclamationTriangle className="icon" />
          <h4>Critical Monitoring</h4>
          <p>Track critical and high-priority task status efficiently.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <button className="btn">Configure Escalation Matrix</button>
        <button className="btn btn-secondary">Email Notification Settings</button>
      </div>
    </div>
  );
};

export default NotificationsPage;
