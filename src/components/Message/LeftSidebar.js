import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import './LeftSidebar.css';

const LeftSidebar = ({ currentUser, onSelectUser, selectedUser, unreadCounts, latestMessages }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then(data => {
        // Filter out myself and map to include latest message
        const list = data
          .filter(u => u.username !== currentUser.username)
          .map(u => ({
            username: u.username,
            avatarUrl: u.avatarUrl,
            lastMessage: latestMessages[u.username]?.text || "No messages yet",
            time: latestMessages[u.username]?.time || new Date(u.updatedAt || u.createdAt)
              .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          }));

        // Sort descending by time
        list.sort((a, b) => {
          const ta = Date.parse(`1970-01-01T${a.time}`) || 0;
          const tb = Date.parse(`1970-01-01T${b.time}`) || 0;
          return tb - ta;
        });

        setUsers(list);
      })
      .catch(console.error);
  }, [currentUser, latestMessages]);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Contacts</div>
      <div className="sidebar-users">
        {users.map(u => (
          <div
            key={u.username}
            className={`sidebar-user ${selectedUser?.username === u.username ? 'active' : ''}`}
            onClick={() => onSelectUser(u)}
          >
            {u.avatarUrl
              ? <img src={u.avatarUrl} alt="" className="avatar-img" />
              : <div className="avatar-fallback"><UserCircle size={28} /></div>
            }

            <div className="user-info">
              <div className="user-name-time">
                <span className="user-name">{u.username}</span>
                <span className="message-time">{u.time}</span>
              </div>
              <div className="last-message">{u.lastMessage}</div>
            </div>

            {unreadCounts?.[u.username] > 0 && selectedUser?.username !== u.username && (
              <div className="unread-badge">{unreadCounts[u.username]}</div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
