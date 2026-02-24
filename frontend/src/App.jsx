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
    skills: ["React", "NestJS", "Supabase", "JavaScript", "TypeScript", "HTML/CSS", "Vercel", "UI/UX Design", "Code Combat", "Git/GitHub", "REST APIs", "Responsive Design"],
    interests: [
      "🏸 Badminton",
      "🎸 Music", 
      "🍿 Watching",
      "📸 Photography",
      "🧶 Crochet",
      "😋 Eating",
      "🎨 Art",
      "💻 Coding"
    ]
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
      const response = await axios.get(API_URL);
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
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
        {/* First Row - About Me + Interests */}
        <div className="bento-card profile-card" style={{ gridColumn: 'span 1' }}>
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

        {/* Interests Card - RIGHT BESIDE ABOUT ME */}
        <div className="bento-card" style={{ 
          height: 'auto',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          padding: '25px',
          gridColumn: 'span 1'
        }}>
          <h2 style={{ 
            color: '#ff69b4', 
            fontSize: '2rem', 
            marginBottom: '20px',
            borderBottom: '3px dashed #ffb6c1',
            paddingBottom: '10px'
          }}>Interests ✨</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            flex: 1
          }}>
            {profile.interests.map((interest, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '15px 10px',
                borderRadius: '20px',
                border: '2px solid #ffb6c1',
                textAlign: 'center',
                color: '#8b4c61',
                fontSize: '1.1rem',
                fontWeight: '500',
                transition: 'transform 0.2s',
                cursor: 'default',
                boxShadow: '0 2px 8px rgba(255,105,180,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Photo Gallery + Education */}
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
                <p className="education-desc">STEM</p>
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

        {/* Third Row - Skills + Guestbook */}
        <div className="bento-card" style={{ 
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: '25px'
        }}>
          <h2 style={{ 
            color: '#ff69b4', 
            fontSize: '2rem', 
            marginBottom: '15px',
            borderBottom: '3px dashed #ffb6c1',
            paddingBottom: '10px',
            flexShrink: 0
          }}>Skills</h2>
          
          <div style={{ 
            overflowY: 'auto',
            flex: 1,
            paddingRight: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ffb6c1 #fff5f8'
          }}
          className="guestbook-scroll">
            <div className="skills-grid" style={{ marginTop: 0 }}>
              {profile.skills.map((skill, index) => (
                <div key={index} className="skill-item" style={{ 
                  padding: '18px 12px',
                  minHeight: '80px',
                  fontSize: '0.95rem'
                }}>{skill}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bento-card" style={{ 
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: '25px'
        }}>
          <div style={{ 
            overflowY: 'auto',
            flex: 1,
            paddingRight: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ffb6c1 #fff5f8'
          }}
          className="guestbook-scroll">
            <h2 style={{ 
              color: '#ff69b4', 
              fontSize: '2rem', 
              marginBottom: '15px',
              borderBottom: '3px dashed #ffb6c1',
              paddingBottom: '10px'
            }}>Leave a Message!</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  marginBottom: '12px',
                  border: '3px solid #ffb6c1',
                  borderRadius: '25px',
                  fontSize: '15px',
                  backgroundColor: 'white',
                  color: '#8b4c61',
                  outline: 'none'
                }}
                required
              />
              <textarea
                placeholder="Your Message"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  marginBottom: '12px',
                  border: '3px solid #ffb6c1',
                  borderRadius: '25px',
                  fontSize: '15px',
                  minHeight: '100px',
                  backgroundColor: 'white',
                  color: '#8b4c61',
                  outline: 'none',
                  resize: 'none'
                }}
                rows="3"
                required
              />
              <button 
                type="submit"
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(45deg, #ff69b4, #ffb6c1)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 0 #d44d8c',
                  marginBottom: '10px'
                }}
              >
                Send 💌
              </button>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px',
              borderTop: '2px dashed #ffb6c1',
              paddingTop: '15px'
            }}>
              <h3 style={{ color: '#ff69b4', fontSize: '1.4rem', margin: 0 }}>Messages</h3>
              <span style={{ 
                background: '#ffb6c1', 
                color: 'white', 
                padding: '5px 15px', 
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                {messages.length}
              </span>
            </div>

            {loading && (
              <div style={{ textAlign: 'center', padding: '20px', color: '#ffb6c1' }}>
                loading messages...
              </div>
            )}
            
            {error && (
              <div style={{ 
                background: '#fff0f3', 
                color: '#ff4d6d', 
                padding: '15px', 
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                😿 {error}
              </div>
            )}
            
            {!loading && !error && messages.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '30px', 
                color: '#ffb6c1',
                fontStyle: 'italic'
              }}>
                Be the first to leave a message!
              </div>
            )}
            
            {messages.map((msg) => (
              <div key={msg.id} style={{
                background: 'white',
                padding: '15px',
                borderRadius: '15px',
                marginBottom: '10px',
                borderLeft: '5px solid #ff69b4',
                boxShadow: '0 2px 8px rgba(255,105,180,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '5px',
                  borderBottom: '2px dashed #ffb6c1',
                  paddingBottom: '5px'
                }}>
                  <span style={{ color: '#ff69b4', fontWeight: 'bold', fontSize: '1rem' }}>
                    🐱 {msg.name}
                  </span>
                  <span style={{ color: '#ffb6c1', fontSize: '0.8rem' }}>
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p style={{ color: '#8b4c61', margin: 0, fontSize: '0.95rem' }}>{msg.message}</p>
              </div>
            ))}
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
            <img src={selectedImage} alt="gallery" style={{ width: '100%', borderRadius: '15px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;