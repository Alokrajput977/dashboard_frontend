// src/components/Message/ChatApp.js
import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import ChatBox from './chatbox';
import './ChatApp.css';

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatHistory, setChatHistory] = useState({});

  // Load current user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  // Redirect or show message if user is not logged in
  if (!currentUser) {
    return (
      <div style={{ padding: '2rem', fontSize: '1.2rem', color: '#666' }}>
        Please log in to use the chat.
      </div>
    );
  }

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setChatHistory((prev) => ({
      ...prev,
      [user.username]: prev[user.username] || [],
    }));
  };

  const handleSendMessage = (text) => {
    if (!selectedUser || !text.trim()) return;
    const time = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const msg = { sender: currentUser.username, text, time };
    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.username]: [...prev[selectedUser.username], msg],
    }));
  };

  return (
    <div className="chat-app">
      <LeftSidebar
        currentUser={currentUser}
        users={users}
        setUsers={setUsers}
        onSelectUser={handleSelectUser}
      />
      <ChatBox
        currentUser={currentUser}
        selectedUser={selectedUser}
        messages={selectedUser ? chatHistory[selectedUser.username] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatApp;
