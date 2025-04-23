// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import ChartView from './ChartView';
import Settings from './Settings';
import HelpCenter from './Help';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards'); // default view
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Please log in to view the dashboard</h2>
      </div>
    );
  }

  let content;
  switch (view) {
    case 'time':
      content = <ChartView />;
      break;
    case 'work':
      content = <ChartView />; // replace with your MyWork component
      break;
    case 'boards':
      content = <Board authToken={user.token} userRole={user.role} theme={theme} />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    case 'help':
      content = <HelpCenter />;
      break;
    default:
      content = <Board authToken={user.token} userRole={user.role} theme={theme} />;
  }

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar logout={handleLogout} onSelect={setView} />
      <div className="main-content">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="content-area">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;