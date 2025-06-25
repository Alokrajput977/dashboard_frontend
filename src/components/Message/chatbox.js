import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { Phone, Video, MoreVertical, UserCircle, Image as ImageIcon, Smile } from 'lucide-react';
import './chatbox.css';

const socket = io('http://localhost:5050');

const ChatBox = ({ currentUser, selectedUser, onMessage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileInputRef = useRef();
  const endRef = useRef();

  // fetch history when chat opens
  useEffect(() => {
    if (!selectedUser) return;
    fetch(`http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`)
      .then(r => r.json())
      .then(data => setMessages(data))
      .catch(console.error);
  }, [selectedUser, currentUser.username]);

  // scroll down
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // listen for incoming messages
  useEffect(() => {
    socket.on('receive_message', msg => {
      // append if conversation matches
      const isRelevant = selectedUser &&
        (msg.sender === selectedUser.username || msg.receiver === selectedUser.username);

      if (isRelevant) {
        setMessages(m => [...m, msg]);
      }
      // notify parent for badge + preview
      onMessage(msg);
    });
    return () => { socket.off('receive_message'); };
  }, [onMessage, selectedUser]);

  // send any text or file message
  const sendMessage = async (text) => {
    const msg = {
      sender: currentUser.username,
      receiver: selectedUser.username,
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' })
    };
    // persist
    const res = await fetch('http://localhost:5050/api/messages', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(msg)
    });
    const saved = await res.json();
    setMessages(m => [...m, saved]);
    socket.emit('send_message', saved);
    onMessage(saved);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim() && !filePreview) return;
    if (filePreview) {
      sendMessage(`[${fileType}]:${filePreview}`);
      setFileType(null);
      setFilePreview(null);
    } else {
      sendMessage(input);
    }
    setInput('');
    setShowEmojiPicker(false);
  };

  // file chooser
  const handleUploadType = type => {
    setFileType(type);
    fileInputRef.current.click();
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return alert('No file');
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const isMedia = (txt, t) => txt.startsWith(`[${t}]:`);

  if (!selectedUser) {
    return <div className="chat-box placeholder">Select a contact to chat</div>;
  }

  return (
    <div className="chat-box">
      <header className="chat-header">
        <div className="user-info">
          {selectedUser.avatarUrl
            ? <img src={selectedUser.avatarUrl} alt="" className="avatar-img" />
            : <div className="avatar"><UserCircle size={25} /></div>
          }
          <span className="chat-with">{selectedUser.username}</span>
        </div>
        <div className="header-actions">
          <Phone size={20} className="icon call" />
          <Video size={20} className="icon video" />
          <div className="more-menu-wrapper">
            <MoreVertical size={20} onClick={() => setShowMoreMenu(v => !v)} className="icon more" />
            {showMoreMenu && (
              <div className="more-menu">
                <div onClick={async () => {
                  if (window.confirm('Delete all messages?')) {
                    await fetch(`http://localhost:5050/api/messages/${currentUser.username}/${selectedUser.username}`, { method:'DELETE' });
                    setMessages([]);
                  }
                  setShowMoreMenu(false);
                }}>🗑 Delete Chat</div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="messages">
        {messages.map((m,i) => {
          const mine = m.sender === currentUser.username;
          if (isMedia(m.text,'image')) {
            return (
              <div key={i} className={`message ${mine?'mine':'theirs'}`}>
                <img src={m.text.replace('[image]:','')} className="message-image" alt="" />
                <span className="msg-time">{m.time}</span>
              </div>
            );
          }
          // video, doc, or plain text...
          return (
            <div key={i} className={`message ${mine?'mine':'theirs'}`}>
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
          onChange={e=>setInput(e.target.value)}
        />
        <Smile size={22} className="icon" onClick={()=>setShowEmojiPicker(v=>!v)} />
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={(_, emoji) => setInput(i=>i+emoji)} />
          </div>
        )}
        <ImageIcon size={20} className="icon" onClick={()=>handleUploadType('image')} />
        <input
          type="file" ref={fileInputRef}
          style={{display:'none'}}
          onChange={handleFileChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
