// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { getAllNotes, deleteNote, downloadNotes } from '../services/api';
// import NoteList from '../components/NoteList';
// import Navigation from '../components/Navigation';

// interface Note {
//   id: string;
//   text: string;
//   timestamp: string;
// }

// const HistoryPage: React.FC = () => {
//   const { token } = useAuth();
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [deleteSuccess, setDeleteSuccess] = useState('');
//   const [isDownloading, setIsDownloading] = useState(false);
//   const navigate = useNavigate();
//   const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         // Extract user ID from JWT token
//         if (!token) return;
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const userId = payload.sub;
        
//         const response = await getAllNotes(userId);
//         setNotes(response.notes || []);
//       } catch (err) {
//         setError('Failed to load notes');
//         console.error('Failed to load notes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotes();
//   }, [token]);

//   const handleDeleteNote = async (noteId: string) => {
//     try {
//       await deleteNote(noteId);
      
//       // Remove the deleted note from the state
//       setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      
//       // Show success message
//       setDeleteSuccess('Note deleted successfully!');
      
//       if (deleteTimeoutRef.current) {
//         clearTimeout(deleteTimeoutRef.current);
//       }
//       deleteTimeoutRef.current = setTimeout(() => {
//         setDeleteSuccess('');
//       }, 3000);
//     } catch (error) {
//       console.error('Failed to delete note:', error);
//       setError('Failed to delete note');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     if (!token) return;
    
//     try {
//       setIsDownloading(true);
//       setError('');
      
//       // Extract user ID from token
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const userId = payload.sub;
      
//       // Download the PDF blob
//       const pdfBlob = await downloadNotes(userId);
      
//       // Create download link
//       const url = window.URL.createObjectURL(new Blob([pdfBlob]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'my-notes.pdf');
//       document.body.appendChild(link);
//       link.click();
      
//       // Clean up
//       if (link.parentNode) {
//         link.parentNode.removeChild(link);
//       }
//       window.URL.revokeObjectURL(url);
      
//     } catch (err) {
//       console.error('Download failed:', err);
//       setError('Failed to download notes');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <h2 className="text-2xl font-bold">Note History</h2>
            
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => navigate('/')}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Back to Dashboard
//               </button>
              
//               <button
//                 onClick={handleDownloadPDF}
//                 disabled={isDownloading || notes.length === 0}
//                 className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
//                   isDownloading || notes.length === 0
//                     ? 'bg-gray-300 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700 text-white'
//                 }`}
//               >
//                 {isDownloading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Preparing...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Download PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           {deleteSuccess && (
//             <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
//               {deleteSuccess}
//             </div>
//           )}
          
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : notes.length === 0 ? (
//             <div className="p-6 text-center text-gray-500">
//               <p className="mb-4">You haven't created any notes yet.</p>
//               <button
//                 onClick={() => navigate('/')}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Create Your First Note
//               </button>
//             </div>
//           ) : (
//             <div>
//               <div className="mb-4 text-sm text-gray-600">
//                 Total notes: {notes.length}
//               </div>
//               <NoteList 
//                 notes={notes} 
//                 showSimilarity={false}
//                 showDeleteButton={true}
//                 onDelete={handleDeleteNote}
//               />
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HistoryPage;


// src/pages/HistoryPage.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { getAllNotes, deleteNote, downloadNotes, editNote } from '../services/api';
// import NoteList from '../components/NoteList';
// import Navigation from '../components/Navigation';

// interface Note {
//   id: string;
//   text: string;
//   timestamp: string;
// }

// const HistoryPage: React.FC = () => {
//   const { token } = useAuth();
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [deleteSuccess, setDeleteSuccess] = useState('');
//   const [editSuccess, setEditSuccess] = useState('');
//   const [isDownloading, setIsDownloading] = useState(false);
//   const navigate = useNavigate();
//   const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const editTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const showSuccessMessage = (message: string, setter: (msg: string) => void, timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
//     setter(message);
    
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => {
//       setter('');
//     }, 3000);
//   };

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         // Extract user ID from JWT token
//         if (!token) return;
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const userId = payload.sub;
        
//         const response = await getAllNotes(userId);
//         setNotes(response.notes || []);
//       } catch (err) {
//         setError('Failed to load notes');
//         console.error('Failed to load notes:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotes();
//   }, [token]);

//   const handleDeleteNote = async (noteId: string) => {
//     try {
//       await deleteNote(noteId);
      
//       // Remove the deleted note from the state
//       setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      
//       showSuccessMessage('Note deleted successfully!', setDeleteSuccess, deleteTimeoutRef);
//     } catch (error) {
//       console.error('Failed to delete note:', error);
//       setError('Failed to delete note');
//       setTimeout(() => setError(''), 3000);
//     }
//   };

//   const handleEditNote = async (noteId: string, newText: string) => {
//     try {
//       await editNote(noteId, newText);
      
//       // Update the note in the state
//       setNotes(prevNotes => 
//         prevNotes.map(note => 
//           note.id === noteId 
//             ? { ...note, text: newText, timestamp: new Date().toISOString() }
//             : note
//         )
//       );
      
//       showSuccessMessage('Note updated successfully!', setEditSuccess, editTimeoutRef);
//     } catch (error) {
//       console.error('Failed to edit note:', error);
//       setError('Failed to edit note');
//       setTimeout(() => setError(''), 3000);
//       throw error; // Re-throw to handle in component
//     }
//   };

//   const handleDownloadPDF = async () => {
//     if (!token) return;
    
//     try {
//       setIsDownloading(true);
//       setError('');
      
//       // Extract user ID from token
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const userId = payload.sub;
      
//       // Download the PDF blob
//       const pdfBlob = await downloadNotes(userId);
      
//       // Create download link
//       const url = window.URL.createObjectURL(new Blob([pdfBlob]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'my-notes.pdf');
//       document.body.appendChild(link);
//       link.click();
      
//       // Clean up
//       if (link.parentNode) {
//         link.parentNode.removeChild(link);
//       }
//       window.URL.revokeObjectURL(url);
      
//     } catch (err) {
//       console.error('Download failed:', err);
//       setError('Failed to download notes');
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//             <h2 className="text-2xl font-bold">Note History</h2>
            
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => navigate('/')}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//               >
//                 Back to Dashboard
//               </button>
              
//               <button
//                 onClick={handleDownloadPDF}
//                 disabled={isDownloading || notes.length === 0}
//                 className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
//                   isDownloading || notes.length === 0
//                     ? 'bg-gray-300 cursor-not-allowed'
//                     : 'bg-green-600 hover:bg-green-700 text-white'
//                 }`}
//               >
//                 {isDownloading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Preparing...
//                   </>
//                 ) : (
//                   <>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                     Download PDF
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
          
//           {/* Success Messages */}
//           {deleteSuccess && (
//             <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
//               {deleteSuccess}
//             </div>
//           )}
          
//           {editSuccess && (
//             <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
//               {editSuccess}
//             </div>
//           )}
          
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}
          
//           {loading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : notes.length === 0 ? (
//             <div className="p-6 text-center text-gray-500">
//               <p className="mb-4">You haven't created any notes yet.</p>
//               <button
//                 onClick={() => navigate('/')}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Create Your First Note
//               </button>
//             </div>
//           ) : (
//             <div>
//               <div className="mb-4 text-sm text-gray-600">
//                 Total notes: {notes.length}
//               </div>
//               <NoteList 
//                 notes={notes} 
//                 showSimilarity={false}
//                 showDeleteButton={true}
//                 showEditButton={true}
//                 onDelete={handleDeleteNote}
//                 onEdit={handleEditNote}
//               />
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HistoryPage;





import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllNotes, deleteNote, downloadNotes, editNote } from '../services/api';
import NoteList from '../components/NoteList';
import Navigation from '../components/Navigation';

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

// ✅ Custom non-deprecated ref type
type TimeoutRef = { current: number | null };

const HistoryPage: React.FC = () => {
  const { token } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();

  // ✅ Safe refs with no deprecation
  const deleteTimeoutRef = useRef<number | null>(null);
  const editTimeoutRef = useRef<number | null>(null);

  const showSuccessMessage = (
    message: string,
    setter: (msg: string) => void,
    timeoutRef: TimeoutRef
  ) => {
    setter(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setter('');
    }, 3000);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;

        const response = await getAllNotes(userId);
        setNotes(response.notes || []);
      } catch (err) {
        setError('Failed to load notes');
        console.error('Failed to load notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [token]);

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      showSuccessMessage('Note deleted successfully!', setDeleteSuccess, deleteTimeoutRef);
    } catch (error) {
      console.error('Failed to delete note:', error);
      setError('Failed to delete note');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditNote = async (noteId: string, newText: string) => {
    try {
      await editNote(noteId, newText);
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === noteId
            ? { ...note, text: newText, timestamp: new Date().toISOString() }
            : note
        )
      );
      showSuccessMessage('Note updated successfully!', setEditSuccess, editTimeoutRef);
    } catch (error) {
      console.error('Failed to edit note:', error);
      setError('Failed to edit note');
      setTimeout(() => setError(''), 3000);
      throw error;
    }
  };

  const handleDownloadPDF = async () => {
    if (!token) return;

    try {
      setIsDownloading(true);
      setError('');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;

      const pdfBlob = await downloadNotes(userId);

      const url = window.URL.createObjectURL(new Blob([pdfBlob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my-notes.pdf');
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download notes');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold">Note History</h2>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Dashboard
              </button>

              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading || notes.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  isDownloading || notes.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Preparing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>

          {deleteSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
              {deleteSuccess}
            </div>
          )}

          {editSuccess && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
              {editSuccess}
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : notes.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p className="mb-4">You haven't created any notes yet.</p>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Your First Note
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                Total notes: {notes.length}
              </div>
              <NoteList
                notes={notes}
                showSimilarity={false}
                showDeleteButton={true}
                showEditButton={true}
                onDelete={handleDeleteNote}
                onEdit={handleEditNote}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;



