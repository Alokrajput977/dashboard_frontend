import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import ChartView from './ChartView';
import Settings from './Settings';
import HelpCenter from './Help';
import AddMember from './AddMember';
import './Dashboard.css';

// Simple loader spinner component
function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner" />
    </div>
  );
}

function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards'); // current view key
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // Wrap view changes to show loader + transition
  const handleViewChange = (newView) => {
    if (newView === view) return;
    setIsLoading(true);
    // 1 second loader, then switch view
    setTimeout(() => {
      setView(newView);
      // give another second for content fade-in
      setTimeout(() => setIsLoading(false), 800);
    }, 1000);
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
      content = <ChartView />; // <MyWork /> when ready
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
    case 'boards':
    default:
      content = <Board authToken={user.token} userRole={user.role} theme={theme} />;
      break;
  }

  return (
    <div className={`app-container ${theme}`}>      
      <Sidebar logout={handleLogout} onSelect={handleViewChange} />
      <div className="main-content">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onAddMember={() => handleViewChange('add-member')}
        />
        <div className="content-area">
          {isLoading ? <Loader /> : <div className="fade-in">{content}</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;