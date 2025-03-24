import React from 'react';
import Sidebar from './components/Sidebar.js';
import Navbar from './components/Navbar.js';
import Board from './components/Board.js';
// import Navbar2 from './Navbar2.js';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {/* <Navbar2 /> */}
        <Board />
      </div>
    </div>
  );
}

export default App;
