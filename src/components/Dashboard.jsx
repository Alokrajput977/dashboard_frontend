// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Board from './Board';
import ChartView from './ChartView';
import Settings from './Settings';
import HelpCenter from './Help';
import AddMember from './AddMember';
import Table from "../components/table"
import Loader from './Loader';
import EmployeeTable from "../components/Manageteam"
import EmployeeForm from './Addemployee';
import AttendanceApp from './Attendance';
import PayrollModule from "../components/Payroll"
import PerformanceDashboard from './Management';
import AdminControls from "../components/Admincontrol"
import ShiftScheduling from './ShiftScheduling';
import TaskManager from "../components/Management/Task_Creation"
import AssignmentOwnership from './Management/Assignment';
import TrackingReporting from './Management/Tracking';
import NotificationsPage from "../components/Management/Notifications"
import NotificationsEscalations from "../components/Management/NotificationsEscalations"

import './Dashboard.css';

function MembersPanel() {
  const [visible] = useState(true);

  return (
    <div className="members-panel">

      {visible && <Table />}
    </div>
  );
}

export default function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState('light');
  const [view, setView] = useState('boards');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initial loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleViewChange = (newView) => {
    if (newView === view) return;
    setIsLoading(true);
    setTimeout(() => {
      setView(newView);
      // fade-in content
      setTimeout(() => setIsLoading(false), 500);
    }, 300);
  };

  // If not logged in
  if (!user) {
    return (
      <div className="login-prompt">
        <h2>Please log in to view the dashboard</h2>
      </div>
    );
  }

  // Determine which panel to show
  let content;
  switch (view) {
    case 'time':
    case 'work':
      content = <ChartView />;
      break;
    case 'settings':
      content = <Settings />;
      break;
    case 'help':
      content = <HelpCenter />;
      break;
    case 'add-member':
      content = <AddMember />;
      break;
    case 'manageTeam':
      content = <EmployeeTable />;
      break;
    case 'attendance':
      content = <AttendanceApp />;
      break;
    case 'addEmployee':
      content = <EmployeeForm />;
      break;
        case 'AdminControls':
      content = <AdminControls />;
      break;
        case 'ShiftScheduling':
      content = <ShiftScheduling />;
      break;
    case 'members':
      content = <MembersPanel />;
      break;

    case 'performance':
      content = <PerformanceDashboard />;
      break;
       case 'TaskManager':
      content = <TaskManager />;
      break;
       case 'Assignment':
      content = <AssignmentOwnership />;
      break;
       case 'Tracking':
      content = <TrackingReporting />;
      break;
    case 'payroll':
      content = <PayrollModule />;
      break;
    case 'Notifications':
      content = <NotificationsPage />;
      break;
    case 'NotificationsEscalation':
      content = <NotificationsEscalations />;
      break;
    case 'boards':
    default:
      content = (
        <Board
          authToken={user.token}
          userRole={user.role}
          theme={theme}
        />
      );
      break;
  }

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar
        logout={handleLogout}
        onSelect={handleViewChange}
      />
      <div className="main-content">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onAddMember={() => handleViewChange('members')}
        />
        <div className="content-area">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="fade-in">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
