// src/components/Message/chatbox.js
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import {
  Phone,
  Video,
  MoreVertical,
  UserCircle,
  Image as ImageIcon,
  Smile
} from 'lucide-react';
import placeholderImage from '../../assets/cute-text-messages-mobile-phone-screen-media-mix-removebg-preview.png';
import './chatbox.css';

const socket = io('http://localhost:5050');

const ChatBox = ({ currentUser, selectedUser, onMessage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const fileInputRef = useRef();
  const endRef = useRef();

  // 1️⃣ Load chat history whenever selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;
    fetch(
      `http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`
    )
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, [selectedUser, currentUser.username]);

  // 2️⃣ Auto-scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3️⃣ Listen for real-time incoming messages
  useEffect(() => {
    socket.on('receive_message', msg => {
      const isRelevant =
        selectedUser &&
        (msg.sender === selectedUser.username ||
         msg.receiver === selectedUser.username);
      if (isRelevant) {
        setMessages(prev => [...prev, msg]);
      }
      onMessage(msg);
    });
    return () => socket.off('receive_message');
  }, [selectedUser, onMessage]);

  // Send message (text or base64-encoded image)
  const sendMessage = async text => {
    const msg = {
      sender: currentUser.username,
      receiver: selectedUser.username,
      text,
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const res = await fetch('http://localhost:5050/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    const saved = await res.json();
    setMessages(prev => [...prev, saved]);
    socket.emit('send_message', saved);
    onMessage(saved);
  };

  // Handle text submit or image
  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim() && !filePreview) return;
    const payload = filePreview
      ? `[${fileType}]:${filePreview}`
      : input;
    sendMessage(payload);
    setInput('');
    setFileType(null);
    setFilePreview(null);
    setShowEmoji(false);
  };

  // Trigger file input for images
  const handleFile = type => {
    setFileType(type);
    fileInputRef.current.click();
  };

  // Read selected file as base64
  const onFileChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(f);
  };

  // If no contact selected, show placeholder image + message
  if (!selectedUser) {
    return (
      <div className="chat-box placeholder">
        <img
          src={placeholderImage}
          alt="Select a contact"
          className="placeholder-image"
        />
        <p>Please select a contact to start chatting</p>
      </div>
    );
  }

  // Helper to detect media messages
  const isMedia = (txt, type) => txt.startsWith(`[${type}]:`);

  return (
    <div className="chat-box">
      {/* — Header with avatar, name, actions */}
      <header className="chat-header">
        <div className="user-info">
          {selectedUser.avatarUrl ? (
            <img src={selectedUser.avatarUrl} className="avatar-img" alt="" />
          ) : (
            <div className="avatar">
              <UserCircle size={25} />
            </div>
          )}
          <span className="chat-with">{selectedUser.username}</span>
        </div>
        <div className="header-actions">
          <Phone size={20} className="icon call" />
          <Video size={20} className="icon video" />
          <div className="more-menu-wrapper">
            <MoreVertical
              size={20}
              className="icon more"
              onClick={() => setShowMoreMenu(val => !val)}
            />
            {showMoreMenu && (
              <div className="more-menu">
                <div
                  onClick={async () => {
                    if (
                      window.confirm(
                        'Delete all messages? This clears them for you.'
                      )
                    ) {
                      await fetch(
                        `http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`,
                        { method: 'DELETE' }
                      );
                      setMessages([]);
                    }
                    setShowMoreMenu(false);
                  }}
                >
                  🗑 Delete Chat
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* — Messages list */}
      <div className="messages">
        {messages.map((m, idx) => {
          const mine = m.sender === currentUser.username;
          if (isMedia(m.text, 'image')) {
            return (
              <div key={idx} className={`message ${mine ? 'mine' : 'theirs'}`}>
                <img
                  src={m.text.replace('[image]:', '')}
                  className="message-image"
                  alt="sent media"
                />
                <span className="msg-time">{m.time}</span>
              </div>
            );
          }
          return (
            <div key={idx} className={`message ${mine ? 'mine' : 'theirs'}`}>
              <p>{m.text}</p>
              <span className="msg-time">{m.time}</span>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* — Input area */}
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Smile
          size={22}
          className="icon"
          onClick={() => setShowEmoji(val => !val)}
        />
        {showEmoji && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={(_, emoji) => setInput(i => i + emoji)} />
          </div>
        )}
        <ImageIcon
          size={20}
          className="icon"
          onClick={() => handleFile('image')}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
