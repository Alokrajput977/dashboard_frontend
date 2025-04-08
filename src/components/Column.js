import React, { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import NewTaskModal from './NewTaskModal';
import './Column.css';

const Column = ({ column, tasks, userRole = 'manager', onEditTask, onAddTask }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalSubmit = (columnId, taskData) => {
    onAddTask(columnId, taskData);
    setShowModal(false);
  };

  return (
    <div className="column-container">
      <div className="column-header">
        <h3 className="column-title">
          {column.title} <span>({tasks.length})</span>
        </h3>

        {/* Show the "Add Task" button if user is manager */}
        {userRole === 'manager' && (
          <button
            className="custom-add-task-btn"
            onClick={() => setShowModal(true)}
            title="Add a new task to this column"
          >
            <span className="plus-icon">＋</span> Add Task
          </button>
        )}
      </div>

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

      {/* Optional: another Add button at the bottom */}
      {userRole === 'manager' && (
        <div className="add-task-footer">
        </div>
      )}

      {/* Show modal if triggered */}
      {showModal && (
        <NewTaskModal
          columnId={column.id}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Column;
