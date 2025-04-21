// frontend/src/components/TaskCard.js
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import EditTaskModal from './EditTaskModal.jsx';
import TaskInfoModal from './TaskInfoModal.jsx';
import './TaskCard.css';

const TaskCard = ({ task, index, userRole, onEdit, onRemoveTask, columnId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleSaveEdit = (updatedTask) => {
    onEdit(task.id, updatedTask);
    setShowEditModal(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (typeof onRemoveTask === 'function') {
      onRemoveTask(task.id, columnId);
    } else {
      console.error('onRemoveTask is not a function');
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleCardClick = () => {
    setShowInfoModal(true);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleCardClick}
          >
            <div className="card-header">
              <div className="task-label">
                <span>{task.label}</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              {userRole === 'manager' && (
                <button className="remove-task-btn" onClick={handleRemove} title="Remove this task">
                  &times;
                </button>
              )}
            </div>
            <div className="card-body">
              <h4 className="task-title">{task.title}</h4>
              <p className="task-date">Due Date: {task.dueDate}</p>
            </div>
            {userRole === 'manager' && (
              <button className="edit-btn" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
          {showEditModal && (
            <EditTaskModal
              task={task}
              onClose={() => setShowEditModal(false)}
              onSave={handleSaveEdit}
            />
          )}
          {showInfoModal && (
            <TaskInfoModal
              task={task}
              onClose={() => setShowInfoModal(false)}
            />
          )}
        </>
      )}
    </Draggable>
  );
};

export default TaskCard;