import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CameraInputPage.css";

const serverIP = "192.168.0.104:3001";

const CameraInputPage = () => {
  const [ip, setIP] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddCamera = () => {
    if (!ip || !username || !password) {
      alert("Please fill all fields");
      return;
    }

    fetch(`http://${serverIP}/api/cameras`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ip, username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Camera not added");
        return res.json();
      })
      .then(() => navigate("/dashboard/cameradashboard"))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="camera-input-container">
      <h2>Add New Camera</h2>
      <input
        type="text"
        placeholder="Camera IP"
        value={ip}
        onChange={(e) => setIP(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleAddCamera}>Add Camera</button>
        <button onClick={() => navigate("/dashboard/cameradashboard")}>
          View Dashboard
        </button>
      </div>
    </div>
  );
};

export default CameraInputPage;
