import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Board from './components/Board';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <div className="content-area">
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
