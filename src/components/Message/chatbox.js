// src/components/Message/chatbox.js
import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import {
  Phone, Video, MoreVertical, UserCircle,
  Image as ImageIcon, Smile
} from 'lucide-react';
import './chatbox.css';

const socket = io('http://localhost:5050');

const ChatBox = ({ currentUser, selectedUser, onMessage }) => {
  const [input,        setInput]        = useState('');
  const [messages,     setMessages]     = useState([]);
  const [fileType,     setFileType]     = useState(null);
  const [filePreview,  setFilePreview]  = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showEmoji,    setShowEmoji]    = useState(false);
  const fileInputRef = useRef();
  const endRef       = useRef();

  // load history
  useEffect(() => {
    if (!selectedUser) return;
    fetch(
      `http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`
    )
      .then(r => r.json())
      .then(setMessages)
      .catch(console.error);
  }, [selectedUser, currentUser.username]);

  // scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // realtime incoming
  useEffect(() => {
    socket.on('receive_message', msg => {
      const isRelevant =
        selectedUser &&
        (msg.sender === selectedUser.username ||
         msg.receiver === selectedUser.username);

      if (isRelevant) {
        setMessages(m => [...m, msg]);
      }
      onMessage(msg);
    });
    return () => socket.off('receive_message');
  }, [selectedUser, onMessage]);

  // send
  const sendMessage = async text => {
    const msg = {
      sender:   currentUser.username,
      receiver: selectedUser.username,
      text,
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const res   = await fetch('http://localhost:5050/api/messages', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(msg)
    });
    const saved = await res.json();
    setMessages(m => [...m, saved]);
    socket.emit('send_message', saved);
    onMessage(saved);
  };

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

  const handleFile = type => {
    setFileType(type);
    fileInputRef.current.click();
  };
  const onFileChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onloadend = () => setFilePreview(r.result);
    r.readAsDataURL(f);
  };

  if (!selectedUser) {
    return <div className="chat-box placeholder">Select a contact to chat</div>;
  }

  const isMedia = (txt, t) => txt.startsWith(`[${t}]:`);

  return (
    <div className="chat-box">
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
              onClick={() => setShowMoreMenu(v => !v)}
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

      <div className="messages">
        {messages.map((m, i) => {
          const mine = m.sender === currentUser.username;
          if (isMedia(m.text, 'image')) {
            return (
              <div
                key={i}
                className={`message ${mine ? 'mine' : 'theirs'}`}
              >
                <img
                  src={m.text.replace('[image]:', '')}
                  className="message-image"
                  alt=""
                />
                <span className="msg-time">{m.time}</span>
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`message ${mine ? 'mine' : 'theirs'}`}
            >
              <p>{m.text}</p>
              <span className="msg-time">{m.time}</span>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

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
          onClick={() => setShowEmoji(v => !v)}
        />
        {showEmoji && (
          <div className="emoji-picker">
            <EmojiPicker
              onEmojiClick={(_, e) => setInput(i => i + e)}
            />
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
