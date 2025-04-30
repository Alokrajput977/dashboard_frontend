// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import ChartView from './ChartView';
import Settings from './Settings';
import HelpCenter from './Help';
import AddMember from './AddMember';
import Table from "../components/table"
import Loader from './Loader';

import './Dashboard.css';

function MembersPanel() {
  const [visible] = useState(true);

  return (
    <div className="members-panel">
      
      {visible && <Table />}
    </div>
  );
}

export default function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleViewChange = (newView) => {
    if (newView === view) return;
    setIsLoading(true);
    setTimeout(() => {
      setView(newView);
      // fade-in content
      setTimeout(() => setIsLoading(false), 500);
    }, 300);
  };

  // If not logged in
  if (!user) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view the dashboard</h2>
      </div>
    );
  }

  // Determine which panel to show
  let content;
  switch (view) {
    case 'time':
    case 'work':
      content = <ChartView />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    case 'help':
      content = <HelpCenter />;
      break;
    case 'add-member':
      content = <AddMember />;
      break;
    case 'members':
      content = <MembersPanel />;
      break;
    case 'boards':
    default:
      content = (
        <Board
          authToken={user.token}
          userRole={user.role}
          theme={theme}
        />
      );
      break;
  }

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar
        logout={handleLogout}
        onSelect={handleViewChange}
      />
      <div className="main-content">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onAddMember={() => handleViewChange('members')}
        />
        <div className="content-area">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="fade-in">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
