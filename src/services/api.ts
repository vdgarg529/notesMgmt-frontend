// // src/services/api.ts
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Add token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const register = async (email: string, password: string) => {
//   try {
//     const response = await api.post('/register', { email, password });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
   
// };

// export const login = async (email: string, password: string) => {
//   try {
//     const response = await api.post('/login', { email, password });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addNote = async (text: string) => {
//   try {
//     const response = await api.post('/notes/add', { text });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const queryNotes = async (query: string) => {
//   try {
//     const response = await api.post('/notes/query', { query });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const checkHealth = async () => {
//   try {
//     const response = await api.get('/health');
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const checkNotes = async (userId: string) => {
//   try {
//     const response = await api.get('/notes/check', { params: { user_id: userId } });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // New function to get all notes
// export const getAllNotes = async (userId: string) => {
//   try {
//     // This endpoint would need to be implemented in the backend
//     const response = await api.get('/notes/all', { params: { user_id: userId } });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export default api;



// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (email: string, password: string) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
   
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addNote = async (text: string) => {
  try {
    const response = await api.post('/notes/add', { text });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const queryNotes = async (query: string) => {
  try {
    const response = await api.post('/notes/query', { query });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkNotes = async (userId: string) => {
  try {
    const response = await api.get('/notes/check', { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// New function to get all notes
export const getAllNotes = async (userId: string) => {
  try {
    // This endpoint would need to be implemented in the backend
    const response = await api.get('/notes/all', { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// New function to delete a note
export const deleteNote = async (noteId: string) => {
  try {
    const response = await api.delete('/notes/delete', { 
      data: { note_id: noteId } 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;