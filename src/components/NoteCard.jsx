// components/NoteCard.jsx
import React from 'react';

function NoteCard({ text, onClick }) {
  return (
    <div
      className="note"
      onClick={onClick}
      style={{ background: '#fff', padding: 10, margin: '10px 0', borderRadius: 8 }}
    >
      {text}
    </div>
  );
}

export default NoteCard;
