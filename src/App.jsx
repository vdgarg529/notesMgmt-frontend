// React Router based version of App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddNote from './pages/AddNote';
import QueryNote from './pages/QueryNote';
import QueryResult from './pages/QueryResult';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [notes, setNotes] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [relatedNotes, setRelatedNotes] = useState([]);

  const shared = { token, setToken, notes, setNotes, aiResponse, setAiResponse, relatedNotes, setRelatedNotes };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login {...shared} />} />
          <Route path="/register" element={<Register {...shared} />} />
          <Route path="/home" element={<Home {...shared} />} />
          <Route path="/add" element={<AddNote {...shared} />} />
          <Route path="/query" element={<QueryNote {...shared} />} />
          <Route path="/result" element={<QueryResult {...shared} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
