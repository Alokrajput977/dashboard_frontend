// src/components/Message/LeftSidebar.js
import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import './LeftSidebar.css';

const LeftSidebar = ({
  currentUser,
  onSelectUser,
  selectedUser,
  unreadCounts,
  latestMessages
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        // build list with preview and timestamp
        const list = data
          .filter(u => u.username !== currentUser.username)
          .map(u => {
            const lm = latestMessages[u.username] || {};
            return {
              username:  u.username,
              avatarUrl: u.avatarUrl,
              lastMessage: lm.text || 'No messages yet',
              time:      lm.time || new Date(u.updatedAt || u.createdAt)
                           .toLocaleTimeString('en-IN', {
                             hour: '2-digit',
                             minute: '2-digit'
                           }),
              timestamp: lm.timestamp || new Date(u.updatedAt || u.createdAt).getTime()
            };
          });

        // sort descending by our real timestamp
        list.sort((a, b) => b.timestamp - a.timestamp);
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
            className={`sidebar-user ${
              selectedUser?.username === u.username ? 'active' : ''
            }`}
            onClick={() => onSelectUser(u)}
          >
            {u.avatarUrl ? (
              <img src={u.avatarUrl} alt="" className="avatar-img" />
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

            {unreadCounts?.[u.username] > 0 &&
              selectedUser?.username !== u.username && (
                <div className="unread-badge">
                  {unreadCounts[u.username]}
                </div>
              )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
