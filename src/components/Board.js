import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from "../data.js";
import Column from './Column';
import NewTaskModal from './NewTaskModal';
import './Board.css';

const Board = () => {
  // Load board state from localStorage (or fall back to initialData)
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('boardData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Validate columns: remove taskIds that do not exist in tasks
  useEffect(() => {
    let needsUpdate = false;
    const validatedColumns = { ...data.columns };
    Object.keys(validatedColumns).forEach((colId) => {
      const column = validatedColumns[colId];
      const validTaskIds = column.taskIds.filter(taskId => data.tasks[taskId]);
      if (validTaskIds.length !== column.taskIds.length) {
        needsUpdate = true;
        validatedColumns[colId] = { ...column, taskIds: validTaskIds };
      }
    });
    if (needsUpdate) {
      setData(prevData => ({
        ...prevData,
        columns: validatedColumns,
      }));
    }
  }, [data]);

  // Persist board state to localStorage on each change
  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const [modalInfo, setModalInfo] = useState({ isOpen: false, columnId: null });

  const openNewTaskModal = (columnId) => {
    setModalInfo({ isOpen: true, columnId });
  };

  const closeNewTaskModal = () => {
    setModalInfo({ isOpen: false, columnId: null });
  };

  const addNewTask = (columnId, taskDetails) => {
    // Generate a new task id based on the current count
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      title: taskDetails.title,
      label: taskDetails.label || 'General',
      priority: taskDetails.priority || 'Medium',
      dueDate: taskDetails.dueDate || 'No due date',
    };

    const newTasks = { ...data.tasks, [newTaskId]: newTask };
    const column = data.columns[columnId];
    const newTaskIds = [...column.taskIds, newTaskId];
    const newColumn = { ...column, taskIds: newTaskIds };

    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
    });

    closeNewTaskModal();
  };

  const removeTask = (columnId, taskId) => {
    // Remove the task from tasks and from the column's taskIds array
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];
    const column = data.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);
    const newColumn = { ...column, taskIds: newTaskIds };

    setData({
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [columnId]: newColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              openNewTaskModal={openNewTaskModal}
              removeTask={removeTask}
            />
          );
        })}
      </div>
      {modalInfo.isOpen && (
        <NewTaskModal
          columnId={modalInfo.columnId}
          onClose={closeNewTaskModal}
          onSubmit={addNewTask}
        />
      )}
    </DragDropContext>
  );
};

export default Board;
