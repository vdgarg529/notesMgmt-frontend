// components/Button.jsx
import React from 'react';

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: 10, width: '100%' }}>
      {label}
    </button>
  );
}

export default Button;
