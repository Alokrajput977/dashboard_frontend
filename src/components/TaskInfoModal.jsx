// frontend/src/components/TaskInfoModal.jsx
import React from 'react';
import { FaFlag, FaTag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import './TaskInfoModal.css';

const TaskInfoModal = ({ task, onClose }) => {
  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="info-modal-title">Task Details</h2>
        <div className="info-modal-body">
          <p>
            <FaFlag /> <strong>Title:</strong> {task.title}
          </p>
          <p>
            <FaTag /> <strong>Label:</strong> {task.label || '—'}
          </p>
          <p>
            <FaUser /> <strong>Assignee:</strong> {task.assignee || '—'}
          </p>
          <p>
            <FaFlag /> <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <FaCalendarAlt /> <strong>Due Date:</strong>{' '}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
          </p>
          {/* add more fields here if you like */}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
