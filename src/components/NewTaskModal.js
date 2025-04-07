// src/components/NewTaskModal.js
import React, { useState } from 'react';
import './NewTaskModal.css';

function NewTaskModal({ columnId, onClose, onSubmit, theme }) {
  const [title, setTitle]     = useState('');
  const [label, setLabel]     = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(columnId, { title, label, priority, dueDate });
    onClose();
  };

  return (
    <div className="modal-overlay">
      {/* add theme as a class here if you prefer class-based theming */}
      <div className="modal-content">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="Enter label (e.g., Design System)"
            />
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-button">
              Add Task
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTaskModal;
