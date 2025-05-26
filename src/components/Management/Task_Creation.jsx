// File: src/components/TaskManager.jsx
import React, { useState } from 'react';
import './Task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTasks,
    faFolderOpen,
    faCalendarAlt,
    faBullseye,
    faPuzzlePiece,
    faFlagCheckered,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';


const TaskManager = () => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState('');
    const [taskData, setTaskData] = useState({
        title: '',
        deadline: '',
        objective: '',
        dependencies: [],
        subtasks: [''],
        milestone: ''
    });

    const handleProjectAdd = () => {
        if (!currentProject.trim()) return;
        setProjects([...projects, { name: currentProject.trim(), tasks: [] }]);
        setCurrentProject('');
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubtaskChange = (idx, value) => {
        const updatedSubtasks = [...taskData.subtasks];
        updatedSubtasks[idx] = value;
        setTaskData({ ...taskData, subtasks: updatedSubtasks });
    };

    const addSubtaskField = () => {
        setTaskData({ ...taskData, subtasks: [...taskData.subtasks, ''] });
    };

    const handleAddTask = projectIndex => {
        const updatedProjects = [...projects];
        updatedProjects[projectIndex].tasks.push({ ...taskData });
        setProjects(updatedProjects);
        setTaskData({
            title: '',
            deadline: '',
            objective: '',
            dependencies: [],
            subtasks: [''],
            milestone: ''
        });
    };

    return (
        <div className="task-manager">
            <h1 className="task-title" style={{marginBlock:'20px'}}>
                <FontAwesomeIcon icon={faTasks} /> Task Creation & Structuring
            </h1>
            <div className="project-creator">
                <input
                    type="text"
                    placeholder="Enter New Project Name"
                    value={currentProject}
                    onChange={e => setCurrentProject(e.target.value)}
                />
                <button onClick={handleProjectAdd}>+ Add Project</button>
            </div>

            {projects.map((project, pIdx) => (
                <div key={pIdx} className="project-block">
                    <h2 className="project-title">
                        <FontAwesomeIcon icon={faFolderOpen} /> {project.name}
                    </h2>
                    <div className="task-form">
                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={taskData.title}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            name="deadline"
                            value={taskData.deadline}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="objective"
                            placeholder="Task Objective"
                            value={taskData.objective}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="dependencies"
                            placeholder="Dependencies (comma separated)"
                            value={taskData.dependencies.join(',')}
                            onChange={e => setTaskData({ ...taskData, dependencies: e.target.value.split(',') })}
                        />
                        <div className="subtasks">
                            <label>Subtasks</label>
                            {taskData.subtasks.map((subtask, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    placeholder={`Subtask ${idx + 1}`}
                                    value={subtask}
                                    onChange={e => handleSubtaskChange(idx, e.target.value)}
                                />
                            ))}
                            <button type="button" className="add-subtask-btn" onClick={addSubtaskField}>+ Add Subtask</button>
                        </div>
                        <input
                            type="date"
                            name="milestone"
                            value={taskData.milestone}
                            onChange={handleChange}
                        />
                        <button className="add-task-btn" onClick={() => handleAddTask(pIdx)}>➕ Create Task</button>
                    </div>

                    <ul className="task-list">
                        {project.tasks.map((task, tIdx) => (
                            <li key={tIdx} className="task-card">
                                <div className="task-header">
                                    <h3 className="task-title">{task.title}</h3>
                                    <span className="milestone-badge">
                                        <FontAwesomeIcon icon={faFlagCheckered} /> {task.milestone}
                                    </span>
                                </div>

                                <div className="task-details">
                                    <p><FontAwesomeIcon icon={faCalendarAlt} className="icon" /> <strong>Deadline:</strong> {task.deadline}</p>
                                    <p><FontAwesomeIcon icon={faBullseye} className="icon" /> <strong>Objective:</strong> {task.objective}</p>
                                    <p><FontAwesomeIcon icon={faPuzzlePiece} className="icon" /> <strong>Dependencies:</strong> {task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None'}</p>
                                </div>

                                <div className="subtasks-section">
                                    <p className="subtasks-title"><strong>📋 Subtasks:</strong></p>
                                    <ul className="subtask-list">
                                        {task.subtasks.map((sub, sIdx) => (
                                            <li key={sIdx}>
                                                <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
                                                <span>{sub}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>


                </div>
            ))}
        </div>
    );
};

export default TaskManager;