import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

// Import Font Awesome and add icons to the library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBell, faCog, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faBell, faCog, faSignOutAlt, faPlus);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
