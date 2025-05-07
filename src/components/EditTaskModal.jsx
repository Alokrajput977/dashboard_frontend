// frontend/src/components/EditTaskModal.js
import React, { useState } from 'react';
import './EditTaskModal.css';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedLabel, setEditedLabel] = useState(task.label);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      label: editedLabel,
      priority: editedPriority,
      dueDate: editedDueDate,
    };
    onSave(updatedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="close-icon" onClick={onClose}>&times;</button>
        </div>
        
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <label>Label</label>
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
            className="input-field"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="input-field"
          />
        </div>
        
        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;