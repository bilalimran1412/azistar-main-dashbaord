import React from 'react';

const BanVistor = ({ isOpen, onClose, onVistorBan }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent model_view" onClick={(e) => e.stopPropagation()}>
                <header>
                    <div className="ban-icon ban_warning" style={{display: 'flex'}}>
                        <div className="ban-icon-content">!</div>
                    </div>
                    <h2>Are you sure?</h2>
                </header>
                <div className="buttonGroup">
                    <button className="copyButton" onClick={onClose}>Cancel</button>
                    <button className="exportButton" onClick={onVistorBan}>Yes, ban visitor</button>
                </div>
            </div>
        </div>
    );
};

export default BanVistor;
