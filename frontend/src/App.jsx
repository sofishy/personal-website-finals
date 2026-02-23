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
  const [selectedImage, setSelectedImage] = useState(null);

  // Personal info
  const profile = {
    name: "Sofia", 
    title: "Iane Sofia Francheska A. Padua",
    bio: "I am a 2nd Year BSIT student from Asia Pacific College,",
    email: "your.email@example.com",
    github: "https://github.com/sofishy",
    linkedin: "www.linkedin.com/in/iane-sofia-padua-005b40322",
    skills: ["React",
             "NestJS", 
             "Supabase", 
             "JavaScript", 
             "TypeScript",  
             "HTML/CSS",  
             "Vercel", 
             "UI/UX Design", 
             "Code Combat",
             "Git/GitHub",
             "REST APIs",
             "Responsive Design"]
  };

  // Photo gallery images 
  const galleryImages = [
    { id: 1, url: "/images/tj1.jpg" },
    { id: 2, url: "/images/fam2.jpg" },
    { id: 3, url: "/images/friend1.jpg" },
    { id: 4, url: "/images/tj2.jpg" },
    { id: 5, url: "/images/fam1.jpg" },
    { id: 6, url: "/images/friend2.jpg" }
  ];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching from:', API_URL);
      const response = await axios.get(API_URL);
      console.log('Received:', response.data);
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      await axios.post(API_URL, { 
        name: name.trim(), 
        message: comment.trim() 
      });
      setName('');
      setComment('');
      fetchMessages();
    } catch (err) {
      console.error('Post error:', err);
      alert('Failed to send message');
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>My Personal Profile Website</h1>
        <p>✨Welcome!✨</p>
      </header>

      {/* Main Content - Bento Grid */}
      <main className="main">
        {/* Profile Card */}
        <div className="bento-card profile-card">
          <h2>About Me</h2>
          <div className="profile-content">
            <div className="profile-avatar">
              <img src="/images/sofia.jpg" alt="Sofia" className="profile-image" />
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-title">{profile.title}</p>
              <p className="profile-bio">{profile.bio}</p>
              <div className="social-links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">🐈‍⬛ GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">💻 LinkedIn</a>
                <a href={`mailto:${profile.email}`} className="social-link">📧 Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery Card */}
        <div className="bento-card gallery-card">
          <h2>Photo Gallery</h2>
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => setSelectedImage(image.url)}
              >
                <img src={image.url} alt="gallery" />
              </div>
            ))}
          </div>
        </div>

        {/* Education Card */}
        <div className="bento-card education-card">
          <h2>Education</h2>
          <div className="education-list">
            
            <div className="education-item">
              <div className="education-year">2024 - Present</div>
              <div className="education-details">
                <h3>Bachelor of Science in Information Technology</h3>
                <p className="education-school">Asia Pacific College</p>
                <p className="education-desc">2nd Year Student</p>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-year">2022 - 2024</div>
              <div className="education-details">
                <h3>Senior High School Graduate</h3>
                <p className="education-school">Pasay City South High School</p>
                <p className="education-desc">Science, Technology, Engineering and Mathematics (STEM)</p>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-year">2018 - 2022</div>
              <div className="education-details">
                <h3>High School Graduate</h3>
                <p className="education-school">Pasay City South High School</p>
                <p className="education-desc">Junior High School</p>
              </div>
            </div>

            <div className="education-item">
              <div className="education-year">2012 - 2018</div>
              <div className="education-details">
                <h3>Elementary Graduate</h3>
                <p className="education-school">Villamor Air Base Elementary School</p>
                <p className="education-desc">Primary Education</p>
              </div>
            </div>
            
          </div>
        </div>

        {/* Skills Card */}
        <div className="bento-card">
          <h2>Skills</h2>
          <div className="skills-grid">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>

        {/* Guestbook Card - FIXED - WON'T MOVE */}
        <div className="bento-card" style={{ 
          height: '500px', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <h2>Leave a Message!</h2>
          
          {/* Form - fixed at top */}
          <form onSubmit={handleSubmit} className="guestbook-form" style={{ flexShrink: 0 }}>
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
              rows="3"
              required
            />
            <button type="submit" className="submit-btn">
              Send
            </button>
          </form>

          {/* Messages Header - fixed below form */}
          <div className="messages-header" style={{ flexShrink: 0 }}>
            <h3>Messages</h3>
            <span className="message-count">{messages.length}</span>
          </div>

          {/* Messages Container - ONLY THIS SCROLLS */}
          <div className="messages-container" style={{ 
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
            position: 'relative'
          }}>
            {loading && <div className="loading">loading messages...</div>}
            
            {error && (
              <div className="error-message">
                😿 {error}
              </div>
            )}
            
            {!loading && !error && messages.length === 0 && (
              <div className="no-messages">
                Be the first to leave a message!
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
        <p>© 2026 {profile.title}</p>
      </footer>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="gallery" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;