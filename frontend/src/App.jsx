import { useState, useEffect } from 'react'
import axios from 'axios'

// YOUR BACKEND URL - MAKE SURE THIS IS EXACTLY RIGHT
const API_URL = 'https://personal-website-finals-ivory.vercel.app/api/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching from:', API_URL);
      const response = await axios.get(API_URL);
      console.log('Response:', response.data);
      setMessages(response.data || []);
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    try {
      await axios.post(API_URL, { name, message: comment });
      setName('');
      setComment('');
      fetchMessages();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Personal Website</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Your Message"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', height: '100px' }}
        />
        <button onClick={handleSubmit}>Send Message</button>
      </div>

      <h3>Messages ({messages.length})</h3>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#ffeeee' }}>
          ❌ {error}
        </div>
      )}
      
      {messages.map(msg => (
        <div key={msg.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <strong>{msg.name}</strong> - {new Date(msg.created_at).toLocaleDateString()}
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
  );
}

export default App;