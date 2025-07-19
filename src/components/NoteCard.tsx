// src/components/NoteCard.tsx
// import React from 'react';

interface Note {
  id: string;
  text: string;
  timestamp: string;
  similarity?: number;
}

interface NoteCardProps {
  note: Note;
  onSaveResult?: () => void;
  showSimilarity?: boolean;
  showSaveButton?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  onSaveResult, 
  showSimilarity = false,
  showSaveButton = false
}) => {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-600 text-sm">
          {new Date(note.timestamp).toLocaleString()}
        </p>
        {showSimilarity && note.similarity !== undefined && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {Math.round(note.similarity * 100)}% match
          </span>
        )}
      </div>
      <p className="mt-2 whitespace-pre-line">
        {note.text}
      </p>
      
      {showSaveButton && onSaveResult && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSaveResult}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            Save This Result
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteCard;