import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import './Column.css';

const Column = ({ column, tasks, openNewTaskModal, removeTask }) => {
  return (
    <div className="column-container">
      <h3 className="column-title">
        {column.title} <span>({tasks.length})</span>
      </h3>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${
              snapshot.isDraggingOver ? 'dragging-over' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Attractive Add Task Button with Unicode plus sign */}
      <button
        className="add-task-button"
        onClick={() => openNewTaskModal(column.id)}
      >
        ➕ Add Task
      </button>
    </div>
  );
};

export default Column;
