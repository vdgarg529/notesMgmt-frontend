// src/pages/Splash.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/login'), 1500);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '40vh' }}>
      <h1>📝 Note App</h1>
      <p>Loading...</p>
    </div>
  );
}

export default Splash;