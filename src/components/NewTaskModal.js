// frontend/src/components/NewTaskModal.js
import React, { useState } from 'react';
import { FaUser, FaTag, FaFlag, FaCalendarAlt } from 'react-icons/fa';
import './NewTaskModal.css';

const NewTaskModal = ({ columnId, onClose, onSubmit, theme = 'light' }) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, label, priority, dueDate, assignee };
    onSubmit(columnId, taskData);
    setTitle('');
    setLabel('');
    setPriority('Medium');
    setDueDate('');
    setAssignee('');
    onClose();
  };

  return (
    <div className={`modal-overlay ${theme}`}>  
      <div className={`modal-content animated ${theme}`}>  
        <h2 className="modal-title">
          <FaFlag className="title-icon" />
          Add New Task
        </h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group icon-input">
            <label htmlFor="title">
              <FaFlag /> Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group icon-input">
            <label htmlFor="label">
              <FaTag /> Label
            </label>
            <input
              id="label"
              type="text"
              placeholder="Optional tag or category"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div className="form-group icon-input">
            <label htmlFor="assignee">
              <FaUser /> Assign To
            </label>
            <input
              id="assignee"
              type="text"
              placeholder="Enter assignee name"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>

          <div className="form-group icon-input">
            <label htmlFor="priority">
              <FaFlag /> Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔥 High</option>
              <option value="Medium">⚖️ Medium</option>
              <option value="Low">🌱 Low</option>
            </select>
          </div>

          <div className="form-group icon-input">
            <label htmlFor="dueDate">
              <FaCalendarAlt /> Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn primary">
              ✅ Add Task
            </button>
            <button type="button" className="btn secondary" onClick={onClose}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;