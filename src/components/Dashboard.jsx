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

function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards'); // 'boards', 'time', 'work', 'settings', 'help', or 'add-member'

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
      <Sidebar logout={handleLogout} onSelect={setView} />
      <div className="main-content">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onAddMember={() => setView('add-member')}
        />
        <div className="content-area">
          {content}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
