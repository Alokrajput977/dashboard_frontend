// src/components/Message/ChatApp.js
import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import ChatBox from './chatbox';
import './ChatApp.css';

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [latestMessages, setLatestMessages] = useState({});

  // ✅ Load current user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  // ❗ Redirect or show message if user not logged in
  if (!currentUser) {
    return (
      <div style={{ padding: '2rem', fontSize: '1.2rem', color: '#666' }}>
        Please log in to use the chat.
      </div>
    );
  }

  // ✅ Handle user selection
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Reset unread count for that user
    setUnreadCounts(prev => ({ ...prev, [user.username]: 0 }));
  };

  // ✅ Handle message received/sent
  const handleNewMessage = (msg) => {
    const otherUser = msg.sender === currentUser.username ? msg.receiver : msg.sender;

    // Update latest message for preview
    setLatestMessages(prev => ({
      ...prev,
      [otherUser]: { text: msg.text, time: msg.time }
    }));

    // Update unread count if message is from other user and not selected
    if (msg.sender !== currentUser.username &&
        (!selectedUser || selectedUser.username !== msg.sender)) {
      setUnreadCounts(prev => ({
        ...prev,
        [msg.sender]: (prev[msg.sender] || 0) + 1
      }));
    }
  };

  return (
    <div className="chat-app">
      <LeftSidebar
        currentUser={currentUser}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        unreadCounts={unreadCounts}
        latestMessages={latestMessages}
      />

      <ChatBox
        currentUser={currentUser}
        selectedUser={selectedUser}
        onMessage={handleNewMessage}
      />
    </div>
  );
};

export default ChatApp;
