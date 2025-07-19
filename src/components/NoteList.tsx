// src/components/NoteList.tsx
import React, { useState } from 'react';
import NoteCard from './NoteCard';

interface Note {
  id: string;
  text: string;
  timestamp: string;
  similarity?: number;
}

interface NoteListProps {
  notes: Note[];
  showSimilarity?: boolean;
}

const NoteList: React.FC<NoteListProps> = ({ notes, showSimilarity = false }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  if (notes.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
        No notes found
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            <NoteCard 
              note={note} 
              showSimilarity={showSimilarity} 
            />
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">Note Details</h3>
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 mb-2 text-sm text-gray-500">
                {new Date(selectedNote.timestamp).toLocaleString()}
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="whitespace-pre-line">{selectedNote.text}</p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedNote(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;