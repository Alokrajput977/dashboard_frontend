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
  Smile,
  XCircle,
  CheckCircle
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
  const [imageView, setImageView] = useState(null); // full screen image view
  const closeImageViewer = () => setImageView(null);

  const fileInputRef = useRef();
  const endRef = useRef();

  const [callIncoming, setCallIncoming] = useState(false);
  const [caller, setCaller] = useState(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    if (currentUser?.username) {
      socket.emit('register', currentUser.username);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!selectedUser) return;
    fetch(`http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`)
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, [selectedUser, currentUser.username]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('receive_message', msg => {
      const relevant =
        selectedUser &&
        (msg.sender === selectedUser.username ||
          msg.receiver === selectedUser.username);
      if (relevant) setMessages(prev => [...prev, msg]);
      onMessage(msg);
    });
    return () => socket.off('receive_message');
  }, [selectedUser, onMessage]);

  useEffect(() => {
    socket.on('incoming_call', ({ from }) => {
      if (selectedUser?.username === from) {
        setCaller(from);
        setCallIncoming(true);
      }
    });
    socket.on('call_accepted', () => {
      setCallIncoming(false);
      setInCall(true);
    });
    socket.on('call_ended', ({ from }) => {
      setCallIncoming(false);
      setInCall(false);
      setCaller(null);
      const notification = {
        sender: 'system',
        receiver: currentUser.username,
        text: `${from} has ended the call.`,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, notification]);
    });
    return () => {
      socket.off('incoming_call');
      socket.off('call_accepted');
      socket.off('call_ended');
    };
  }, [selectedUser, currentUser.username]);

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
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(f);
  };

  const startCall = () => {
    socket.emit('call_user', {
      to: selectedUser.username,
      from: currentUser.username
    });
  };
  const acceptCall = () => {
    socket.emit('accept_call', {
      to: caller,
      from: currentUser.username
    });
    setCallIncoming(false);
    setInCall(true);
  };
  const endCall = () => {
    socket.emit('end_call', {
      to: inCall ? selectedUser.username : caller,
      from: currentUser.username
    });
    setCallIncoming(false);
    setInCall(false);
    setCaller(null);
    const notification = {
      sender: 'system',
      receiver: currentUser.username,
      text: `You ended the call.`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, notification]);
  };

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

  const isMedia = (txt, t) => txt.startsWith(`[${t}]:`);

  return (
    <>
      <div className="chat-box">
        {/* Incoming call */}
        {callIncoming && (
          <div className="call-banner incoming">
            <p>{caller} is calling…</p>
            <button onClick={acceptCall}>
              <CheckCircle size={16} /> Accept
            </button>
            <button onClick={endCall}>
              <XCircle size={16} /> Decline
            </button>
          </div>
        )}

        {/* In-call */}
        {inCall && (
          <div className="call-banner in-call">
            <p>In call with {selectedUser.username}</p>
            <button onClick={endCall}>
              <XCircle size={16} /> End Call
            </button>
          </div>
        )}

        {/* Header */}
        <header className="chat-header">
          <div className="user-info">
            {selectedUser.avatarUrl ? (
              <img
                src={selectedUser.avatarUrl}
                className="avatar-img"
                alt=""
              />
            ) : (
              <div className="avatar">
                <UserCircle size={25} />
              </div>
            )}
            <span className="chat-with">{selectedUser.username}</span>
          </div>
          <div className="header-actions">
            <Phone
              size={20}
              className={`icon call ${inCall ? 'disabled' : ''}`}
              onClick={startCall}
            />
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

        {/* Messages */}
        <div className="messages">
          {messages.map((m, idx) => {
            const mine = m.sender === currentUser.username;
            const isSystem = m.sender === 'system';
            const cls = isSystem ? 'system' : mine ? 'mine' : 'theirs';

            if (!isSystem && isMedia(m.text, 'image')) {
              return (
                <div key={idx} className={`message ${cls}`}>
                  <img
                    src={m.text.replace('[image]:', '')}
                    className="message-image"
                    alt="sent media"
                    onClick={() => setImageView(m.text.replace('[image]:', ''))}
                  />
                  <span className="msg-time">{m.time}</span>
                </div>
              );
            }

            return (
              <div key={idx} className={`message ${cls}`}>
                <p>{m.text}</p>
                <span className="msg-time">{m.time}</span>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input */}
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
                onEmojiClick={(_, emoji) => setInput(i => i + emoji)}
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

      {/* Image Viewer Overlay */}
      {imageView && (
        <div className="image-viewer-overlay" onClick={closeImageViewer}>
          <span className="close-btn" onClick={closeImageViewer}>&times;</span>
          <img src={imageView} alt="Full view" />
        </div>
      )}
    </>
  );
};

export default ChatBox;
