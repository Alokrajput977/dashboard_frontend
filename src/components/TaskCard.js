// frontend/src/components/TaskCard.js
import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import EditTaskModal from './EditTaskModal.jsx';
import TaskInfoModal from './TaskInfoModal.jsx';
import './TaskCard.css';
import { FaTrashAlt, FaEdit, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';

const TaskCard = ({ task, index, userRole, onEdit, onRemoveTask, columnId }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleSaveEdit = (updatedTask) => {
    onEdit(task.id, updatedTask);
    setShowEditModal(false);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // prevent modal from opening
    onRemoveTask(task.id, columnId);
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
            className={`task-card-container ${snapshot.isDragging ? 'dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleCardClick}
          >
            <div className="task-header">
              <div className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </div>
              {userRole === 'manager' && (
                <button className="icon-button" onClick={handleRemove} title="Delete Task">
                  <FaTrashAlt />
                </button>
              )}
            </div>
            <div className="task-content">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-desc">{task.label}</p>
              <p className="task-date">
                <FaCalendarAlt className="calendar-icon" /> {task.dueDate}
              </p>
            </div>
            <div className="task-footer">
              <button className="icon-button info-btn" onClick={handleCardClick}>
                <FaInfoCircle />
              </button>
              {userRole === 'manager' && (
                <button className="icon-button edit-btn" onClick={handleEditClick}>
                  <FaEdit />
                </button>
              )}
            </div>
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
