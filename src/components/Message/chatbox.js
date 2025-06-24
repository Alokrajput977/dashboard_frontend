import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Video,
  MoreVertical,
  UserCircle,
  Image as ImageIcon,
} from 'lucide-react';
import './chatbox.css';

const ChatBox = ({ currentUser, selectedUser }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef();
  const endRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch chat history
  useEffect(() => {
    if (selectedUser) {
      fetch(
        `http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`
      )
        .then((res) => res.json())
        .then((data) => setMessages(data))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [selectedUser]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isMediaMessage = (text, type) => text.startsWith(`[${type}]:`);

  // Send message (text or file)
  const sendMessageToBackend = async (text) => {
    const newMsg = {
      sender: currentUser.username,
      receiver: selectedUser.username,
      text,
    };

    try {
      const res = await fetch('http://localhost:5050/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  // Form submit
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
      alert('Unsupported file type selected.');
      setFileType(null);
    }
  };

  if (!selectedUser)
    return <div className="chat-box placeholder">Select a contact to chat</div>;

  return (
    <div className="chat-box">
      <header className="chat-header">
        <div className="user-info">
          {selectedUser.avatarUrl ? (
            <img
              src={selectedUser.avatarUrl}
              alt="avatar"
              className="avatar-img"
            />
          ) : (
            <div className="avatar">
              <UserCircle size={25} />
            </div>
          )}
          <span className="chat-with">{selectedUser.username}</span>
        </div>

        <div className="header-actions">
          <Phone size={20} className="icon call" title="Voice call" />
          <Video size={20} className="icon video" title="Video call" />
          <MoreVertical size={20} className="icon more" title="More options" />
        </div>
      </header>

      <div className="messages">
        {messages.map((msg, i) => {
          if (isMediaMessage(msg.text, 'image')) {
            return (
              <div
                key={i}
                className={`message ${
                  msg.sender === currentUser.username ? 'mine' : 'theirs'
                }`}
              >
                <img
                  src={msg.text.replace('[image]:', '')}
                  alt="sent"
                  className="message-image"
                />
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else if (isMediaMessage(msg.text, 'video')) {
            return (
              <div
                key={i}
                className={`message ${
                  msg.sender === currentUser.username ? 'mine' : 'theirs'
                }`}
              >
                <video controls className="message-video">
                  <source
                    src={msg.text.replace('[video]:', '')}
                    type="video/mp4"
                  />
                </video>
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else if (isMediaMessage(msg.text, 'document')) {
            return (
              <div
                key={i}
                className={`message ${
                  msg.sender === currentUser.username ? 'mine' : 'theirs'
                }`}
              >
                <a
                  href={msg.text.replace('[document]:', '')}
                  download={`Document_${i}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Download Document
                </a>
                <span className="msg-time">{msg.time}</span>
              </div>
            );
          } else {
            return (
              <div
                key={i}
                className={`message ${
                  msg.sender === currentUser.username ? 'mine' : 'theirs'
                }`}
              >
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
          <ImageIcon
            size={20}
            className="icon image-upload-icon"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="upload-menu">
              <div onClick={() => handleUploadType('image')}>📷 Image</div>
              <div onClick={() => handleUploadType('video')}>🎥 Video</div>
              <div onClick={() => handleUploadType('document')}>
                📄 Document
              </div>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept={
            fileType === 'image'
              ? 'image/*'
              : fileType === 'video'
              ? 'video/*'
              : fileType === 'document'
              ? '.pdf,.docx'
              : '*'
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
