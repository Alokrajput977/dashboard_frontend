import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/components/login"
import Dashboard from "./components/Dashboard";
import AddMember from "./components/AddMember";

function App() {
  const [user, setUser] = useState(null);

  // Check for stored user info in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/add-member"
          element={user ? <AddMember /> : <Navigate to="/add-member" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
