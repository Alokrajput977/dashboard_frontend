// src/components/TaskCard.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './TaskCard.css';

const TaskCard = ({ task, index, removeTask = () => {} }) => {
  // Handler to remove task and prevent drag events from firing
  const handleRemove = (event) => {
    event.stopPropagation(); // Prevent drag start
    removeTask(task.id);
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
          <button 
            className="remove-task-button"
            onMouseDown={(e) => e.stopPropagation()}  // Prevent drag on mouse down
            onClick={handleRemove}
          >
            ✖
          </button>
          <div className="task-label">
            <span>{task.label}</span>
            <span className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
          <h4 className="task-title">{task.title}</h4>
          <p className="task-date">Due Date: {task.dueDate}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
