// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { addNote } from '../services/api';
// import useSpeechRecognition from '../hooks/useSpeechRecognition';

// function AddNote({ token, setNotes }) {
//   const [text, setText] = useState('');
//   const [showSave, setShowSave] = useState(false);
//   const navigate = useNavigate();

//   const handleSpeechResult = transcript => {
//     setText(transcript);
//     setShowSave(true);
//   };

//   const { startListening } = useSpeechRecognition(handleSpeechResult);

//   const handleSave = async () => {
//     try {
//       const newNote = await addNote(token, text);
//       setNotes(prev => [newNote, ...prev]);
//       navigate('/home');
//     } catch (err) {
//       alert('Failed to save note');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Note</h2>
//       <textarea value={text} onChange={e => setText(e.target.value)} rows="5" style={{ width: '100%' }} />
//       <button onClick={startListening}>🎤</button>
//       {showSave && <button onClick={handleSave}>Save</button>}
//     </div>
//   );
// }

// export default AddNote;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../services/api';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

function AddNote({ token, setNotes }) {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSpeechResult = transcript => {
    setText(transcript);
  };

  const { startListening } = useSpeechRecognition(handleSpeechResult);

  const handleSave = async () => {
    if (!text.trim()) return alert('Note cannot be empty');
    try {
      const newNote = await addNote(token, text);
      setNotes(prev => [newNote, ...prev]);
      navigate('/home');
    } catch (err) {
      alert('Failed to save note');
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows="5"
        style={{ width: '100%' }}
        placeholder="Start typing or use the mic..."
      />
      <button onClick={startListening}>🎤</button>
      <button onClick={handleSave} disabled={!text.trim()}>Save</button>
    </div>
  );
}

export default AddNote;
