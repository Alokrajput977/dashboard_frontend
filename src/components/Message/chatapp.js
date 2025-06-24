// src/components/Message/ChatApp.js
import React, { useState } from 'react';
import LeftSidebar from './LeftSidebar.js';
import ChatBox from './chatbox.js';       // ← match filename & casing
import './ChatApp.css';

const ChatApp = () => {
  // Mock current user; in a real app you'd get this from auth
  const currentUser = { username: 'alice' };

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // chatHistory maps otherUsername => array of { sender, text, time }
  const [chatHistory, setChatHistory] = useState({});

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // initialize history if not present
    setChatHistory((prev) => ({
      ...prev,
      [user.username]: prev[user.username] || []
    }));
  };

  const handleSendMessage = (text) => {
    if (!selectedUser || !text.trim()) return;
    const time = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit'
    });
    const msg = { sender: currentUser.username, text, time };
    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.username]: [...prev[selectedUser.username], msg]
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
