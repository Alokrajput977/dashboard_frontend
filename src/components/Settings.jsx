import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCog,
  faChevronDown,
  faFont,
  faTextWidth,
  faListOl,
  faParagraph,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import './Settings.css';

const autoSaveOptions = [
  { value: 'off', label: 'Off' },
  { value: 'afterDelay', label: 'After Delay' },
  { value: 'onFocusChange', label: 'On Focus Change' },
  { value: 'onWindowChange', label: 'On Window Change' }
];

const wordWrapOptions = [
  { value: 'off', label: 'Off' },
  { value: 'on', label: 'On' },
  { value: 'wordWrapColumn', label: 'At Column' },
  { value: 'bounded', label: 'Bounded' }
];

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [autoSave, setAutoSave] = useState('afterDelay');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Consolas, Courier New, monospace');
  const [tabSize, setTabSize] = useState(4);
  const [wordWrap, setWordWrap] = useState('off');
  const [lineHeight, setLineHeight] = useState(1.5);
  const [themeColor, setThemeColor] = useState('#8b5cf6');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
    <div className="settings-container">
      <h2 className=''><FontAwesomeIcon icon={faCog} /> Settings</h2>
      <form onSubmit={handleSubmit}>

        {/* General Section */}
        <div className="settings-section">
          <div className="section-title">General</div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faBell} />
              <span>Email Notifications</span>
            </div>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        {/* Editor Section */}
        <div className="settings-section">
          <div className="section-title">Editor</div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faClock} />
              <span>Auto Save</span>
            </div>
            <div className="select-wrapper">
              <select value={autoSave} onChange={(e) => setAutoSave(e.target.value)}>
                {autoSaveOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon className="chevron" icon={faChevronDown} />
            </div>
          </div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faFont} />
              <span>Font Size</span>
            </div>
            <input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(+e.target.value)}
            />
          </div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faTextWidth} />
              <span>Font Family</span>
            </div>
            <input
              type="text"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            />
          </div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faListOl} />
              <span>Tab Size</span>
            </div>
            <input
              type="number"
              min="1"
              max="8"
              value={tabSize}
              onChange={(e) => setTabSize(+e.target.value)}
            />
          </div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faParagraph} />
              <span>Word Wrap</span>
            </div>
            <div className="select-wrapper">
              <select value={wordWrap} onChange={(e) => setWordWrap(e.target.value)}>
                {wordWrapOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon className="chevron" icon={faChevronDown} />
            </div>
          </div>

          {/* New Inputs */}
          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faTextWidth} />
              <span>Line Height</span>
            </div>
            <input
              type="number"
              step="0.1"
              min="1.0"
              max="2.0"
              value={lineHeight}
              onChange={(e) => setLineHeight(+e.target.value)}
            />
          </div>

          <div className="settings-item">
            <div className="item-info">
              <FontAwesomeIcon icon={faTextWidth} />
              <span>Theme Color</span>
            </div>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
            />
          </div>
        </div>

        <button className="save-btn" type="submit">Save Settings</button>
      </form>
    </div>
  );
}
