import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(''); // State for user input
  const [loading, setLoading] = useState(false); // State for loading status
  const [initiateLiveChat, setInitiateLiveChat] = useState(false); // State to initiate live chat
  const [whatsAppUrl, setWhatsAppUrl] = useState(''); // State for WhatsApp URL
  

  const userId = '66e673aeac3e4461b37b5ff1'; // Customer ID
  const websiteId = 'azistar'; // Website ID
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch messages from the server
    const fetchMessages = async () => {
      try {
        const customerId = localStorage.getItem('customerId');
        const response = await axios.get(`${baseURL}/message/${userId}/${websiteId}/${customerId}`);
        const messagesData = response.data.messages || [];
        setMessages(messagesData);
        console.log(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 500);
    return () => clearInterval(interval);
  }, [userId]);


  // Function to generate a unique customerId
function generateCustomerId() {
  return 'customer_' + Math.random().toString(36).substr(2, 9);
}

  useEffect(() => {
    try{
      let customerId = localStorage.getItem('customerId');
        if (!customerId) {
          customerId = generateCustomerId();
          localStorage.setItem('customerId', customerId);  
        }

        console.log('Customer ID:', customerId);
    }catch {
      console.log('Customer ID:', 'Can not defiend');
    }
  });
  // Function to send the customer message
  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const customerId = localStorage.getItem('customerId');
      await axios.post(`${baseURL}/message/chat`, {
        message: input, userId, sender: 'customer', websiteId, customerId
      });
      setMessages((prevMessages) => [
        ...prevMessages, 
        { text: input, sender: 'user' }
      ]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  };


  // Function to generate chatbot snippet
  const generateBotSnippet = () => {
    const snippet = `
      <script src="http://localhost:3000/chatbot"></script>
      <script>
        window.onload = function() {
          new Chatbot({
            elementId: 'chatbot-container',
            websiteId: '${websiteId}',
          });
        };
      </script>
    `; // Create bot snippet
    navigator.clipboard.writeText(snippet).then(() => {
      alert('Bot snippet copied to clipboard!');
    }); // Copy to clipboard
  };

  // Button styles
  const buttonStyle = {
    background: 'linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255))',
    boxShadow: 'rgba(0, 77, 255, 0.5) 0px 2px 16px',
  };

  // Icon styles
  const materialIconStyle = {
    color: 'rgb(255, 255, 255)',
  };

  return (
    <div className="chatbot-container chat">
      <div className="chat-header project-online" style={{ color: 'rgb(255, 255, 255)', background: 'linear-gradient(135deg, rgb(42, 39, 218) 0%, rgb(0, 204, 255) 100%)' }}>
        <div className="avatars-wrapper operators-avatar-1">
          <div className="header-ava"></div>
        </div>
        <h2 className="oneline">
        <span>Hi there <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png" alt="👋" className="emoji" /></span>
        </h2>
        <button className="material-icons exit-chat ripple tidio-1s5t5ku" type="button" aria-label="Minimize" style={{ color: 'rgb(255, 255, 255)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" id="ic-minimize">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
          </svg>
          <span>Minimize</span>
        </button>
        <button className="material-icons options ripple tidio-1s5t5ku" type="button" aria-label="Open options" style={{ color: 'rgb(255, 255, 255)' }}>
          <svg id="ic_options" className="options-icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
          <span>Open options</span>
        </button>
        <div className="offline-message" style={{ backgroundImage: 'linear-gradient(135deg, rgba(42, 39, 218, 0.72) 0%, rgba(0, 204, 255, 0.72) 100%)' }}>
          <span className="online"><span>We reply immediately</span></span>
        </div>
      </div>
      <div className="chatbot-header"> </div>
      <div className="chatbot-wrapper">
        <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender} p-2 rounded-lg mb-2 ${msg.sender === 'user' ? 'user' : 'cutomer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.message}
              </div>
            ))}
          {loading && (
            <div className="message bot p-2 rounded-lg mb-2 bg-gray-200 text-gray-800">
              <span>{initiateLiveChat ? 'Initiated WhatsApp Live chat.' : 'Loading...'}</span>
              <span className="dot1">.</span>
              <span className="dot2">.</span>
              <span className="dot3">.</span>
            </div>
          )}
        </div>

        <div className="chatbot-input mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
          />
          {/* <button onClick={sendMessage} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">Send</button> */}
          <div onClick={sendMessage} id="button" data-testid="widgetButton" className="chat-open mobile-size__large bubbleAnimation-appear-done bubbleAnimation-enter-done">
            <div className="buttonWave"></div>
            <button type="button" id="button-body" data-testid="widgetButtonBody" className="chrome" tabIndex="0" aria-label="Close chat widget" style={buttonStyle}>
              <i className="material-icons type1 for-closed" style={materialIconStyle}>
                <svg id="ic_bubble" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
              <i className="material-icons type2 for-closed">
                <svg id="ic_create" fill="blue" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
              <i className="material-icons type1 for-opened active" style={materialIconStyle}>
                <svg id="ic_send" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
              <i className="material-icons type2 for-opened active">
                <svg id="ic_send" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  <path d="M0 0h24v24H0z" fill="none"></path>
                </svg>
              </i>
            </button>
          </div>
        </div>
        <div className="generate-bot-container mt-4">
          <button onClick={generateBotSnippet} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">
            Generate Bot Code
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Chatbot;
