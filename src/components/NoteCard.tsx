// interface Note {
//   id: string;
//   text: string;
//   timestamp: string;
//   similarity?: number;
// }

// interface NoteCardProps {
//   note: Note;
//   showSimilarity?: boolean;
// }

// const NoteCard: React.FC<NoteCardProps> = ({ 
//   note, 
//   showSimilarity = false
// }) => {
//   return (
//     <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <p className="text-gray-600 text-sm">
//           {new Date(note.timestamp).toLocaleString()}
//         </p>
//         {showSimilarity && note.similarity !== undefined && (
//           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//             {Math.round(note.similarity * 100)}% match
//           </span>
//         )}
//       </div>
//       <p className="mt-2 whitespace-pre-line">
//         {note.text}
//       </p>
//     </div>
//   );
// };

// export default NoteCard;



// src/components/NoteCard.tsx
import React, { useState } from 'react';

interface Note {
  id: string;
  text: string;
  timestamp: string;
  similarity?: number;
}

interface NoteCardProps {
  note: Note;
  showSimilarity?: boolean;
  showDeleteButton?: boolean;
  onDelete?: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ 
  note, 
  showSimilarity = false,
  showDeleteButton = false,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(note.id);
    } catch (error) {
      console.error('Failed to delete note:', error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <p className="text-gray-600 text-sm">
          {new Date(note.timestamp).toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          {showSimilarity && note.similarity !== undefined && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {Math.round(note.similarity * 100)}% match
            </span>
          )}
          {showDeleteButton && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
              className="text-red-500 hover:text-red-700 p-1"
              title="Delete note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 whitespace-pre-line">
        {note.text}
      </p>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Note?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-400 flex items-center"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteCard;