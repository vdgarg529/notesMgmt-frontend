import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNotes } from '../services/api';

function Home({ token, notes, setNotes }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const allNotes = await fetchNotes(token);
        setNotes(allNotes);
      } catch (err) {
        alert('Failed to fetch notes');
      }
    };
    loadNotes();
  }, [token, setNotes]);

  return (
    <div>
      <h2>Recent Notes</h2>
      <div>
        {notes.map((note, idx) => (
          <div key={idx} className="note">{note.text}</div>
        ))}
      </div>
      <div style={{ position: 'fixed', bottom: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/add')}>➕</button>
        <button onClick={() => navigate('/query')}>🔍</button>
      </div>
    </div>
  );
}

export default Home;
