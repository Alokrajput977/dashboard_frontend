// src/components/LeftSidebar.js
import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import './LeftSidebar.css';

const LeftSidebar = ({ currentUser, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then(data => {
        const enhanced = data
          .filter(u => u.username !== currentUser.username)
          .map(u => ({
            username: u.username,
            avatarUrl: u.avatarUrl, // assume avatar URL from backend
            lastMessage: u.lastMessage || "No messages yet",
            time: new Date(u.updatedAt || u.createdAt).toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit'
            })
          }));
        setUsers(enhanced);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Contacts</div>

      <div className="sidebar-users">
        {loading ? (
          <div className="loading">Loading…</div>
        ) : users.length === 0 ? (
          <div className="loading">No contacts found</div>
        ) : (
          users.map(u => (
            <div
              key={u.username}
              className="sidebar-user"
              onClick={() => onSelectUser(u)}
            >
              {u.avatarUrl ? (
                <img src={u.avatarUrl} alt="avatar" className="avatar-img" />
              ) : (
                <div className="avatar-fallback">
                  <UserCircle size={28} />
                </div>
              )}
              <div className="user-info">
                <div className="user-name-time">
                  <span className="user-name">{u.username}</span>
                  <span className="message-time">{u.time}</span>
                </div>
                <div className="last-message">{u.lastMessage}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
