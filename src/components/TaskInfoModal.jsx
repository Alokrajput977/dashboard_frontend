// frontend/src/components/TaskInfoModal.jsx
import React from 'react';
import { FaFlag, FaTag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import './TaskInfoModal.css';

const TaskInfoModal = ({ task, onClose }) => {
  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2 className="info-modal-title">Task Details</h2>
        <div className="info-modal-body">
          <p>
            <FaFlag className="icon" /> <strong>Title:</strong> {task.title}
          </p>
          <p>
            <FaTag className="icon" /> <strong>Label:</strong> {task.label || '—'}
          </p>
          <p>
            <FaUser className="icon" /> <strong>Assignee:</strong> {task.assignee || '—'}
          </p>
          <p>
            <FaFlag className="icon" /> <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <FaCalendarAlt className="icon" /> <strong>Due Date:</strong>{' '}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
