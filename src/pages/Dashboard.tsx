import React, { useState, useRef } from 'react';
import SpeechToTextInput from '../components/SpeechToTextInput';
import NoteList from '../components/NoteList';
import { addNote, queryNotes, deleteNote, editNote } from '../services/api';
import Navigation from '../components/Navigation';

type TimeoutRef = { current: number | null };

const Dashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState({ save: false, search: false });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState('');
  const [editSuccess, setEditSuccess] = useState('');

  const saveTimeoutRef = useRef<number | null>(null);
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

  const handleAddNote = async () => {
    if (!inputText.trim()) return;

    const textToSave = inputText.trim();
    setLoading(prev => ({ ...prev, save: true }));
    
    try {
      await addNote(textToSave);
      
      // Clear the text box immediately after successful save
      setInputText('');
      setSaveSuccess(true);

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = window.setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add note:', error);
      // Don't clear text on error so user can retry
    } finally {
      setLoading(prev => ({ ...prev, save: false }));
    }
  };

  const handleQueryNotes = async () => {
    if (!inputText.trim()) return;

    const queryText = inputText.trim();
    setLoading(prev => ({ ...prev, search: true }));
    
    try {
      const response = await queryNotes(queryText);
      setResults(response);
      
      // Clear the text box immediately after successful search
      setInputText('');
    } catch (error) {
      console.error('Failed to query notes:', error);
      // Don't clear text on error so user can retry
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);

      if (results && results.results) {
        const updatedResults = {
          ...results,
          results: results.results.filter((note: any) => note.id !== noteId),
          count: results.count - 1
        };
        setResults(updatedResults);
      }

      showSuccessMessage('Note deleted successfully!', setDeleteSuccess, deleteTimeoutRef);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleEditNote = async (noteId: string, newText: string) => {
    try {
      await editNote(noteId, newText);

      if (results && results.results) {
        const updatedResults = {
          ...results,
          results: results.results.map((note: any) =>
            note.id === noteId
              ? { ...note, text: newText, timestamp: new Date().toISOString() }
              : note
          )
        };
        setResults(updatedResults);
      }

      showSuccessMessage('Note updated successfully!', setEditSuccess, editTimeoutRef);
    } catch (error) {
      console.error('Failed to edit note:', error);
      throw error;
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (event.shiftKey) {
          handleQueryNotes();
        } else {
          handleAddNote();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" onKeyDown={handleKeyDown}>
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
<div className="flex justify-center">
  <h2 className="text-3xl font-bold mb-6 px-6 py-2 inline-block rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300">
    <span className="inline-flex items-center gap-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-sm">
      🎨 Note Assistant ✨
    </span>
  </h2>
</div>







          <div className="mb-6">
            <SpeechToTextInput
              onTextChange={setInputText}
              initialText={inputText}
              placeholder="Speak or type to add/search notes..."
              disabled={loading.save || loading.search}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-4">
            <button
              onClick={handleAddNote}
              disabled={loading.save || !inputText.trim()}
              className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-200 ${
                loading.save || !inputText.trim()
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
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
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Save Note
                </>
              )}
            </button>

            <button
              onClick={handleQueryNotes}
              disabled={loading.search || !inputText.trim()}
              className={`flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition-all duration-200 ${
                loading.search || !inputText.trim()
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-0.5'
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
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Notes
                </>
              )}
            </button>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-xs text-gray-500 text-center mb-4">
            💡 Tip: Use Ctrl+Enter to save, Ctrl+Shift+Enter to search
          </div>

          {/* Success messages */}
          {saveSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Note saved successfully!
            </div>
          )}

          {deleteSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {deleteSuccess}
            </div>
          )}

          {editSuccess && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {editSuccess}
            </div>
          )}

          {/* Search results */}
          {results && !loading.search && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                {/* <h3 className="text-lg font-medium text-gray-800">Search Results</h3> */}
<h3 className="flex items-center gap-2 text-lg font-semibold text-orange-800 bg-orange-100 px-4 py-2 rounded-lg shadow-sm ring-1 ring-orange-300">
  <span className="text-xl">🔍</span> Search Results
</h3>


                <div className="flex items-center space-x-4">



<span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full ring-1 ring-yellow-300 shadow-sm">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
  </svg>
  {results.count} {results.count === 1 ? 'result' : 'results'} found
</span>


<button
  onClick={() => setResults(null)}
  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-full shadow hover:bg-rose-600 transition-all duration-200"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  Clear Results
</button>


                </div>
              </div>



{results.summary && (
  <div className="bg-white text-black-700 border border-black-300 rounded-xl shadow-md p-6 mt-4 space-y-4">

    {/* Header: Summary Title + Copy Button */}
    <div className="flex items-center justify-between">
      <h4 className="flex items-center gap-2 text-lg font-semibold text-violet-900 bg-white-200 px-4 py-2 rounded-md shadow-sm ring-1 ring-violet-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-violet-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        Summary
      </h4>

      {/* Copy Button */}
      <button
        onClick={() => navigator.clipboard.writeText(results.summary)}
        className="flex items-center gap-1 text-sm font-medium text-violet-800 bg-violet-100 hover:bg-violet-200 px-3 py-1.5 rounded-md shadow-sm transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2" />
        </svg>
        Copy
      </button>
    </div>

    {/* Summary Content */}
    <div className="bg-violet-50 p-5 rounded-md border border-violet-200 shadow-sm">
      <p className="whitespace-pre-line text-gray-800 leading-relaxed tracking-wide">
        {results.summary}
      </p>
    </div>

  </div>
)}








{results.results && results.results.length > 0 && (
  <div className="bg-white text-black-700 border border-black-900 rounded-xl shadow-md p-6 mt-4 space-y-4">
    <h4 className="inline-flex items-center gap-2 text-md font-semibold text-blue-900 bg-black-100 px-3 py-1.5 rounded-md shadow-sm ring-1 ring-black-300 mb-4">
      📝 Notes
    </h4>

    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <NoteList
        notes={results.results}
        showSimilarity={true}
        showDeleteButton={true}
        showEditButton={true}
        onDelete={handleDeleteNote}
        onEdit={handleEditNote}
        
      />
    </div>
  </div>
)}


              {results.results && results.results.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p>No notes found matching your search.</p>
                  <p className="text-sm mt-1">Try different keywords or check your spelling.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;