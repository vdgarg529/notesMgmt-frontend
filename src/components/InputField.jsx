// components/InputField.jsx
import React from 'react';

function InputField({ type = 'text', placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: 10, marginBottom: 10 }}
    />
  );
}

export default InputField;
