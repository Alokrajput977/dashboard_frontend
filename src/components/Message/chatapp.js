import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import LeftSidebar from "./LeftSidebar";
import Chatbox from "../Message/chatbox";

const socket = io("http://localhost:4000", {
  withCredentials: true
});

const ChatApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      setCurrentUser(u);
      socket.emit("join", u._id);
    }
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
     fetch(`http://localhost:4000/api/messages${selectedUser._id}`, {
      credentials: "include"
    })
      .then((r) => {
        if (!r.ok) throw new Error("Fetch failed");
        return r.json();
      })
      .then(setMessages)
      .catch(console.error);
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (
        selectedUser &&
        (msg.sender === selectedUser._id || msg.receiver === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("receive-message");
  }, [selectedUser]);

  const handleSend = async (userId, msg) => {
    const payload = { ...msg, receiver: userId };
    const res = await fetch("http://localhost:4000/api/messages", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.error("Send failed", await res.text());
      return;
    }
    const saved = await res.json();
    setMessages((prev) => [...prev, saved]);
    socket.emit("send-message", { to: userId, message: saved });
  };

  return (
    <div className="chat-wrapper">
      <LeftSidebar currentUser={currentUser} onSelectUser={setSelectedUser} />
      <Chatbox selectedUser={selectedUser} messages={messages} onSendMessage={handleSend} />
    </div>
  );
};

export default ChatApp;
