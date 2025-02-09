import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import axios from 'axios';
import '../Styles/chatbot.css';

const Chatbot = forwardRef((props, ref) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initiateLiveChat, setInitiateLiveChat] = useState(false); // Define initiateLiveChat state variable
  const [whatsAppUrl, setWhatsAppUrl] = useState(''); // Define initiateLiveChat state variable
  const audioRef = React.useRef(null);
  const [nodes, setNodes] = useState([]); 
  const [error, setError] = useState(null);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
  
        const res = await fetch(`${baseURL}/bot/listbots/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
  
        const responseData = await res.json();
        
        // Check for valid data structure
        if (responseData.data && Array.isArray(responseData.data) && responseData.data.length > 0) {
          setNodes(responseData.data);
        } else {
          throw new Error('No diagram data available or invalid structure');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, []);
  

  useEffect(() => {
    if (initiateLiveChat) {
      window.open(whatsAppUrl, '_blank');
    }
  }, [initiateLiveChat]);




  // Send Input message
  useImperativeHandle(ref, () => ({
    sendMessage: async (message) => {
      if (!message.trim()) return;

      const userId = localStorage.getItem('userId');

      try {
        setLoading(true);
        const response = await axios.post(`${baseURL}/chat/live`, { message, userId });
        const { response: chatbotResponse, initiateLiveChat, whatsappUrl } = response.data;

        if (initiateLiveChat) {
          setInitiateLiveChat(true);
          setWhatsAppUrl(whatsappUrl);
        } else {
          setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
          setTimeout(() => {
            setLoading(false);
            setMessages(prevMessages => [...prevMessages, { text: chatbotResponse, sender: 'bot' }]);
            audioRef.current.play();
          }, 1000);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error sending message:', error);
      }
    },
  }));


  // Send Message
  // const sendMessage = async (event) => {
  //   event.preventDefault();
  //   if (!input.trim()) return;
  //   const userId = localStorage.getItem('userId');
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`${baseURL}/chat/live`, { message: input, userId });
  //     const { response: chatbotResponse, initiateLiveChat, whatsappUrl } = response.data;

  //     if (initiateLiveChat) {
  //       // Hide the chatbot input and messages container
  //       setInitiateLiveChat(true);
  //       setWhatsAppUrl(whatsappUrl)

  //     } else {
  //       // Show chatbot response
  //       setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
  //       setTimeout(() => {
  //         setLoading(false);
  //         setMessages(prevMessages => [...prevMessages, { text: chatbotResponse, sender: 'bot' }]);
  //         audioRef.current.play();
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error sending message:', error);
  //   }

  //   setInput('');
  // };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    handleChat(input);
    setInput('');
  };

  const handleChat = async (userMessage) => {
    const userId = localStorage.getItem('userId');
    
    // Check for live chat intent
    if (userMessage.toLowerCase().includes('live chat')) {
        const whatsappUrl = 'https://wa.me/971506683114';
        setInitiateLiveChat(true);
        setWhatsAppUrl(whatsappUrl);
        return;
    }

    const nodeResponse = getResponseFromNodes(userMessage);
    
    if (nodeResponse) {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: userMessage, sender: 'user' },
            { text: nodeResponse, sender: 'bot' },
        ]);
        audioRef.current.play();
    } 
};


const getResponseFromNodes = (message) => {
  const matchedNode = nodes.find((node) => {
      const keywords = node.additionalData?.mediaAndMessage || [];
      return keywords.some((media) => {
          const mediaMessage = media.message;
          return mediaMessage && message.toLowerCase().includes(mediaMessage.toLowerCase());
      });
  });

  if (matchedNode) {
      const nodeMessage = matchedNode.additionalData?.message 
          ? JSON.parse(matchedNode.additionalData.message)[0].messageText 
          : 'I\'m not sure how to respond to that.';
      return nodeMessage;
  }
  
  return null; // No matching node found
};






  const buttonStyle = {
    background: 'linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255))',
    boxShadow: 'rgba(0, 77, 255, 0.5) 0px 2px 16px',
  };

  const materialIconStyle = {
    color: 'rgb(255, 255, 255)',
  };

  useEffect(() => {
    const initialMessage = { text: "Hi!", sender: 'user' };
    setMessages([initialMessage]);
    const timer = setTimeout(() => {
      const botResponse = { text: "Hello! How can I help you today?", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="chatbot-container chat">
      <audio ref={audioRef} src="https://widget-v4.tidiochat.com/tururu.mp3" preload="auto" />
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
            <div key={index} className={`message ${msg.sender} p-2 rounded-lg mb-2 ${msg.sender === 'bot' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.text}
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

        <form onSubmit={sendMessage}>
          <div className="chatbot-input mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
            {/* <button onClick={sendMessage} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">Send</button> */}
            <div id="button" data-testid="widgetButton" className="chat-open mobile-size__large bubbleAnimation-appear-done bubbleAnimation-enter-done">
              <div className="buttonWave"></div>
              <button type="submit" id="button-body" data-testid="widgetButtonBody" className="chrome" tabIndex="0" aria-label="Close chat widget" style={buttonStyle}>
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
        </form>

      </div>
    </div>
  );
})

export default Chatbot;
