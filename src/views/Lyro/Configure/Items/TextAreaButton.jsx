import React, { useState } from 'react';

const TextareaWithButtons = ({ label, name, rows, placeholder, buttonTextA, buttonTextB, }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');
    const [isContentChanged, setIsContentChanged] = useState(false);
    const [activeClass, setActiveClass] = useState('disabled');

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!textareaValue) {
            setIsFocused(false);
        }
    };

    const handleChange = (e) => {
        setActiveClass('btn-primary');
        setTextareaValue(e.target.value);
        setIsContentChanged(true);
    };

    const handleReset = () => {
        setTextareaValue('');
        setIsContentChanged(false);
        setIsFocused(false); // Optionally hide buttons when resetting
    };

    return (
        <div className="textarea-container">
            <label>
                <p>{label}</p>
            </label>
            <div className="textarea-wrapper">
                <textarea
                    name={name}
                    rows={rows}
                    className="textarea"
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={textareaValue} // Controlled component
                />
                <div className="button-wrapper">
                    <button
                        type="button"
                        className={`btn ${activeClass}`}
                        style={{ opacity: isFocused ? 1 : 0 }}
                        disabled={!isContentChanged} // Disable save button if content hasn't changed
                    >
                        <span>{buttonTextA}</span>
                    </button>
                    <button
                        type="button"
                        className="btn btn-default"
                        style={{ opacity: isFocused ? 1 : 0 }}
                        onClick={handleReset} // Reset textarea on click
                    >
                        <span>{buttonTextB}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextareaWithButtons;
