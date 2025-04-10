// frontend/src/components/NewTaskModal.js
import React, { useState } from 'react';
import './NewTaskModal.css';

const NewTaskModal = ({ columnId, onClose, onSubmit, theme = 'light' }) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, label, priority, dueDate };
    onSubmit(columnId, taskData);
    setTitle('');
    setLabel('');
    setPriority('Medium');
    setDueDate('');
    onClose();
  };

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className={`modal-content animated ${theme}`}>
        <h2 className="modal-title">📝 Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              placeholder="Optional tag or category"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">🔥 High</option>
              <option value="Medium">⚖️ Medium</option>
              <option value="Low">🌱 Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
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
