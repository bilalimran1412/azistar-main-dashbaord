import React, { useState } from 'react';

// SelectField Component
const SelectField = ({ label, info, options, required, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (option && option.value) {
      onChange(option.value); // Pass the value of the selected option
      setIsOpen(false); // Close the dropdown
    }
  };

  return (
    <div className="form-field">
      <label>
        <p>{label}<br/><span>{info}</span></p>
        <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
          <div className="selected-option">{value || "Select an option"}</div>
          {isOpen && (
            <div className="options">
              {options.map((option, index) => (
                <div 
                  key={index} 
                  className="option" 
                  onClick={() => handleSelect(option)}
                >
                  {option.icon && <span className="icon">{option.icon}</span>}
                  {option.label}
                  {option.info && <span className="info">{option.info}</span>}

                </div>
              ))}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};


export default SelectField;
