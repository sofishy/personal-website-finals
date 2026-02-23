import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Your deployed backend URL
const API_URL = 'https://personal-website-finals-ivory.vercel.app/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Personal info - UPDATE THIS WITH YOUR INFO
  const profile = {
    name: "Your Name", // Change this
    title: "Web Developer | Cat Lover | Student", // Change this
    bio: "This is your personal bio. Talk about yourself, your skills, and what you're passionate about! I love coding, cats, and creating beautiful web experiences.", // Change this
    email: "your.email@example.com", // Change this
    github: "https://github.com/yourusername", // Change this
    linkedin: "https://linkedin.com/in/yourusername", // Change this
    skills: ["React", "NestJS", "Supabase", "JavaScript", "HTML/CSS", "Vercel", "UI/UX Design", "Cat Wrangling"] // Change these
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📡 Fetching messages...');
      const response = await axios.get(API_URL);
      setMessages(response.data || []);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    try {
      await axios.post(API_URL, { 
        name: name.trim(), 
        message: comment.trim() 
      });
      setName('');
      setComment('');
      fetchMessages();
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Failed to send message');
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>personal website</h1>
        <p>✨ welcome to my little corner of the internet ✨</p>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="main">
        {/* Profile Card - Full Width */}
        <div className="bento-card profile-card">
          <h2>😸 about me</h2>
          <div className="profile-content">
            <div className="profile-avatar">
              😺
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-title">{profile.title}</p>
              <p className="profile-bio">{profile.bio}</p>
              
              <div className="social-links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
                  🐱 GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  😺 LinkedIn
                </a>
                <a href={`mailto:${profile.email}`} className="social-link">
                  📧 Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Card */}
        <div className="bento-card">
          <h2>😸 skills</h2>
          <div className="skills-grid">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Guestbook Card */}
        <div className="bento-card">
          <h2>😸 leave a message</h2>
          
          <form onSubmit={handleSubmit} className="guestbook-form">
            <input
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
            <textarea
              placeholder="your message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-textarea"
              rows="3"
              required
            />
            <button type="submit" className="submit-btn">
              send message
            </button>
          </form>

          <div className="messages-header">
            <h3>messages</h3>
            <span className="message-count">{messages.length}</span>
          </div>

          <div className="messages-container">
            {loading && <div className="loading">loading messages...</div>}
            
            {error && (
              <div className="error-message">
                😿 {error}
              </div>
            )}
            
            {!loading && !error && messages.length === 0 && (
              <div className="no-messages">
                be the first to leave a message!
              </div>
            )}
            
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className="message-card">
                  <div className="message-header">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-date">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="message-text">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 {profile.name} • made with 😺 and 🐱</p>
      </footer>
    </div>
  );
}

export default App;