import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import initialData from '../data.js';
import Column from './Column';
import './Board.css';

const Board = ({ authToken, userRole }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(authToken ? true : false);
  const [error, setError] = useState(null);

  // For manager task creation (only managers can create tasks)
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskColumnId, setNewTaskColumnId] = useState('');

  // Fetch board data from the backend when authToken exists
  const fetchData = useCallback(async () => {
    if (authToken) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/boards', {
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchData();
    } else {
      // For local usage, load board from localStorage if available
      const savedData = localStorage.getItem('boardData');
      if (savedData) {
        setData(JSON.parse(savedData));
      } else {
        setData(initialData);
      }
    }
  }, [authToken, fetchData]);

  // Persist local board state when not authenticated
  useEffect(() => {
    if (!authToken) {
      localStorage.setItem('boardData', JSON.stringify(data));
    }
  }, [data, authToken]);

  // Save board data to API (if authenticated)
  const saveBoardData = useCallback(async (boardData) => {
    if (authToken) {
      try {
        const response = await fetch('http://localhost:5000/api/boards', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(boardData),
        });
        if (!response.ok) {
          console.error('Failed to save data.');
        }
      } catch (err) {
        console.error('Error saving data:', err);
      }
    }
  }, [authToken]);

  // Handler for creating a new task (only for managers)
  const handleCreateTask = async () => {
    if (userRole === 'manager' && newTaskTitle && newTaskColumnId) {
      const newTask = {
        id: `task-${Date.now()}`, // unique ID based on timestamp
        label: 'New',
        title: newTaskTitle,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'Medium',
      };

      if (authToken) {
        // Create task in backend
        try {
          const response = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({ task: newTask, columnId: newTaskColumnId }),
          });
          if (response.ok) {
            const createdTask = await response.json();
            setData(prevData => {
              const newColumns = { ...prevData.columns };
              newColumns[newTaskColumnId].taskIds = [
                ...newColumns[newTaskColumnId].taskIds,
                createdTask.id,
              ];
              const newTasks = { ...prevData.tasks, [createdTask.id]: createdTask };
              const newBoard = { ...prevData, tasks: newTasks, columns: newColumns };
              return newBoard;
            });
            setIsCreatingTask(false);
            setNewTaskTitle('');
            setNewTaskColumnId('');
          } else {
            console.error('Failed to create task.');
          }
        } catch (err) {
          console.error('Error creating task:', err);
        }
      } else {
        // Local creation
        const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
        const newTaskLocal = { ...newTask, id: newTaskId };
        setData(prevData => {
          const column = prevData.columns[newTaskColumnId];
          const newTaskIds = [...column.taskIds, newTaskId];
          const newColumn = { ...column, taskIds: newTaskIds };
          const newTasks = { ...prevData.tasks, [newTaskId]: newTaskLocal };
          return {
            ...prevData,
            tasks: newTasks,
            columns: { ...prevData.columns, [newTaskColumnId]: newColumn },
          };
        });
        setIsCreatingTask(false);
        setNewTaskTitle('');
        setNewTaskColumnId('');
      }
    } else if (userRole !== 'manager') {
      alert('Only managers can create tasks.');
    } else {
      alert('Please fill in task title and select a column.');
    }
  };

  // Handler for editing a task (only available to managers)
  const handleEditTask = async (taskId, updatedTask) => {
    if (userRole === 'manager') {
      if (authToken) {
        try {
          const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedTask),
          });
          if (response.ok) {
            setData(prevData => ({
              ...prevData,
              tasks: { ...prevData.tasks, [taskId]: updatedTask },
            }));
          } else {
            console.error('Failed to edit task.');
          }
        } catch (err) {
          console.error('Error editing task:', err);
        }
      } else {
        // Local update
        setData(prevData => ({
          ...prevData,
          tasks: { ...prevData.tasks, [taskId]: updatedTask },
        }));
      }
    } else {
      alert('Only managers can edit tasks.');
    }
  };

  // Handler for removing a task (by ID) from the board
  const handleRemoveTask = (taskId, columnId) => {
    if (userRole !== 'manager') {
      alert('Only managers can remove tasks.');
      return;
    }

    setData(prevData => {
      const newTasks = { ...prevData.tasks };
      delete newTasks[taskId];

      const newColumns = { ...prevData.columns };
      const updatedTaskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
      newColumns[columnId] = { ...newColumns[columnId], taskIds: updatedTaskIds };

      const newBoard = {
        ...prevData,
        tasks: newTasks,
        columns: newColumns,
      };

      if (authToken) {
        saveBoardData(newBoard);
      }
      return newBoard;
    });
  };

  // Drag and drop handler
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
    const endColumn = data.columns[destination.droppableId];

    const newData = { ...data, columns: { ...data.columns } };

    if (startColumn === endColumn) {
      // move within same column
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      newData.columns[newColumn.id] = newColumn;
    } else {
      // move to different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = { ...startColumn, taskIds: startTaskIds };

      const endTaskIds = Array.from(endColumn.taskIds);
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = { ...endColumn, taskIds: endTaskIds };

      newData.columns[newStartColumn.id] = newStartColumn;
      newData.columns[newEndColumn.id] = newEndColumn;
    }

    setData(newData);
    if (authToken) {
      saveBoardData(newData);
    }
  };

  // Render loading/error if in authenticated mode
  if (authToken && loading) return <div>Loading board data...</div>;
  if (authToken && error) return <div>Error loading board data: {error}</div>;

  return (
    <div className="board-wrapper">
      {userRole === 'manager' && (
        <div className="manager-controls">
          <button
            onClick={() => setIsCreatingTask(true)}
            className="create-task-button"
          >
            + Create New Task
          </button>
          {isCreatingTask && (
            <div className="create-task-modal">
              <h3>Create New Task</h3>
              <input
                type="text"
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <select
                value={newTaskColumnId}
                onChange={(e) => setNewTaskColumnId(e.target.value)}
              >
                <option value="">Select Column</option>
                {data.columnOrder.map((columnId) => (
                  <option key={columnId} value={columnId}>
                    {data.columns[columnId].title}
                  </option>
                ))}
              </select>
              <button onClick={handleCreateTask}>Create</button>
              <button onClick={() => setIsCreatingTask(false)}>Cancel</button>
            </div>
          )}
        </div>
      )}

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
                userRole={userRole}
                onEditTask={handleEditTask}
                onRemoveTask={handleRemoveTask}  // pass down the remover
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
