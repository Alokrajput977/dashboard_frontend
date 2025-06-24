import React, { useEffect, useState } from "react";
import "./LeftSidebar.css";

const emojis = [
  "👨‍💼", "👩‍💼",
  "👨‍🎨", "👩‍🎨",
  "👨‍🔧", "👩‍🔧",
  "👨‍💻", "👩‍💻",
  "👨‍🏫", "👩‍🏫",
  "👨‍⚕️", "👩‍⚕️"
];

const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const LeftSidebar = ({ currentUser, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        const enhancedUsers = data
          .filter(user => user.username !== currentUser.username) // 💡 Filter out current user
          .map((user) => ({
            ...user,
            avatar: getRandomEmoji(),
            time: new Date(user.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "I'm using ChatApp.",
          }));
        setUsers(enhancedUsers);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">Messages</div>
      <div className="sidebar-users">
        {loading ? (
          <p style={{ color: "#ccc", padding: "1rem" }}>Loading users...</p>
        ) : users.length === 0 ? (
          <p style={{ color: "#ccc", padding: "1rem" }}>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div
              className="sidebar-user"
              key={user._id || index}
              onClick={() => onSelectUser(user)}
              style={{ cursor: "pointer" }}
            >
              <div className="avatar">{user.avatar}</div>
              <div className="user-info">
                <div className="user-name-time">
                  <span className="user-name">{user.fullName}</span>
                  <span className="message-time">{user.time}</span>
                </div>
                <div className="last-message">{user.status}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
