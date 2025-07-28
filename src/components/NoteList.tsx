// import React, { useState } from 'react';
// import NoteCard from './NoteCard';

// interface Note {
//   id: string;
//   text: string;
//   timestamp: string;
//   similarity?: number;
// }

// interface NoteListProps {
//   notes: Note[];
//   showSimilarity?: boolean;
//   showDeleteButton?: boolean;
//   onDelete?: (noteId: string) => void;
// }

// const NoteList: React.FC<NoteListProps> = ({ 
//   notes, 
//   showSimilarity = false,
//   showDeleteButton = false,
//   onDelete
// }) => {
//   const [selectedNote, setSelectedNote] = useState<Note | null>(null);

//   if (notes.length === 0) {
//     return (
//       <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
//         No notes found
//       </div>
//     );
//   }

//   const handleNoteClick = (note: Note, event: React.MouseEvent) => {
//     // Don't open modal if clicking on delete button
//     if ((event.target as HTMLElement).closest('button')) {
//       return;
//     }
//     setSelectedNote(note);
//   };

//   return (
//     <div className="mt-6">
//       <div className="grid grid-cols-1 gap-4">
//         {notes.map((note) => (
//           <div 
//             key={note.id}
//             className="cursor-pointer"
//             onClick={(e) => handleNoteClick(note, e)}
//           >
//             <NoteCard 
//               note={note} 
//               showSimilarity={showSimilarity}
//               showDeleteButton={showDeleteButton}
//               onDelete={onDelete}
//             />
//           </div>
//         ))}
//       </div>

//       {selectedNote && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-xl font-semibold">Note Details</h3>
//                 <button 
//                   onClick={() => setSelectedNote(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="mt-4 mb-2 text-sm text-gray-500">
//                 {new Date(selectedNote.timestamp).toLocaleString()}
//               </div>
              
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <p className="whitespace-pre-line">{selectedNote.text}</p>
//               </div>
              
//               <div className="mt-6 flex justify-between">
//                 {showDeleteButton && onDelete && (
//                   <button
//                     onClick={() => {
//                       onDelete(selectedNote.id);
//                       setSelectedNote(null);
//                     }}
//                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                   >
//                     Delete Note
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setSelectedNote(null)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 ml-auto"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoteList;


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
  showDeleteButton?: boolean;
  showEditButton?: boolean;
  onDelete?: (noteId: string) => void;
  onEdit?: (noteId: string, newText: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ 
  notes, 
  showSimilarity = false,
  showDeleteButton = false,
  showEditButton = false,
  onDelete,
  onEdit
}) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (notes.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
        No notes found
      </div>
    );
  }

  const handleNoteClick = (note: Note, event: React.MouseEvent) => {
    // Don't open modal if clicking on delete/edit button or textarea
    if ((event.target as HTMLElement).closest('button') || 
        (event.target as HTMLElement).closest('textarea')) {
      return;
    }
    setSelectedNote(note);
    setEditText(note.text);
    setIsEditing(false);
  };

  const handleModalEdit = async () => {
    if (!onEdit || !selectedNote || !editText.trim()) return;
    
    setIsSaving(true);
    try {
      await onEdit(selectedNote.id, editText.trim());
      setSelectedNote(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to edit note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalDelete = async () => {
    if (!onDelete || !selectedNote) return;
    
    try {
      await onDelete(selectedNote.id);
      setSelectedNote(null);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4">
        {notes.map((note) => (
          <div 
            key={note.id}
            className="cursor-pointer"
            onClick={(e) => handleNoteClick(note, e)}
          >
            <NoteCard 
              note={note} 
              showSimilarity={showSimilarity}
              showDeleteButton={showDeleteButton}
              showEditButton={showEditButton}
              onDelete={onDelete}
              onEdit={onEdit}
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
                  onClick={() => {
                    setSelectedNote(null);
                    setIsEditing(false);
                  }}
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
              
              {isEditing ? (
                <div className="mt-4">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg resize-none min-h-[200px]"
                    placeholder="Edit your note..."
                    autoFocus
                  />
                </div>
              ) : (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-line">{selectedNote.text}</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <div className="flex space-x-2">
                  {showDeleteButton && onDelete && (
                    <button
                      onClick={handleModalDelete}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      disabled={isSaving}
                    >
                      Delete Note
                    </button>
                  )}
                  {showEditButton && onEdit && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit Note
                    </button>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditText(selectedNote.text);
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleModalEdit}
                        disabled={isSaving || !editText.trim()}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-green-400 flex items-center"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedNote(null);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;