// src/pages/HistoryPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllNotes } from '../services/api';
import NoteList from '../components/NoteList';
import Navigation from '../components/Navigation';

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

const HistoryPage: React.FC = () => {
  const { token } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Extract user ID from JWT token
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Note History</h2>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Back to Dashboard
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
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
            <NoteList notes={notes} showSimilarity={false} />
          )}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;