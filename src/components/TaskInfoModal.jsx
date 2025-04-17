// frontend/src/components/TaskInfoModal.jsx
import React from 'react';
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
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Label:</strong> {task.label}
          </p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>
          <p>
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          {/* You can add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoModal;
