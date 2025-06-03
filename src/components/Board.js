import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import initialData from "../data.js";
import Column from "./Column";
import "./Board.css";

const Board = ({ authToken, userRole, theme = "light" }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(authToken ? true : false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    if (authToken) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/boards", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchData();
    } else {
      const savedData = localStorage.getItem("boardData");
      if (savedData) {
        setData(JSON.parse(savedData));
      } else {
        setData(initialData);
      }
    }
  }, [authToken, fetchData]);
  useEffect(() => {
    if (!authToken) {
      localStorage.setItem("boardData", JSON.stringify(data));
    }
  }, [data, authToken]);
  const saveBoardData = useCallback(
    async (boardData) => {
      if (authToken) {
        try {
          const response = await fetch("http://localhost:5000/api/boards", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(boardData),
          });
          if (!response.ok) {
            console.error("Failed to save data.");
          }
        } catch (err) {
          console.error("Error saving data:", err);
        }
      }
    },
    [authToken]
  );

  const handleAddTask = async (columnId, taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      dueDate: taskData.dueDate || new Date().toISOString().split("T")[0],
    };

    if (authToken) {
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ task: newTask, columnId }),
        });
        if (response.ok) {
          const createdTask = await response.json();
          setData((prevData) => {
            const newColumns = { ...prevData.columns };
            newColumns[columnId].taskIds.push(createdTask.id);
            const newTasks = {
              ...prevData.tasks,
              [createdTask.id]: createdTask,
            };
            const updatedData = { ...prevData, tasks: newTasks, columns: newColumns };
            saveBoardData(updatedData);
            return updatedData;
          });
        } else {
          console.error("Failed to create task on backend.");
        }
      } catch (err) {
        console.error("Error creating task:", err);
      }
    } else {
      setData((prevData) => {
        const column = prevData.columns[columnId];
        const newTaskIds = [...column.taskIds, newTask.id];
        const newColumn = { ...column, taskIds: newTaskIds };
        const newTasks = { ...prevData.tasks, [newTask.id]: newTask };
        return { ...prevData, tasks: newTasks, columns: { ...prevData.columns, [columnId]: newColumn } };
      });
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    if (userRole === "manager") {
      if (authToken) {
        try {
          const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedTask),
          });
          if (response.ok) {
            setData((prevData) => {
              const updatedData = {
                ...prevData,
                tasks: { ...prevData.tasks, [taskId]: updatedTask },
              };
              saveBoardData(updatedData);
              return updatedData;
            });
          } else {
            console.error("Failed to edit task.");
          }
        } catch (err) {
          console.error("Error editing task:", err);
        }
      } else {
        setData((prevData) => ({
          ...prevData,
          tasks: { ...prevData.tasks, [taskId]: updatedTask },
        }));
      }
    } else {
      alert("Only managers can edit tasks.");
    }
  };
  const handleRemoveTask = async (taskId, columnId) => {
    if (userRole !== "manager") {
      alert("Only managers can remove tasks.");
      return;
    }
    if (authToken) {
      try {
        const response = await fetch(`https://dashboard-frontenddd.onrender.com/api/tasks/${taskId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.ok) {
          setData((prevData) => {
            const newTasks = { ...prevData.tasks };
            delete newTasks[taskId];
            const newColumns = { ...prevData.columns };
            newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
            const updatedData = { ...prevData, tasks: newTasks, columns: newColumns };
            saveBoardData(updatedData);
            return updatedData;
          });
        } else {
          console.error("Failed to delete task.");
        }
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    } else {
      setData((prevData) => {
        const newTasks = { ...prevData.tasks };
        delete newTasks[taskId];
        const newColumns = { ...prevData.columns };
        newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(id => id !== taskId);
        return { ...prevData, tasks: newTasks, columns: newColumns };
      });
    }
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];
    let newData = { ...data, columns: { ...data.columns } };

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      newData.columns[newColumn.id] = newColumn;
    } else {
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

  if (authToken && loading) return <div>Loading board data...</div>;
  if (authToken && error) return <div>Error loading board data: {error}</div>;

  return (
    <div className="board-wrapper">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds
              .map((taskId) => data.tasks[taskId])
              .filter((task) => task);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                userRole={userRole}
                onEditTask={handleEditTask}
                onRemoveTask={handleRemoveTask}
                onAddTask={handleAddTask}
                theme={theme}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
