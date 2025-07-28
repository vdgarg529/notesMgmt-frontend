// import React, { useState, useRef } from 'react';
// import SpeechToTextInput from '../components/SpeechToTextInput';
// import NoteList from '../components/NoteList';
// import NoteCard from '../components/NoteCard';
// import { addNote, queryNotes } from '../services/api';
// import Navigation from '../components/Navigation';

// const Dashboard: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [results, setResults] = useState<any>(null);
//   const [loading, setLoading] = useState({ save: false, search: false });
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const handleAddNote = async () => {
//     if (!inputText.trim()) return;
    
//     setLoading({ ...loading, save: true });
//     try {
//       await addNote(inputText);
//       setInputText('');
//       setSaveSuccess(true);
      
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//       saveTimeoutRef.current = setTimeout(() => {
//         setSaveSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Failed to add note:', error);
//     } finally {
//       setLoading({ ...loading, save: false });
//     }
//   };

//   const handleQueryNotes = async () => {
//     if (!inputText.trim()) return;
    
//     setLoading({ ...loading, search: true });
//     try {
//       const response = await queryNotes(inputText);
//       setResults(response);
//     } catch (error) {
//       console.error('Failed to query notes:', error);
//     } finally {
//       setLoading({ ...loading, search: false });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
      
//       <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-bold text-center mb-6">Note Assistant</h2>
          
//           <div className="mb-6">
//             <SpeechToTextInput 
//               onTextChange={setInputText}
//               initialText={inputText}
//               placeholder="Speak or type to add/search notes..."
//             />
//           </div>
          
//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//             <button
//               onClick={handleAddNote}
//               disabled={loading.save || !inputText.trim()}
//               className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
//                 loading.save || !inputText.trim()
//                   ? 'bg-blue-400'
//                   : 'bg-blue-500 hover:bg-blue-600'
//               }`}
//             >
//               {loading.save ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 'Save Note'
//               )}
//             </button>
            
//             <button
//               onClick={handleQueryNotes}
//               disabled={loading.search || !inputText.trim()}
//               className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
//                 loading.search || !inputText.trim()
//                   ? 'bg-green-400'
//                   : 'bg-green-500 hover:bg-green-600'
//               }`}
//             >
//               {loading.search ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Searching...
//                 </>
//               ) : (
//                 'Search Note'
//               )}
//             </button>
//           </div>
          
//           {saveSuccess && (
//             <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
//               Note saved successfully!
//             </div>
//           )}
          
//           {results && !loading.search && (
//             <div className="mt-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-medium">Search Results</h3>
//                 <span className="text-sm text-gray-500">
//                   {results.count} {results.count === 1 ? 'result' : 'results'} found
//                 </span>
//               </div>
              
//               <div className="mb-6">
//                 <h4 className="text-md font-medium mb-2">Summary</h4>
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <p className="whitespace-pre-line">{results.summary}</p>
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <h4 className="text-md font-medium mb-2">Matching Notes</h4>
//                 <NoteList notes={results.results} showSimilarity={true} />
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// src/pages/Dashboard.tsx
import React, { useState, useRef } from 'react';
import SpeechToTextInput from '../components/SpeechToTextInput';
import NoteList from '../components/NoteList';
import { addNote, queryNotes, deleteNote } from '../services/api';
import Navigation from '../components/Navigation';

const Dashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState({ save: false, search: false });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const deleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddNote = async () => {
    if (!inputText.trim()) return;
    
    setLoading({ ...loading, save: true });
    try {
      await addNote(inputText);
      setInputText('');
      setSaveSuccess(true);
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      setLoading({ ...loading, save: false });
    }
  };

  const handleQueryNotes = async () => {
    if (!inputText.trim()) return;
    
    setLoading({ ...loading, search: true });
    try {
      const response = await queryNotes(inputText);
      setResults(response);
    } catch (error) {
      console.error('Failed to query notes:', error);
    } finally {
      setLoading({ ...loading, search: false });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      
      // Update results by removing the deleted note
      if (results && results.results) {
        const updatedResults = {
          ...results,
          results: results.results.filter((note: any) => note.id !== noteId),
          count: results.count - 1
        };
        setResults(updatedResults);
      }
      
      // Show success message
      setDeleteSuccess('Note deleted successfully!');
      
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
      deleteTimeoutRef.current = setTimeout(() => {
        setDeleteSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Note Assistant</h2>
          
          <div className="mb-6">
            <SpeechToTextInput 
              onTextChange={setInputText}
              initialText={inputText}
              placeholder="Speak or type to add/search notes..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleAddNote}
              disabled={loading.save || !inputText.trim()}
              className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
                loading.save || !inputText.trim()
                  ? 'bg-blue-400'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading.save ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Note'
              )}
            </button>
            
            <button
              onClick={handleQueryNotes}
              disabled={loading.search || !inputText.trim()}
              className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${
                loading.search || !inputText.trim()
                  ? 'bg-green-400'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading.search ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                'Search Note'
              )}
            </button>
          </div>
          
          {saveSuccess && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
              Note saved successfully!
            </div>
          )}
          
          {deleteSuccess && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
              {deleteSuccess}
            </div>
          )}
          
          {results && !loading.search && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Search Results</h3>
                <span className="text-sm text-gray-500">
                  {results.count} {results.count === 1 ? 'result' : 'results'} found
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-md font-medium mb-2">Summary</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{results.summary}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-md font-medium mb-2">Matching Notes</h4>
                <NoteList 
                  notes={results.results} 
                  showSimilarity={true}
                  showDeleteButton={true}
                  onDelete={handleDeleteNote}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;