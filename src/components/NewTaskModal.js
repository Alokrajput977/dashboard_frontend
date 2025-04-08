// NewTaskModal.js
import React, { useState } from 'react';
import './NewTaskModal.css';

const NewTaskModal = ({ columnId, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(columnId, { title, label, priority, dueDate });
    setTitle('');
    setLabel('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </label>
          <label>
            Label:
            <input 
              type="text" 
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </label>
          <label>
            Priority:
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label>
            Due Date:
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Add Task</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
