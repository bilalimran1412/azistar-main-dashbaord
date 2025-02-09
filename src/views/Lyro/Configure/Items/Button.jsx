import React from 'react';

const Button = ({ type, onClick, disabled, children, className }) => (
  <button type={type} onClick={onClick} disabled={disabled} className={`btn ${className}`}>
    {children}
  </button>
);

export default Button;
