// src/data.js
const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TO DO',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'IN PROGRESS',
      taskIds: ['task-3', 'task-4', 'task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'IN REVIEW',
      taskIds: ['task-6'],
    },
    'column-4': {
      id: 'column-4',
      title: 'DONE',
      taskIds: ['task-7', 'task-8'],
    },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Update the Design System',
      label: 'Design System',
      priority: 'High',
      dueDate: '2025-05-31',
    },
    'task-2': {
      id: 'task-2',
      title: 'Optimize color contrast',
      label: 'Daily Art',
      priority: 'Medium',
      dueDate: '2025-06-05',
    },
    'task-3': {
      id: 'task-3',
      title: 'Sketch out wireframes',
      label: 'Daily Art',
      priority: 'Medium',
      dueDate: '2025-07-16',
    },
    'task-4': {
      id: 'task-4',
      title: 'Update prototype links',
      label: 'Weszio.com',
      priority: 'Low',
      dueDate: '2025-09-12',
    },
    'task-5': {
      id: 'task-5',
      title: 'Create custom icons',
      label: 'Design System',
      priority: 'Medium',
      dueDate: '2025-05-31',
    },
    'task-6': {
      id: 'task-6',
      title: 'Map Component',
      label: 'Design System',
      priority: 'Medium',
      dueDate: '2025-05-18',
    },
    'task-7': {
      id: 'task-7',
      title: 'Add micro-interactions',
      label: 'Weszio.com',
      priority: 'Medium',
      dueDate: '2025-04-27',
    },
    'task-8': {
      id: 'task-8',
      title: 'Prepare handoff files',
      label: 'EngageSoft',
      priority: 'High',
      dueDate: '2025-05-13',
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default initialData;
