// src/components/Widget.js

import React, { useEffect } from 'react';

const Widget = () => {
    useEffect(() => {
        const createIframe = () => {
            const iframe = document.createElement('iframe');
            iframe.src = 'http://localhost:3000/chatbot';
            iframe.style.position = 'fixed';
            iframe.style.bottom = '20px';
            iframe.style.right = '20px';
            iframe.style.width = '400px';
            iframe.style.height = '600px';
            iframe.style.border = 'none';
            iframe.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.3)';
            iframe.style.zIndex = '9999';
            iframe.id = 'chatbot-iframe';
            document.body.appendChild(iframe);
        };

        // Load the iframe after the component mounts
        createIframe();

        // Cleanup function to remove iframe on component unmount
        return () => {
            const iframe = document.getElementById('chatbot-iframe');
            if (iframe) {
                document.body.removeChild(iframe);
            }
        };
    }, []);

    return null; // This component does not render anything visually
};

export default Widget;
