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
    name: "Your Name",
    title: "Web Developer | Cat Lover | Student",
    bio: "This is your personal bio. Talk about yourself, your skills, and what you're passionate about!",
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    skills: ["React", "NestJS", "Supabase", "JavaScript", "HTML/CSS", "Vercel"]
  };

  // Gallery images
  const galleryImages = [
    { id: 1, url: "/images/tj1.jpg" },
    { id: 2, url: "/images/tj2.jpg" },
    { id: 3, url: "/images/fam1.jpg" },
    { id: 4, url: "/images/fam2.jpg" },
    { id: 5, url: "/images/friend1.jpg" },
    { id: 6, url: "/images/friend2.jpg" }
  ];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMessages(response.data || []);
    } catch (err) {
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
      alert('Failed to send message');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>personal website</h1>
        <p>✨ welcome to my little corner of the internet ✨</p>
      </header>

      <main className="main">
        {/* Profile Card */}
        <div className="bento-card profile-card">
          <h2>😸 about me</h2>
          <div className="profile-content">
            <div className="profile-avatar">😺</div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.name}</h1>
              <p className="profile-title">{profile.title}</p>
              <p className="profile-bio">{profile.bio}</p>
              <div className="social-links">
                <a href={profile.github} className="social-link">🐱 GitHub</a>
                <a href={profile.linkedin} className="social-link">😺 LinkedIn</a>
                <a href={`mailto:${profile.email}`} className="social-link">📧 Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bento-card gallery-card">
          <h2>😸 photo gallery</h2>
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

        {/* Skills Card */}
        <div className="bento-card">
          <h2>😸 skills</h2>
          <div className="skills-grid">
            {profile.skills.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>

        {/* Guestbook Card */}
        <div className="bento-card">
          <h2>😸 leave a message</h2>
          
          {/* Form */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
            <input
              type="text"
              placeholder="your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '10px',
                border: '3px solid #ffb6c1',
                borderRadius: '25px',
                fontSize: '16px'
              }}
              required
            />
            <textarea
              placeholder="your message..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '10px',
                border: '3px solid #ffb6c1',
                borderRadius: '25px',
                fontSize: '16px',
                minHeight: '100px'
              }}
              rows="3"
              required
            />
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(45deg, #ff69b4, #ffb6c1)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.2rem',
                cursor: 'pointer'
              }}
            >
              send message 🐱
            </button>
          </form>

          {/* Messages */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ color: '#ff69b4' }}>messages</h3>
              <span style={{ background: '#ffb6c1', color: 'white', padding: '5px 15px', borderRadius: '25px' }}>
                {messages.length}
              </span>
            </div>

            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {loading && <div style={{ textAlign: 'center', padding: '20px' }}>loading messages...</div>}
              
              {error && (
                <div style={{ background: '#fff0f3', color: '#ff4d6d', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>
                  😿 {error}
                </div>
              )}
              
              {!loading && !error && messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: '#ffb6c1' }}>
                  be the first to leave a message!
                </div>
              )}
              
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '15px',
                  marginBottom: '10px',
                  borderLeft: '5px solid #ff69b4'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ color: '#ff69b4', fontWeight: 'bold' }}>🐱 {msg.name}</span>
                    <span style={{ color: '#ffb6c1', fontSize: '0.8rem' }}>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ color: '#8b4c61' }}>{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>© 2026 {profile.name} • made with 😺 and 🐱</p>
      </footer>

      {/* Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setSelectedImage(null)}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '25px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              fontSize: '2rem',
              cursor: 'pointer'
            }} onClick={() => setSelectedImage(null)}>&times;</span>
            <img src={selectedImage} alt="gallery" style={{ width: '100%', borderRadius: '15px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;