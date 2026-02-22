import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'https://personal-website-finals-ivory.vercel.app/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Personal info
  const profile = {
    name: "Your Name",
    title: "Web Developer | Designer | Student",
    bio: "This is your personal bio. Talk about yourself, your skills, and what you're passionate about!",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    skills: ["React", "Vue.js", "NestJS", "Supabase", "Vercel", "JavaScript", "HTML/CSS"]
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    try {
      await axios.post(API_URL, { name, message: comment });
      setName('');
      setComment('');
      fetchMessages();
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subtitle">{profile.title}</p>
          <p className="hero-bio">{profile.bio}</p>
          
          <div className="social-links">
            <a href={profile.github} target="_blank" className="social-link">GitHub</a>
            <a href={profile.linkedin} target="_blank" className="social-link">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="social-link">Email</a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-card">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <section className="guestbook">
        <div className="container">
          <h2 className="section-title">📝 Leave a Message</h2>
          
          <form onSubmit={handleSubmit} className="guestbook-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
            <textarea
              placeholder="Your Message"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-textarea"
              rows="4"
              required
            />
            <button type="submit" className="submit-btn">
              Sign Guestbook
            </button>
          </form>

          <div className="messages">
            <h3>Messages ({messages.length})</h3>
            {messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <strong>{msg.name}</strong>
                  <span className="message-date">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="message-text">{msg.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <p className="no-messages">No messages yet. Be the first to say hi! 👋</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;