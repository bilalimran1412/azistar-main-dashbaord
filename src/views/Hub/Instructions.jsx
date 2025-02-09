import React from 'react'

function SetupInstructions() {
  return (
    <div className="setup-instructions-container">
      <div className="setup-instructions-header">
        <p className="setup-instructions-title">Follow these steps to complete Lyro setup</p>
        <div className="setup-instructions-progress-circle">
          <svg className="setup-instructions-svg" width="48" height="48" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="transparent" r="10" stroke="#ccf1d5" strokeWidth="4"></circle>
            <circle cx="12" cy="12" fill="transparent" r="10" stroke="#34b857" strokeWidth="4" strokeDasharray="62.83185307179586" strokeDashoffset="15.707963267949466" strokeLinecap="round"></circle>
          </svg>
          <div className="setup-instructions-label">
            <p>3/4</p>
          </div>
        </div>
      </div>
      <div className="setup-instructions-steps">
        {steps.map((step, index) => (
          <div className="setup-instructions-step" key={index}>
            <div className="setup-instructions-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" className="setup-instructions-step-icon">
                <path fillRule="evenodd" d="M20.896 6.023 18.52 4.106A.42.42 0 0 0 18.252 4a.4.4 0 0 0-.273.11L9.336 15.469s-3.397-3.342-3.493-3.44c-.095-.097-.22-.26-.41-.26-.191 0-.278.137-.377.239-.074.08-1.286 1.38-1.883 2.027-.035.04-.056.061-.086.092A.44.44 0 0 0 3 14.38c0 .097.035.177.087.252l.12.115s6.03 5.922 6.13 6.024.22.23.397.23c.173 0 .316-.19.399-.274l10.78-14.163A.45.45 0 0 0 21 6.306a.46.46 0 0 0-.104-.283" clipRule="evenodd"></path>
              </svg>
            </div>
            <p className="setup-instructions-step-text">{step.text}</p>
            {step.number && <div className="setup-instructions-step-number">{step.number}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const steps = [
  { text: "Add knowledge by providing the URL of your site" },
  { text: "Test Lyro AI Chatbot" },
  { text: "Activate Lyro AI Chatbot", number: 3 },
  { text: "Monitor and review unanswered questions" }
];

export default SetupInstructions;
