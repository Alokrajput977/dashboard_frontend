// src/components/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Board from "./Board";
import ChartView from "./ChartView";
import Settings from "./Settings";
import HelpCenter from "./Help";
import AddMember from "./AddMember";
import Table from "./table";
import Loader from "./Loader";
import EmployeeTable from "./Manageteam";
import EmployeeForm from "./Addemployee";
import AttendanceApp from "./Attendance";
import PayrollModule from "./Payroll";
import PerformanceDashboard from "./Management";
import AdminControls from "./Admincontrol";
import ShiftScheduling from "./ShiftScheduling";
import TaskManager from "./Management/Task_Creation";
import AssignmentOwnership from "./Management/Assignment";
import TrackingReporting from "./Management/Tracking";
import NotificationsPage from "./Management/Notifications";
import NotificationsEscalations from "./Management/NotificationsEscalations";
import ProjectManagement from "./project_management/project-lifecycle";
import FinancialTracking from "./project_management/Financial";
import TeamResourceIntegration from "./project_management/Resource_Integration";
import ClientManagement from "./Client Management/Client_Onboarding";
import ProjectRevenue from "./Client Management/projectREV";
import AdminControlss from "./Client Management/Admin_Controls";
import SalesLifecycle from "./Sales_Management/Lifecycle";
import DeliveryTracking from "./Sales_Management/Delivery";
import SalesLineItems from "./Sales_Management/SalesItoms";
import ServiceCatalog from "./Servise/catalog";
import CameraInputPage from "./camera/cameraview";
import CameraDashboard from "./camera/cameradashbaord";
import ServiceInventory from "../components/Servise/Inventory"
import ChatApp from "../components/Message/chatapp"

import "./Dashboard.css";

function MembersPanel() {
  return (
    <div className="members-panel">
      <Table />
    </div>
  );
}

export default function Dashboard({ user, setUser }) {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { "*": viewParam } = useParams();
  const view = viewParam || "boards";

  useEffect(() => {
    setIsLoading(true);
    const t1 = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t1);
  }, [view]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  let content;
  switch (view) {
    case "time":
    case "work":
      content = <ChartView />;
      break;
    case "settings":
      content = <Settings />;
      break;
    case "help":
      content = <HelpCenter />;
      break;
    case "add-member":
      content = <AddMember />;
      break;
    case "manageTeam":
      content = <EmployeeTable />;
      break;
    case "attendance":
      content = <AttendanceApp />;
      break;
    case "addEmployee":
      content = <EmployeeForm />;
      break;
    case "AdminControls":
      content = <AdminControls />;
      break;
    case "ShiftScheduling":
      content = <ShiftScheduling />;
      break;
    case "members":
      content = <MembersPanel />;
      break;
    case "performance":
      content = <PerformanceDashboard />;
      break;
    case "TaskManager":
      content = <TaskManager />;
      break;
    case "Assignment":
      content = <AssignmentOwnership />;
      break;
    case "Tracking":
      content = <TrackingReporting />;
      break;
    case "payroll":
      content = <PayrollModule />;
      break;
    case "Notifications":
      content = <NotificationsPage />;
      break;
    case "NotificationsEscalation":
      content = <NotificationsEscalations />;
      break;
    case "Lifecycle":
      content = <ProjectManagement />;
      break;
    case "Financial":
      content = <FinancialTracking />;
      break;
    case "Resource":
      content = <TeamResourceIntegration />;
      break;
    case "ClientOnboarding":
      content = <ClientManagement />;
      break;
    case "ClientRevenue":
      content = <ProjectRevenue />;
      break;
    case "ClientAdminControls":
      content = <AdminControlss />;
      break;
    case "SalesLifecycle":
      content = <SalesLifecycle />;
      break;
    case "InvoiceTracking":
      content = <DeliveryTracking />;
      break;
    case "SalesLineItems":
      content = <SalesLineItems />;
      break;
    case "Service":
      content = <ServiceCatalog />;
      break;
    case "cameraview":
      content = <CameraInputPage />;
      break;
    case "cameradashboard":
      content = <CameraDashboard />;
      break;
    case "Inventory":
      content = <ServiceInventory />;
      break;
    case "messages":
      content = <ChatApp />;
      break;

    case "boards":
    default:
      content = (
        <Board authToken={user.token} userRole={user.role} theme={theme} />
      );
      break;
  }

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar
        logout={handleLogout}
        onSelect={(newView) => navigate(`/dashboard/${newView}`)}
        currentView={view}
      />
      <div className="main-content">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onAddMember={() => navigate("/dashboard/members")}
          onViewCameraFeed={() => navigate("/dashboard/cameraview")}
          onMessagesClick={() => navigate("/dashboard/messages")} 
          onLogout={handleLogout}
        />
        <div className="content-area">
          {isLoading ? <Loader /> : <div className="fade-in">{content}</div>}
        </div>
      </div>
    </div>
  );
}
