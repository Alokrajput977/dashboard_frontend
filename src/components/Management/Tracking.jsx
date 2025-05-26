import React, { useState } from "react";
import "./TaskManagement.css";

const STATUS_OPTIONS = ["To-Do", "In Progress", "Completed", "Blocked"];

const initialTasks = [
    {
        id: 1,
        title: "Design homepage UI",
        status: "To-Do",
        timeLogged: 0,
        effortEstimate: 5,
    }, 
    {
        id: 2,
        title: "Implement authentication",
        status: "In Progress",
        timeLogged: 2,
        effortEstimate: 8,
    },
    {
        id: 3,
        title: "Setup database",
        status: "Blocked",
        timeLogged: 1,
        effortEstimate: 4,
    },
];

export default function TaskManagement() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({
        title: "",
        status: STATUS_OPTIONS[0],
        timeLogged: "",
        effortEstimate: "",
    });

    const calculateProductivity = (timeLogged, effortEstimate) => {
        if (!effortEstimate || effortEstimate === 0) return 0;
        return Math.min(((timeLogged / effortEstimate) * 100).toFixed(0), 100);
    };

    const updateStatus = (id, newStatus) => {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, status: newStatus } : task
            )
        );
    };

    const updateTimeLogged = (id, newTime) => {
        const time = parseFloat(newTime);
        if (isNaN(time) || time < 0) return;
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, timeLogged: time } : task
            )
        );
    };

    const updateEffortEstimate = (id, newEffort) => {
        const effort = parseFloat(newEffort);
        if (isNaN(effort) || effort < 0) return;
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id ? { ...task, effortEstimate: effort } : task
            )
        );
    };

    // Handle Add Task form inputs
    const handleNewTaskChange = (field, value) => {
        setNewTask((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Add new task to list
    const addTask = () => {
        if (!newTask.title.trim()) {
            alert("Task title is required.");
            return;
        }
        const timeLoggedNum = parseFloat(newTask.timeLogged);
        const effortEstimateNum = parseFloat(newTask.effortEstimate);

        if (
            isNaN(timeLoggedNum) ||
            timeLoggedNum < 0 ||
            isNaN(effortEstimateNum) ||
            effortEstimateNum < 0
        ) {
            alert("Please enter valid non-negative numbers for time and effort.");
            return;
        }

        const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        const taskToAdd = {
            id: newId,
            title: newTask.title.trim(),
            status: newTask.status,
            timeLogged: timeLoggedNum,
            effortEstimate: effortEstimateNum,
        };

        setTasks([...tasks, taskToAdd]);
        setNewTask({
            title: "",
            status: STATUS_OPTIONS[0],
            timeLogged: "",
            effortEstimate: "",
        });
    };

    return (
        <div className="container">
            <h2>Task Management - Tracking & Reporting</h2>

            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Time Logged (hrs)</th>
                        <th>Effort Estimate (hrs)</th>
                        <th>Productivity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(({ id, title, status, timeLogged, effortEstimate }) => (
                        <tr key={id}>
                            <td>{title}</td>
                            <td>
                                <select
                                    value={status}
                                    onChange={(e) => updateStatus(id, e.target.value)}
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={timeLogged}
                                    onChange={(e) => updateTimeLogged(id, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={effortEstimate}
                                    onChange={(e) => updateEffortEstimate(id, e.target.value)}
                                />
                            </td>
                            <td>{calculateProductivity(timeLogged, effortEstimate)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="add-task-section">
                <h3 style={{color:"#8b5cf6"}}>Add New Task</h3>

                <div className="form-row">
                    <div>
                        <label>Task Title</label>
                        <input
                            type="text"
                            value={newTask.title}
                            onChange={(e) => handleNewTaskChange("title", e.target.value)}
                            placeholder="Enter task title"
                        />
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={newTask.status}
                            onChange={(e) => handleNewTaskChange("status", e.target.value)}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Time Logged (hrs)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={newTask.timeLogged}
                            onChange={(e) => handleNewTaskChange("timeLogged", e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label>Effort Estimate (hrs)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            value={newTask.effortEstimate}
                            onChange={(e) => handleNewTaskChange("effortEstimate", e.target.value)}
                            placeholder="0"
                        />
                    </div>
                </div>

                <button className="add-task-btn" onClick={addTask}>
                    Add Task
                </button>
            </div>


        </div>
    );
}
