import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useNavigate } from "react-router-dom";
import "./CameraDashboard.css";

const serverIP = "192.168.0.104:3001";

const CameraDashboard = () => {
  const [cameras, setCameras] = useState([]);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  // Get all cameras from backend
  const fetchCameras = async () => {
    try {
      const res = await fetch(`http://${serverIP}/api/cameras`);
      const data = await res.json();
      setCameras(data);
    } catch (err) {
      console.error("Fetch camera error:", err);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

 useEffect(() => {
  const timers = [];
  const currentRefs = videoRefs.current; // ✅ copy to local variable

  cameras.forEach((camera) => {
    const videoElement = currentRefs[camera.ip];
    if (videoElement && !videoElement.player) {
      const streamUrl = `http://${serverIP}/streams/${camera.folder}/stream.m3u8`;

      const tryInitializePlayer = () => {
        fetch(streamUrl, { method: "HEAD" })
          .then((res) => {
            if (res.ok) {
              const player = videojs(videoElement, {
                autoplay: true,
                muted: true,
                controls: true,
                responsive: true,
                fluid: true,
                html5: {
                  vhs: { overrideNative: true },
                  nativeAudioTracks: false,
                  nativeVideoTracks: false,
                },
                controlBar: {
                  playToggle: false,
                  volumePanel: false,
                  fullscreenToggle: true,
                },
                userActions: {
                  click: () => {},
                },
                sources: [
                  {
                    src: streamUrl,
                    type: "application/x-mpegURL",
                  },
                ],
              });

              player.ready(() => {
                player.tech().el().style.pointerEvents = "none";
                player.play().catch(() => {});
              });

              videoElement.player = player;
            } else {
              timers.push(setTimeout(tryInitializePlayer, 1000));
            }
          })
          .catch(() => timers.push(setTimeout(tryInitializePlayer, 1000)));
      };

      tryInitializePlayer();
    }
  });

  return () => {
    Object.values(currentRefs).forEach((videoEl) => {
      if (videoEl?.player) {
        videoEl.player.dispose();
      }
    });
    timers.forEach(clearTimeout);
  };
}, [cameras]);


  const removeCamera = async (ip) => {
    try {
      await fetch(`http://${serverIP}/api/cameras/${ip}`, {
        method: "DELETE",
      });
      if (videoRefs.current[ip]?.player) {
        videoRefs.current[ip].player.dispose();
        delete videoRefs.current[ip];
      }
      setCameras((prev) => prev.filter((cam) => cam.ip !== ip));
    } catch (err) {
      alert("Error removing camera: " + err.message);
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
