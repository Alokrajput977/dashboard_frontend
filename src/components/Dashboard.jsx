
// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import ChartView from './ChartView';
import Settings from './Settings';
import HelpCenter from './Help';
import AddMember from './AddMember';
import Loader from './Loader';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards');
  // Start with loader visible on initial mount
  const [isLoading, setIsLoading] = useState(true);

  // Hide loader after 1 second on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme
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

  const handleViewChange = (newView) => {
    if (newView === view) return;
    setIsLoading(true);
    setTimeout(() => {
      setView(newView);
      setTimeout(() => setIsLoading(false), 800);
    }, 800);
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
    case 'time':      content = <ChartView />;      break;
    case 'work':      content = <ChartView />;      break;
    case 'settings':  content = <Settings />;     break;
    case 'help':      content = <HelpCenter />;   break;
    case 'add-member':content = <AddMember />;    break;
    case 'boards':
    default:          content = <Board authToken={user.token} userRole={user.role} theme={theme} />;
  }

  return (
    <div className={`app-container ${theme}`}>      
      <Sidebar logout={handleLogout} onSelect={handleViewChange} />
      <div className="main-content">
        <Navbar theme={theme} toggleTheme={toggleTheme} onAddMember={() => handleViewChange('add-member')} />
        <div className="content-area">
          {isLoading ? <Loader /> : <div className="fade-in">{content}</div>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;