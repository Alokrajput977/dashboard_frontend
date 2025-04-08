import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import NewTaskModal from './NewTaskModal';
import './Column.css';

const Column = ({ column, tasks, userRole, onEditTask, onAddTask }) => {
  const [showModal, setShowModal] = useState(false);

  // When the modal submits, pass the new task info up to the Board.
  const handleModalSubmit = (columnId, taskData) => {
    onAddTask(columnId, taskData);
    setShowModal(false);
  };

  return (
    <div className="column-container">
      <h3 className="column-title">
        {column.title} <span>({tasks.length})</span>
      </h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                userRole={userRole}
                onEdit={onEditTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {userRole === 'manager' && (
        <div className="add-task-container">
          <button
            className="add-task-button"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
          {showModal && (
            <NewTaskModal
              columnId={column.id}
              onClose={() => setShowModal(false)}
              onSubmit={handleModalSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Column;
