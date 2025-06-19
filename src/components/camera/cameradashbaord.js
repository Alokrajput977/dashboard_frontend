import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useNavigate } from "react-router-dom";
import "./CameraDashboard.css";

const serverIP = "192.168.0.113:3001";

const CameraDashboard = () => {
  const [cameras, setCameras] = useState([]);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  // Fetch cameras from backend
  useEffect(() => {
    fetch(`http://${serverIP}/api/cameras`)
      .then((res) => res.json())
      .then((data) => setCameras(data))
      .catch(console.error);
  }, []);

  // Attach videojs after components are mounted
  useEffect(() => {
    cameras.forEach((camera) => {
      const videoElement = videoRefs.current[camera.ip];
      if (videoElement && !videoElement.player) {
        const streamUrl = `http://${serverIP}/streams/${camera.folder}/stream.m3u8`;

        const player = videojs(videoElement, {
          autoplay: true,
          muted: true,
          controls: true,
          responsive: true,
          fluid: true,
          controlBar: {
            playToggle: false,
            volumePanel: false,
            fullscreenToggle: true,
          },
          sources: [
            {
              src: streamUrl,
              type: "application/x-mpegURL",
            },
          ],
        });

        videoElement.player = player;
      }
    });

    return () => {
      Object.values(videoRefs.current).forEach((videoEl) => {
        if (videoEl?.player) {
          videoEl.player.dispose();
        }
      });
    };
  }, [cameras]);

  // Remove camera
  const removeCamera = async (ip) => {
    try {
      const res = await fetch(`http://${serverIP}/api/cameras/${ip}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to remove camera");
      }

      if (videoRefs.current[ip]?.player) {
        videoRefs.current[ip].player.dispose();
        delete videoRefs.current[ip];
      }

      setCameras((prev) => prev.filter((cam) => cam.ip !== ip));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="h2">Camera Monitoring Dashboard</h2>
        <button className="add-btn" onClick={() => navigate(-1)}>
          ➕ Add Camera
        </button>
      </header>

      <div className="camera-grid">
        {cameras.map((cam) => (
          <div key={cam.ip} className="camera-card">
            <h4>{cam.ip}</h4>
            <div className="video-wrapper">
              <video
                ref={(el) => {
                  if (el) videoRefs.current[cam.ip] = el;
                }}
                className="video-js vjs-default-skin"
                playsInline
              />
            </div>
            <button className="remove-btn" onClick={() => removeCamera(cam.ip)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>

      <footer className="dashboard-footer">
        <p>© 2025 Sunic. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default CameraDashboard;
