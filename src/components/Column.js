// frontend/src/components/Column.js
import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import NewTaskModal from "./NewTaskModal";
import Loader from "./Loader";
import "./Column.css";

const Column = ({
  column,
  tasks,
  userRole = "manager",
  onEditTask,
  onRemoveTask,
  onAddTask,
  theme,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Open modal with simulated loading
  const handleAddClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(true);
    }, 1000);
  };

  // When task is submitted from modal
  const handleModalSubmit = (columnId, taskData) => {
    if (typeof onAddTask === "function") {
      onAddTask(columnId, taskData);
    }
    setShowModal(false);
  };

  return (
    <div className={`column-container ${theme === "dark" ? "dark-mode" : ""}`}>
      <div className="column-header">
        <h3 className="column-title">
          {column.title} <span>({tasks.length})</span>
        </h3>
      </div>

      {userRole === "manager" && (
        <div className="add-task-header">
          <button
            className="custom-add-task-btn"
            onClick={handleAddClick}
            title="Add a new task"
            disabled={isLoading}
          >
            {isLoading ? "Loading…" : "+ Add Task"}
          </button>
        </div>
      )}

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
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
                onRemoveTask={onRemoveTask}
                columnId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isLoading && <Loader />}

      {showModal && (
        <NewTaskModal
          columnId={column.id}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
          theme={theme}
        />
      )}
    </div>
  );
};

export default Column;
