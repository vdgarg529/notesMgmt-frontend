import React from 'react';

function QueryResult({ aiResponse, relatedNotes }) {
  const showPopup = text => alert(text);

  return (
    <div>
      <h2>AI Response</h2>
      <div>{aiResponse}</div>

      <h3>Related Notes</h3>
      <div>
        {relatedNotes.map((note, idx) => (
          <div key={idx} className="note" onClick={() => showPopup(note.text)}>
            {note.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueryResult;
