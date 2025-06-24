import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client'; // 👈 Add this line
import {
  Phone, Video, MoreVertical, UserCircle, Image as ImageIcon
} from 'lucide-react';
import './chatbox.css';

const socket = io('http://localhost:5050'); // 👈 Connect socket

const ChatBox = ({ currentUser, selectedUser }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef();
  const endRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch chat history when user selected
  useEffect(() => {
    if (selectedUser) {
      fetch(`http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('Fetch error:', err));
    }
  }, [selectedUser]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🔴 Listen to messages from other user
  useEffect(() => {
    socket.on('receive_message', (msg) => {
      // Check if the message is for the currently selected chat
      if (
        selectedUser &&
        (msg.sender === selectedUser.username || msg.receiver === selectedUser.username)
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [selectedUser]);

  const sendMessageToBackend = async (text) => {
    const newMsg = {
      sender: currentUser.username,
      receiver: selectedUser.username,
      text,
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit'
      })
    };

    try {
      const res = await fetch('http://localhost:5050/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg)
      });

      const saved = await res.json();
      setMessages(prev => [...prev, saved]);

      // 🟡 Emit to socket for receiver
      socket.emit('send_message', saved);
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !filePreview) return;

    if (filePreview) {
      const fullText = `[${fileType}]:${filePreview}`;
      await sendMessageToBackend(fullText);
      setFilePreview(null);
      setFileType(null);
    } else {
      await sendMessageToBackend(input);
    }

    setInput('');
  };

  const handleUploadType = (type) => {
    setFileType(type);
    setShowDropdown(false);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };

    if (fileType === 'image' && file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else if (fileType === 'video' && file.type.startsWith('video/')) {
      reader.readAsDataURL(file);
    } else if (
      fileType === 'document' &&
      (file.type === 'application/pdf' || file.name.endsWith('.docx'))
    ) {
      reader.readAsDataURL(file);
    } else {
      alert('Unsupported file type.');
      setFileType(null);
    }
  };

  const isMediaMessage = (text, type) => text.startsWith(`[${type}]:`);

  if (!selectedUser)
    return <div className="chat-box placeholder">Select a contact to chat</div>;

  return (
    <div className="chat-box">
      <header className="chat-header">
        <div className="user-info">
          {selectedUser.avatarUrl ? (
            <img src={selectedUser.avatarUrl} alt="avatar" className="avatar-img" />
          ) : (
            <div className="avatar"><UserCircle size={25} /></div>
          )}
          <span className="chat-with">{selectedUser.username}</span>
        </div>
        <div className="header-actions">
          <Phone size={20} className="icon call" />
          <Video size={20} className="icon video" />
          <MoreVertical size={20} className="icon more" />
        </div>
      </header>

      <div className="messages">
        {messages.map((msg, i) => {
          const mine = msg.sender === currentUser.username;
          if (isMediaMessage(msg.text, 'image')) {
            return (
              <div key={i} className={`message ${mine ? 'mine' : 'theirs'}`}>
                <img src={msg.text.replace('[image]:', '')} className="message-image" alt="sent" />
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else if (isMediaMessage(msg.text, 'video')) {
            return (
              <div key={i} className={`message ${mine ? 'mine' : 'theirs'}`}>
                <video controls className="message-video">
                  <source src={msg.text.replace('[video]:', '')} type="video/mp4" />
                </video>
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else if (isMediaMessage(msg.text, 'document')) {
            return (
              <div key={i} className={`message ${mine ? 'mine' : 'theirs'}`}>
                <a href={msg.text.replace('[document]:', '')} download target="_blank" rel="noreferrer">
                  📄 Download Document
                </a>
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else {
            return (
              <div key={i} className={`message ${mine ? 'mine' : 'theirs'}`}>
                <p>{msg.text}</p>
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          }
        })}
        <div ref={endRef} />
      </div>

      <form className="input-area" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="upload-dropdown">
          <ImageIcon size={20} className="icon image-upload-icon" onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="upload-menu">
              <div onClick={() => handleUploadType('image')}>📷 Image</div>
              <div onClick={() => handleUploadType('video')}>🎥 Video</div>
              <div onClick={() => handleUploadType('document')}>📄 Document</div>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept={
            fileType === 'image' ? 'image/*' :
            fileType === 'video' ? 'video/*' :
            fileType === 'document' ? '.pdf,.docx' : '*'
          }
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
