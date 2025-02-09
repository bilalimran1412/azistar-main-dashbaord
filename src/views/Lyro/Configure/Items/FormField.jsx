import React from 'react';

const FormField = ({ label, info, placeholder, type = "text", required, value, onChange }) => (
  <div className="form-field">
    <label>
      <p>{label}<br/><span>{info}</span></p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="input"
      />
    </label>
  </div>
);

export default FormField;
