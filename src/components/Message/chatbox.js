import React, { useState } from "react";
import "./chatbox.css";
import { FaVideo, FaPhoneAlt, FaUserCircle, FaPaperclip } from "react-icons/fa";

const Chatbox = ({ selectedUser, messages, onSendMessage }) => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim() || !selectedUser) return;
    const newMsg = {
      text: input,
      sender: "you",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    onSendMessage(selectedUser._id, newMsg);
    setInput("");
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    if (file && selectedUser) {
      const url = URL.createObjectURL(file);
      const newMsg = {
        image: url,
        sender: "you",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      onSendMessage(selectedUser._id, newMsg);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        {selectedUser && (
          <>
            <FaUserCircle className="user-avatar" />
            <div className="chat-user">{selectedUser.fullName}</div>
            <div className="chat-actions">
              <button className="call-btn" title="Audio Call">
                <FaPhoneAlt />
              </button>
              <button className="video-btn" title="Video Call">
                <FaVideo />
              </button>
            </div>
          </>
        )}
        {!selectedUser && <div className="chat-user">Select a user to start chat</div>}
      </div>

      <div className="chatbox-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text && <div className="message-bubble">{msg.text}</div>}
            {msg.image && <img src={msg.image} alt="sent" className="message-image" />}
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="chatbox-footer">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <input
            type="file"
            accept="image/*"
            id="upload"
            style={{ display: "none" }}
            onChange={sendImage}
          />
          <label htmlFor="upload" className="upload-btn" title="Send image">
            <FaPaperclip />
          </label>
          <button onClick={sendMessage} className="send-btn">Send</button>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
