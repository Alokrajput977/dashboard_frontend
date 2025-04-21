// components/Settings.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faEnvelope,
  faListUl
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSubmit = e => {
    e.preventDefault();
    // you can lift this up or call an API...
    alert('Settings saved!');
  };

  const toggleLocalDark = () => {
    setDarkMode(d => !d);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <FontAwesomeIcon icon={faMoon} />
          <span>Dark Mode</span>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleLocalDark}
            />
            <div className="toggle-switch" />
          </label>
        </div>

        <div className="form-group">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Email Notifications</span>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={e => setEmailNotifications(e.target.checked)}
            />
            <div className="toggle-switch" />
          </label>
        </div>

        <div className="form-group">
          <FontAwesomeIcon icon={faListUl} />
          <span>Items per Page</span>
          <input
            type="number"
            min="5"
            max="50"
            value={itemsPerPage}
            onChange={e => setItemsPerPage(+e.target.value)}
          />
        </div>

        <button className="save-btn" type="submit">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
