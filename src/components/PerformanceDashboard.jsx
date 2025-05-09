import React from 'react';
import './PerformanceDashboard.css';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { FaBullseye, FaStar, FaUsers, FaChartBar, FaArrowRight } from 'react-icons/fa';

const pieData = [
  { name: 'Achieved', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Missed', value: 200 },
];

const COLORS = ['#4ade80', '#facc15', '#f87171'];

const barData = [
  { name: 'Jan', performance: 85 },
  { name: 'Feb', performance: 72 },
  { name: 'Mar', performance: 91 },
  { name: 'Apr', performance: 66 },
  { name: 'May', performance: 78 },
  { name: 'Jun', performance: 90 },
];

const radialData = [
  {
    name: 'Team A', uv: 85, fill: '#8b5cf6',
  },
  {
    name: 'Team B', uv: 65, fill: '#60a5fa',
  },
  {
    name: 'Team C', uv: 50, fill: '#f87171',
  },
];

const PerformanceDashboard = () => {
  return (
    <div className="performance-dashboard">
      <header className="dashboard-header">
        <h1>Performance Management Dashboard</h1>
        <p>Track employee goals, feedback, and appraisals in real-time</p>
      </header>

      <section className="dashboard-cards">
        <div className="card card-goals">
          <FaBullseye className="card-icon" />
          <h2>Goals</h2>
          <p>75% Target Completed</p>
          <button className="card-btn">View Details <FaArrowRight /></button>
        </div>
        <div className="card card-appraisals">
          <FaStar className="card-icon" />
          <h2>Appraisals</h2>
          <p>Next Review: June 15</p>
          <button className="card-btn">Schedule Review <FaArrowRight /></button>
        </div>
        <div className="card card-feedback">
          <FaUsers className="card-icon" />
          <h2>360 Feedback</h2>
          <p>60% Feedback Received</p>
          <button className="card-btn">Give Feedback <FaArrowRight /></button>
        </div>
      </section>

      <section className="dashboard-charts">
        <div className="chart-box">
          <h3>Goal Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Team Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart innerRadius="30%" outerRadius="80%" data={radialData} startAngle={180} endAngle={0}>
              <RadialBar minAngle={15} background clockWise={true} dataKey="uv" />
              <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="dashboard-table">
        <h3>Employee Performance Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Goal Completion</th>
              <th>Last Appraisal</th>
              <th>Feedback Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rahul Mehta</td>
              <td>Developer</td>
              <td>IT</td>
              <td>88%</td>
              <td>March 2025</td>
              <td>4.2 / 5</td>
            </tr>
            <tr>
              <td>Anita Sharma</td>
              <td>HR Manager</td>
              <td>HR</td>
              <td>75%</td>
              <td>Feb 2025</td>
              <td>4.5 / 5</td>
            </tr>
            <tr>
              <td>Vikram Singh</td>
              <td>Team Lead</td>
              <td>Operations</td>
              <td>93%</td>
              <td>April 2025</td>
              <td>4.7 / 5</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PerformanceDashboard;
