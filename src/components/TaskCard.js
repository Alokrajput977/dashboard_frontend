// frontend/src/components/TaskCard.js
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './TaskCard.css';

const TaskCard = ({ task, index, userRole, onEdit, onRemoveTask, columnId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSaveEdit = () => {
    onEdit(task.id, { ...task, title: editedTitle });
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (typeof onRemoveTask === 'function') {
      onRemoveTask(task.id, columnId);
    } else {
      console.error('onRemoveTask is not a function');
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className="task-edit">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div className="task-view">
              {userRole === 'manager' && (
                <button
                  className="remove-task-btn"
                  onClick={handleRemove}
                  title="Remove this task"
                >
                  X
                </button>
              )}
              <div className="task-label">
                <span>{task.label}</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              <h4 className="task-title">{task.title}</h4>
              <p className="task-date">Due Date: {task.dueDate}</p>
              {userRole === 'manager' && (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  ✎ Edit
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
