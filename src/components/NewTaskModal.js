// frontend/src/components/NewTaskModal.jsx
import React, { useState } from 'react';
import {
  faUser,
  faTag,
  faFlag,
  faCalendarAlt,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    // Reset form
    setTitle('');
    setLabel('');
    setPriority('Medium');
    setDueDate('');
    setAssignee('');
    onClose();
  };

  return (
    <div className={`modal-overlay ${theme}`} onClick={onClose}>
      <div
        className={`modal-content animated ${theme}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group icon-input">
            <label htmlFor="title">
              <FontAwesomeIcon icon={faFlag} /> Title
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
              <FontAwesomeIcon icon={faTag} /> Label
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
              <FontAwesomeIcon icon={faUser} /> Assign To
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
              <FontAwesomeIcon icon={faFlag} /> Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group icon-input">
            <label htmlFor="dueDate">
              <FontAwesomeIcon icon={faCalendarAlt} /> Due Date
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
              <FontAwesomeIcon icon={faCheckCircle} /> Add Task
            </button>
            <button type="button" className="btn secondary" onClick={onClose}>
              <FontAwesomeIcon icon={faTimesCircle} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
