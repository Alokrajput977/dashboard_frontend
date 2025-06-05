import React, { useState, useEffect } from 'react';
import './EditTaskModal.css';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedLabel, setEditedLabel] = useState(task.label);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedAssignee, setEditedAssignee] = useState(task.assignee || '');

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingUsers(false));
  }, []);

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: editedTitle,
      label: editedLabel,
      priority: editedPriority,
      dueDate: editedDueDate,
      assignee: editedAssignee,
    };
    onSave(updatedTask);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <div className="form-group">
          <label><i className="fas fa-heading"></i> Title</label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-tags"></i> Label</label>
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-flag"></i> Priority</label>
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
          <label><i className="fas fa-calendar-alt"></i> Due Date</label>
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label><i className="fas fa-user"></i> Assign To</label>
          <select
            value={editedAssignee}
            onChange={(e) => setEditedAssignee(e.target.value)}
            className="input-field"
          >
            <option value="">-- Select Assignee --</option>
            {loadingUsers ? (
              <option disabled>Loading users...</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username} ({user.role})
                </option>
              ))
            )}
          </select>
        </div>

        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>
            <i className="fas fa-times-circle"></i> Cancel
          </button>
          <button className="btn primary" onClick={handleSave}>
            <i className="fas fa-save"></i> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
