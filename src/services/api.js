// services/api.js

export const loginUser = async (email, password) => {
  const res = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const registerUser = async (email, password) => {
  const res = await fetch('http://localhost:8000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const addNote = async (token, text) => {
  const res = await fetch('http://localhost:8000/notes/add', {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error('Note creation failed');
  return res.json();
};

export const fetchNotes = async (token) => {
  // Placeholder; backend endpoint should return all notes
  return Promise.resolve([{ text: 'Sample note' }]);
};

// export const sendTranscript = async (text) => {
//   try {
//     // For Docker: use 'http://server:8000' 
//     // For local dev: use 'http://localhost:8000'
//     const baseUrl = process.env.NODE_ENV === 'production' 
//       ? 'http://server:8000' 
//       : 'http://localhost:8000'
    
//     const response = await fetch(`${baseUrl}/speech-to-text`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text })
//     })
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
    
//     return await response.json()
//   } catch (error) {
//     console.error('Error sending transcript:', error)
//     throw error
//   }
// }