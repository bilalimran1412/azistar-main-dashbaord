import React from 'react';

const TranscriptModal = ({ isOpen, onClose, transcript, onCopy, onExport }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent model_view" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
                <header>
                    <h2>Export chat transcript</h2>
                </header>
                <textarea readOnly className="transcriptArea" value={transcript} />
                <div className="buttonGroup">
                    <button className="copyButton" onClick={onCopy}>Copy to clipboard</button>
                    <button className="exportButton" onClick={onExport}>Export to .CSV</button>
                </div>
            </div>
        </div>
    );
};

export default TranscriptModal;
