// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import './Dashboard.css'; 

function Dashboard({ user }) {
  // Theme management (from your old App file)
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // If user is not available, display a message
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Please log in to view the dashboard</h2>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar theme={theme} />
      <div className="main-content">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="content-area">
          <Board authToken={user.token} userRole={user.role} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
