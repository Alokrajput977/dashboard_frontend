import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/login"
import Dashboard from "./components/Dashboard";
import AddMember from "./components/AddMember";
import './index.css';
import AdminControls from "./components/Admincontrol";
import RowDetails from "../src/components/Sales_Management/row"
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <Router>
      <Routes>
       <Route
          path="/"
          element={
            !user ? (
              <Login setUser={setUser} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard/*"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/admin" element={<AdminControls/>}
        />
        <Route
          path="/add-member"
          element={
            user ? (
              <AddMember />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/details/:id" element={<RowDetails />} />

      </Routes>
    </Router>
  );
}

export default App;

