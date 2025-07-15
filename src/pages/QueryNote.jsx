// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useSpeechRecognition from '../hooks/useSpeechRecognition';

// function QueryNote({ setAiResponse, setRelatedNotes, token }) {
//   const [query, setQuery] = useState('');
//   const [showSearch, setShowSearch] = useState(false);
//   const navigate = useNavigate();

//   const handleSpeechResult = transcript => {
//     setQuery(transcript);
//     setShowSearch(true);
//   };

//   const { startListening } = useSpeechRecognition(handleSpeechResult);

//   const handleSearch = async () => {
//     try {
//       const res = await fetch('http://localhost:8000/notes/query', {
//         method: 'POST',
//         headers: { 'Authorization': token, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });
//       const data = await res.json();
//       setAiResponse(data.response || '');
//       setRelatedNotes(data.notes || []);
//       navigate('/result');
//     } catch (err) {
//       alert('Query failed');
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#222', color: '#fff', padding: '20px' }}>
//       <h2>Query Notes</h2>
//       <textarea value={query} onChange={e => setQuery(e.target.value)} rows="3" style={{ width: '100%' }} />
//       <button onClick={startListening}>🎤</button>
//       {showSearch && <button onClick={handleSearch}>Search</button>}
//     </div>
//   );
// }

// export default QueryNote;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

function QueryNote({ setAiResponse, setRelatedNotes, token }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSpeechResult = transcript => {
    setQuery(transcript);
  };

  const { startListening } = useSpeechRecognition(handleSpeechResult);

  const handleSearch = async () => {
    if (!query.trim()) return alert('Query cannot be empty');
    try {
      const res = await fetch('http://localhost:8000/notes/query', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setAiResponse(data.response || '');
      setRelatedNotes(data.notes || []);
      navigate('/result');
    } catch (err) {
      alert('Query failed');
    }
  };

  return (
    <div style={{ backgroundColor: '#222', color: '#fff', padding: '20px' }}>
      <h2>Query Notes</h2>
      <textarea
        value={query}
        onChange={e => setQuery(e.target.value)}
        rows="3"
        style={{ width: '100%' }}
        placeholder="Ask something..."
      />
      <button onClick={startListening}>🎤</button>
      <button onClick={handleSearch} disabled={!query.trim()}>Search</button>
    </div>
  );
}

export default QueryNote;
