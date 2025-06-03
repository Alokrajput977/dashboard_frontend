// HelpCenter.jsx
import React, { useState } from 'react';
import {
  FaQuestionCircle,
  FaBook,
  FaVideo,
  FaComments,
  FaLifeRing,
  FaInbox
} from 'react-icons/fa';
import './HelpCenter.css';

const topics = [
  {
    icon: <FaLifeRing />,
    title: 'Start Trading',
    desc: 'Learn the basics and join your first tournaments.',
  },
  {
    icon: <FaQuestionCircle />,
    title: 'FAQ',
    desc: 'Quick answers to common questions.',
  },
  {
    icon: <FaBook />,
    title: 'Knowledge Base',
    desc: 'In-depth articles & guides.',
  },
  {
    icon: <FaVideo />,
    title: 'Video Tutorials',
    desc: 'Step-by-step walkthroughs.',
  },
  {
    icon: <FaInbox />,
    title: 'My Questions',
    desc: 'Review your past inquiries.',
  },
  {
    icon: <FaComments />,
    title: 'Live Chat',
    desc: 'Get help in real-time.',
  },
];

const HelpCenter = () => {
  // search/filter state
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  // ticket form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [ticketCategory, setTicketCategory] = useState('general');

  // filter topics
  const filtered = topics.filter(t =>
    (filter === 'all' || t.title.toLowerCase().includes(filter)) &&
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchSubmit = e => {
    e.preventDefault();
    // You could integrate analytics, etc.
  };

  const handleTicketSubmit = e => {
    e.preventDefault();
    alert(
      `Ticket submitted!\n\nName: ${name}\nEmail: ${email}\nCategory: ${ticketCategory}\nMessage: ${message}`
    );
    // reset
    setName('');
    setEmail('');
    setMessage('');
    setTicketCategory('general');
  };

  return (
    <div className="help-container">
      <h2 className="hc-title">How can we help you?</h2>

      {/* ——— Search + Category Filter ——— */}
      <form onSubmit={handleSearchSubmit} className="hc-search-form">
        <div className="hc-search-input-wrapper">
          <input
            type="text"
            placeholder="Search help topics…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="hc-search-input"
          />
        </div>
        <div className="hc-search-select-wrapper">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="hc-search-select"
          >
            <option value="all">All Categories</option>
            {topics.map(t => (
              <option key={t.title} value={t.title.toLowerCase()}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="hc-search-button">
          🔍
        </button>
      </form>

      {/* ——— Topics Grid ——— */}
      <div className="hc-cards-grid">
        {filtered.map(t => (
          <div key={t.title} className="hc-card">
            <div className="hc-icon">{t.icon}</div>
            <h3 className="hc-card-title">{t.title}</h3>
            <p className="hc-card-desc">{t.desc}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="hc-no-results">No topics match your search.</p>
        )}
      </div>

      {/* ——— Submit a Ticket ——— */}
      <section className="hc-ticket">
        <h3 className="hc-ticket-title">Can’t find what you need?</h3>
        <form onSubmit={handleTicketSubmit} className="hc-ticket-form">
          <div className="field-group half-width">
            <label htmlFor="hc-name">Name</label>
            <input
              id="hc-name"
              type="text"
              placeholder="Your full name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="field-group half-width">
            <label htmlFor="hc-email">Email</label>
            <input
              id="hc-email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="field-group half-width">
            <label htmlFor="hc-category">Category</label>
            <select
              id="hc-category"
              value={ticketCategory}
              onChange={e => setTicketCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
            </select>
          </div>
          <div className="field-group half-width">
            <label htmlFor="hc-message">Message</label>
            <textarea
              id="hc-message"
              placeholder="Type your message here…"
              rows="4"
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="hc-submit-ticket">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default HelpCenter;
