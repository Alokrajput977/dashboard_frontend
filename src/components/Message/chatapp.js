import React, { useState, useEffect } from "react";
import Chatbox from "./chatbox";
import LeftSidebar from "./LeftSidebar";
import "./chatbox.css";
import "./LeftSidebar.css";

const dummyMessages = {
  "1": [
    { text: "Hey there!", sender: "them", time: "10:00" },
    { text: "How's your day?", sender: "you", time: "10:01" },
  ],
  "2": [
    { text: "Do you invest in crypto?", sender: "them", time: "12:05" },
    { image: "/chat-uploads/sample.png", sender: "you", time: "12:10" },
  ],
  "3": [
    { text: "Meeting at 5 PM", sender: "them", time: "13:00" },
    { text: "Sure, noted.", sender: "you", time: "13:05" },
  ],
};

const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [allMessages, setAllMessages] = useState(dummyMessages);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleNewMessage = (userId, message) => {
    setAllMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), message],
    }));
  };

  return (
    <div className="chat-wrapper">
      <LeftSidebar onSelectUser={handleSelectUser} currentUser={currentUser} />
      <Chatbox
        selectedUser={selectedUser}
        messages={selectedUser ? allMessages[selectedUser._id] || [] : []}
        onSendMessage={handleNewMessage}
      />
    </div>
  );
};

export default ChatApp;
