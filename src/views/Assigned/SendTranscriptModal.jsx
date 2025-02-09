import React, { useState } from 'react';


const SendTranscriptModal = ({ isOpen, onClose, transcript, onSend }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSend) {
            onSend(email, transcript);
            onClose();
        }
    };

    return (
        isOpen && (
            <div className="modalOverlay">
                <div className="modalContent">
                    <header>
                        <div className='sendtrans'>
                            <h2>Send Transcript</h2>
                            <p>Send an email with a chat transcript to a selected email address.</p>
                        </div>
                        <button onClick={onClose} className='closeButton' aria-label="close">
                            &times;
                        </button>
                    </header>
                    <form className='send_script' onSubmit={handleSubmit}>
                        <label>
                            <span>Email address</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <div className='submit_frm'>
                            <button type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default SendTranscriptModal;
