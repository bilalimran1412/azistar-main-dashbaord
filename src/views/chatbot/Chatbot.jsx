import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../Styles/chatbot.css';
// import '../canvas/chatbot.css'

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [initiateLiveChat, setInitiateLiveChat] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [customerCreated, setCustomerCreated] = useState(false);
  const [email, setEmail] = useState('');
  const [oldCustomer, SetOldCustomer] = useState('');
  const [ShowEmailForm, setShowEmailForm] = useState('true');
  const [userId, setUserId] = useState();
  // const userId = '66e673aeac3e4461b37b5ff1'; // Customer ID
  const websiteId = 'azistar'; // Website ID
  const [customerId, setcustomerId] = useState();
  const [ConfirmationMessage, SetConfirmationMessage] = useState('');
  const [activeclass, setActiveClass] = useState('');
  const [currentNodeIndex, setCurrentNodeIndex] = useState(1); // Track which node is displayed
  const [showForm, setShowForm] = useState(false);
  const [nodes, setNodes] = useState([]);
  const audioRef = React.useRef(null);
  const [error, setError] = useState(null);
  const [edges, setEdges] = useState([]);
  const messagesEndRef = useRef(null);
  const [selectType, setSelectType] = useState({});
  const [addPlaceholder, setAddPlaceholder] = useState({});
  const baseURL = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const usergetId = localStorage.getItem('userId');
    setUserId(usergetId);
    const customersId = localStorage.getItem('customerId');
    setcustomerId(customersId);

    const fetchMessages = async () => {
      const customerId = localStorage.getItem('customerId');
      SetOldCustomer(customerId);
      if (customerId) {
        try {
          const response = await axios.get(`${baseURL}/customers/${userId}/${customerId}`);
          // console.log(`Fetched Customer Data:`, response.data);
          if (response.data.success && response.data.customers.length > 0) {
            setShowEmailForm(false);
            const messagesResponse = await axios.get(`${baseURL}/message/${userId}/${customerId}`);
            const messagesData = messagesResponse.data.messages || [];
            setMessages(messagesData);
            // console.log(`Fetched Messages:`, messagesData);
          } else if (customerId) {
            console.log('Customer not found. Show email form.');
          } else {
            console.log('Customer not found. Show email form.');
          }
        } catch (error) {
          setShowEmailForm(true);
          console.error('Error fetching messages:', error);
        }
      } else {
        console.log('No customerId found. Show email form.');
        setShowEmailForm(true);
      }
    };


    const interval = setInterval(fetchMessages, 500);
    return () => clearInterval(interval);
  }, [userId]);


  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = { text: "Hi!", sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, initialMessage]);
    }
  }, [messages]);


  const closeNotification = () => {
    setTimeout(() => {
      SetConfirmationMessage('');
      setActiveClass('');
    }, 2000);
  }

  // Handle email submission to create or retrieve a customer
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      // Get browser information
      const browser = `${navigator.userAgent}`;

      // Get IP address using an external service
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ip_address = ipResponse.data.ip;
      const websiteId = window.location.href;

      // Initialize location variable
      let location = '';

      // Function to submit email data
      const submitData = async () => {
        await submitEmailData(email, browser, ip_address, location, websiteId);
      };

      // Get location using the Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            location = `${latitude},${longitude}`;
            await submitData();
            SetConfirmationMessage('Email Submit Successfully');
            setActiveClass('success_active');
            closeNotification();
          },
          async (error) => {
            console.error('Error getting location:', error);
            await submitData();
          }
        );
      } else {
        await submitData();
      }
    } catch (error) {
      console.error('Error handling email submission:', error);
      SetConfirmationMessage('This email is already taken');
      setActiveClass('error_active');
      closeNotification();
    }
  };

  // Function to submit email and additional data
  const submitEmailData = async (email, browser, ip_address, location, websiteId) => {
    try {
      const response = await axios.get(`${baseURL}/customers/${email}`);
      if (response.data.success && response.data.customer) {
        const existingCustomer = response.data.customer;
        localStorage.setItem('customerId', existingCustomer._id);
        await axios.patch(`${baseURL}/customers/${existingCustomer._id}`, {
          status: 'true',
          websiteId,
          browser,
          ip_address,
          location,
        });

        setCustomerCreated(true);
        setEmail('');
      } else {
        const newCustomerResponse = await axios.post(`${baseURL}/customers`, {
          email,
          phone: '',
          userId,
          websiteId,
          browser,
          ip_address,
          location,
        });
        if (newCustomerResponse.data.success) {
          const newCustomer = newCustomerResponse.data.customer;
          localStorage.setItem('customerId', newCustomer._id);
          setCustomerCreated(true);
          setEmail('');
          SetConfirmationMessage('Email Submit Successfully');
          setActiveClass('success_active');
          closeNotification();
        } else {
          alert(newCustomerResponse.data.message);
        }
      }
    } catch (error) {
      console.error('Error submitting email data:', error);
      SetConfirmationMessage('This email is already taken');
      setActiveClass('error_active');
      closeNotification();
    }
  };




  // Function to send the customer message
  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;
    setLoading(true);

    try {
      // const customerId = localStorage.getItem('customerId');
      const customerResponse = await axios.get(`${baseURL}/customers/customer/${customerId}`);
      const { customers } = customerResponse.data;

      if (customers.length > 0) {
        const { status } = customers[0];
        console.log(status)

        if (status === 'active') {
          // const customerId = localStorage.getItem('customerId');
          await axios.post(`${baseURL}/message/chat`, {
            message: input, userId, sender: 'customer', websiteId, customerId
          });
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' }
          ]);

          // await axios.patch(`${baseURL}/customers/${customerId}`, { status: 'true' });
          setInput('');
        } else {
          const userId = localStorage.getItem('userId');
          const response = await axios.post(`${baseURL}/chat/live`, { message: input, userId });
          const { response: chatbotResponse, initiateLiveChat, whatsappUrl } = response.data;

          await axios.post(`${baseURL}/message/chat`, {
            message: input, userId, sender: 'customer', websiteId, customerId
          });

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' }
          ]);

          if (initiateLiveChat) {
            // Hide the chatbot input and messages container
            setInitiateLiveChat(true);
            setWhatsAppUrl(whatsappUrl)

          } else {
            // Show chatbot response
            setMessages(prevMessages => [...prevMessages, { text: input, sender: 'user' }]);
            setTimeout(() => {
              setLoading(false);

              axios.post(`${baseURL}/message/chat`, {
                message: chatbotResponse, userId, sender: 'bot', websiteId, customerId

              });
              audioRef.current.play();
              setMessages(prevMessages => [...prevMessages, { text: chatbotResponse, sender: 'bot' }]);
            }, 2000);
            setInput('');
          }
        }
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setLoading(false);
  };


  // Declare the state for current node index (if not already declared)

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

        // Check if data is in the correct structure (array of objects with nodes and edges)
        if (
          responseData.data &&
          Array.isArray(responseData.data) &&
          responseData.data.length > 0
        ) {
          // Assuming there is only one object with nodes and edges, extract it
          const diagramData = responseData.data[0]; // Or use a loop if you expect more than one

          const nodes = diagramData.nodes || [];
          const edges = diagramData.edges || [];

          setNodes(nodes);  // Set the nodes
          setEdges(edges);  // Set the edges

          console.log('Nodes:', nodes);
          console.log('Edges:', edges);
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
  }, []); // Empty dependency array means this effect runs once on component mount


  useEffect(() => {
    setTimeout(() => {
      if (nodes.length > 0) {
        console.log('Nodes are loaded, calling displayNode');
        displayNode(1);
      }
    }, 2500);
  }, [nodes]);


  const displayNode = (index, buttonId = null) => {
    if (index < nodes.length) {
      setShowForm(true);
      const currentNode = nodes[index];
      const nodeId = buttonId || currentNode.id;

      // Auto-send for 'uploadMedia' type
      if (currentNode.additionalData?.contentType === 'uploadMedia') {
        const media = currentNode.additionalData?.params?.mediaAndMessage?.[0]?.media;
        if (media) {
          handleFormSubmit(null, '', media);
        }
        setTimeout(() => {
          navigateToNextNode(currentNode, buttonId);
        }, 2000);
      } else {
        console.log(edges);
        // Log current node and associated edges
        const nodeEdges = edges.filter(edge => edge.source === nodeId);
        console.log('Displaying node:', currentNode);
        console.log('Associated edges:', nodeEdges);
      }
      setInputTypeAndPlaceholder(currentNode.additionalData?.layoutType);


    } else {
      setShowForm(false);
    }
  };

  const setInputTypeAndPlaceholder = (layoutType) => {
    const layoutOptions = {
      date: { selectType: 'date', placeholder: 'Add date' },
      askEmail: { selectType: 'email', placeholder: 'Type your email address here...' },
      askNumber: { selectType: 'text', placeholder: 'Type your number here...' },
      askPhone: { selectType: 'text', placeholder: 'Type your number here...' },
      askAddress: { selectType: 'text', placeholder: 'Type your address here...' },
      askUrl: { selectType: 'url', placeholder: 'https://' },
      askQuestion: { selectType: 'text', placeholder: 'Type your question here ...' },
      askName: { selectType: 'text', placeholder: 'Type your name here...' },
      askFile: { selectType: 'file', placeholder: 'File upload...' },

      default: { selectType: 'text', placeholder: 'Type your response here...' },
    };

    const { selectType, placeholder } = layoutOptions[layoutType] || layoutOptions.default;
    setSelectType(selectType);
    setAddPlaceholder(placeholder);
  };

  const navigateToNextNode = (currentNode, buttonId) => {
    setCurrentNodeIndex((prevIndex) => {
      const buttonIdnode = `source-${currentNode.id}-${buttonId}`;
      console.log('Button ID Node:', buttonIdnode);

      if (buttonId) {
        // If buttonId exists, filter edges based on sourceHandle
        const nextEdges = edges.filter(
          edge => edge.sourceHandle === buttonIdnode
        );
        if (nextEdges.length === 0) return prevIndex;

        const nextEdge = nextEdges[0];
        const nextNodeIndex = nodes.findIndex(node => node.id === nextEdge.target);

        if (nextNodeIndex !== -1) {
          setTimeout(() => {
            displayNode(nextNodeIndex, nodes[nextNodeIndex].id);
          }, 3000);

          return nextNodeIndex;
        }
      } else {
        // Default navigation based on source node
        const nextEdges = edges.filter(
          edge => edge.source === currentNode.id
        );
        if (nextEdges.length === 0) return prevIndex;

        const nextEdge = nextEdges[0];
        const nextNodeIndex = nodes.findIndex(node => node.id === nextEdge.target);

        if (nextNodeIndex !== -1) {
          setTimeout(() => {
            displayNode(nextNodeIndex, nodes[nextNodeIndex].id);
          }, 3000);

          return nextNodeIndex;
        }
      }

      return prevIndex;
    });
  };

  const UploadFile = async () => {
    try {
      if (!input) {
        alert("Please select a file.");
        return;
      }
      const formData = new FormData();
      formData.append('file', input);
      formData.append('userId', userId);
      formData.append('websiteId', websiteId);
      formData.append('customerId', customerId);

      const response = await axios.post('http://localhost:4000/api/v1/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
    }
  };


  const handleFormSubmit = async (event = null, buttonText = null, media = null, buttonId = null) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }

    const questions = nodes[currentNodeIndex]?.additionalData?.params?.elements ||
      nodes[currentNodeIndex]?.additionalData?.params?.rows?.[0]?.questions || [];

    try {
      // const customerId = localStorage.getItem('customerId');
      // const userId = localStorage.getItem('userId');
      // const websiteId = 'websiteId';
      const askFile = nodes[currentNodeIndex]?.additionalData?.layoutType === 'askFile';
      let messageToSend = '';

      if (askFile) {
        messageToSend = buttonText || questions;
      } else {
        messageToSend = buttonText || input.trim() || questions;
      }

      if (!messageToSend) {
        console.error('Input cannot be empty');
        return;
      }

      // Send bot message
      await axios.post(`${baseURL}/message/chat`, {
        message: media || nodes[currentNodeIndex]?.additionalData?.params?.message?.[0]?.message?.text || nodes[currentNodeIndex]?.additionalData?.params?.message?.text || 'No content available',
        userId, sender: 'bot', websiteId, customerId
      });

      setMessages(prevMessages => [...prevMessages, { text: 'Content Type', sender: 'user' }]);

      if (askFile) {
        UploadFile();
      }

      // Send customer message if no media
      if (!media && !questions.length > 0 && !askFile) {
        await axios.post(`${baseURL}/message/chat`, {
          message: messageToSend, userId, sender: 'customer', websiteId, customerId
        });
      }

      if (questions.length > 0) {
        // Sequentially process each question and send label and answer
        for (let question of questions) {
          const inputElement = document.getElementById(`input-${question.id}`);
          if (inputElement) {
            const answer = inputElement.value.trim();

            console.log(inputElement); // Check if the element is found
            console.log(answer); // Check if the answer is captured

            if (answer) {
              // Send the question label first
              await axios.post(`${baseURL}/message/chat`, {
                message: question.label,
                userId,
                sender: 'bot',
                websiteId,
                customerId
              });

              // Send the answer second, after the label
              await axios.post(`${baseURL}/message/chat`, {
                message: answer,
                userId,
                sender: 'customer',
                websiteId,
                customerId
              });

              // Update the UI with the question and the answer in the correct sequence
              setMessages(prevMessages => [
                ...prevMessages,
                { text: question.label, sender: 'bot' },
                { text: answer, sender: 'customer' }
              ]);
            }
          } else {
            console.log(`Input element not found for question ID: ${question.id}`);
          }
        }

        // Clear inputs after submission
        questions.forEach(question => {
          const inputElement = document.getElementById(`input-${question.id}`);
          if (inputElement) inputElement.value = ''; // Reset input field
        });
      }



      setMessages(prevMessages => [...prevMessages, { text: messageToSend, sender: 'customer' }]);
      setInput('');
      audioRef.current.play();
      scrollToBottom();

      // Handle button navigation after message send
      if (buttonId) {
        navigateToNextNode(nodes[currentNodeIndex], buttonId);
      } else {
        navigateToNextNode(nodes[currentNodeIndex]);
      }
      setShowForm(false);

    } catch (error) {
      console.error("Error in API request:", error);
      if (error.response) {
        console.error('Response Error:', error.response.data);
      }
    }
  };







  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };





  // Function to generate chatbot snippet
  const generateBotSnippet = () => {
    const snippet = `
      <script src="http://localhost:3000/livebot"></script>
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


  const ButtonColor = {
    color: '#fff'
  }
  // Button styles
  const buttonStyle = {
    background: 'linear-gradient(135deg, rgb(42, 39, 218), rgb(0, 204, 255))',
    boxShadow: 'rgba(0, 77, 255, 0.5) 0px 2px 16px',
  };

  // Icon styles
  const materialIconStyle = {
    color: 'rgb(255, 255, 255)',
  };

  const handleInputChange = (e) => {
    if (nodes[currentNodeIndex]?.additionalData?.layoutType === 'askFile') {
      setInput(e.target.files[0]);
    } else {
      setInput(e.target.value);
    }
  };



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
        {ShowEmailForm && (
          <div className="email-overlay">
            <form onSubmit={handleEmailSubmit} className="email-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              />
              <button type="submit" style={ButtonColor} className="bg-blue-500 text-white rounded-lg px-4 py-2">
                Submit
              </button>
            </form>
          </div>
        )}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender} p-2 rounded-lg mb-2 ${msg.sender === 'bot'
                ? 'bot'
                : msg.sender === 'customer'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                }`}
            >
              {
                /^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/.test(msg.message) ? (
                  <img src={msg.message} alt="User uploaded" className="max-w-full h-auto rounded-lg" />
                ) : /\.(pdf|csv)$/.test(msg.message) ? (
                  <div className="file-preview">
                    {msg.message.endsWith('.pdf') ? (
                      <embed src={msg.message} type="application/pdf" className="w-full h-60" />
                    ) : (
                      <a href={msg.message} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Download CSV File
                      </a>
                    )}
                  </div>
                ) : (
                  msg.message
                )
              }

            </div>
          ))}

          {showForm && (
            <div className='showform_active'>
              <div className='chatbot-messages'>
                {/* Display only the current node */}
                <div key={currentNodeIndex} className={`message bot p-2 rounded-lg mb-2 ${'bg-blue-500 text-white'}`}>
                  {nodes?.[currentNodeIndex]?.additionalData?.params?.message?.[0]?.message?.text || nodes?.[currentNodeIndex]?.additionalData?.params?.message?.text || 'No content available'}
                </div>

                {/* Form for the user to respond */}
                {nodes[currentNodeIndex]?.additionalData.layoutType === 'pictureChoice' ? (
                  // Render buttons if layoutType is button and buttons array exists
                  <div className="image_carsule_container mt-4 flex">
                    {nodes[currentNodeIndex]?.additionalData?.params?.cards?.map((card, idx) => (
                      <div>
                        <h4>{card.text}</h4>
                        <img
                          key={idx}
                          onClick={() => handleFormSubmit(null, card.image, null, card.id)}
                          className="button-style p-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
                          src={card.image}
                        />
                      </div>

                    )) || <p>No Cards available</p>}
                  </div>
                ) : nodes[currentNodeIndex]?.additionalData.layoutType === 'multiQuestions' ? (
                  <div className="question_container mt-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                      }}
                      className="question_form mt-4"
                    >
                      {/* Loop through each question to render input fields */}
                      {nodes[currentNodeIndex].additionalData.params.elements.map((question) => (
                        <div key={question.id} className="chatbot-input mb-4">
                          <label htmlFor={`input-${question.id}`} className="question_label">{question.label}</label>
                          <div className="botflow_types">
                            <input
                              id={`input-${question.id}`}
                              type={question.config.type === 'askEmail' ? 'email' : question.type === 'askPhone' ? 'tel' : 'text'}
                              required={question.config.isRequired}
                              placeholder={question.config.placeholder || 'Type your answer...'}
                              className="form-input p-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      ))
                      }

                      {/* Single submit button for all questions */}
                      <div className="nde_chat_input_btn">
                        <button type="submit" className="form-button p-2 bg-blue-500 text-white rounded-lg ml-2">
                          {nodes[currentNodeIndex]?.additionalData?.params?.sendLabel || 'Submit'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : nodes[currentNodeIndex]?.additionalData.layoutType === 'form' ? (
                  <div className="question_container mt-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                      }}
                      className="question_form mt-4"
                    >
                      {/* Loop through each question to render input fields */}
                      {nodes[currentNodeIndex].additionalData.params.rows[0].questions.map((question) => (
                        <div key={question.id} className="chatbot-input mb-4">
                          <label htmlFor={`input-${question.id}`} className="question_label">{question.label}</label>
                          <div className="botflow_types">
                            <input
                              id={`input-${question.id}`}
                              type={question.hintText.type === 'askEmail' ? 'email' : question.type === 'askPhone' ? 'tel' : 'text'}
                              required
                              placeholder={question.hintText.rawBlocks.blocks.text || 'Type your answer...'}
                              className="form-input p-2 border rounded-lg"
                            />
                          </div>
                        </div>
                      ))
                      }

                      {/* Single submit button for all questions */}
                      <div className="nde_chat_input_btn">
                        <button type="submit" className="form-button p-2 bg-blue-500 text-white rounded-lg ml-2">
                          {nodes[currentNodeIndex]?.additionalData?.params?.sendLabel || 'Submit'}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : nodes[currentNodeIndex]?.additionalData.layoutType === 'button' || nodes[currentNodeIndex]?.additionalData.contentType === 'buttonNode' ? (
                  // Render buttons if layoutType is button and buttons array exists
                  <div className="button_container_node mt-4 flex">
                    {nodes[currentNodeIndex]?.additionalData?.params?.buttons?.map((button, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFormSubmit(null, button.text, null, button.id)}
                        className="node_ins_btn button-style p-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
                      >
                        {button.text}
                      </button>

                    )) || <p>No buttons available</p>}
                  </div>
                ) : nodes[currentNodeIndex]?.additionalData.contentType === 'uploadMedia' ? (
                  // Render image and single button if layoutType is 'messageMedia'
                  <div className="media_container mt-4">
                    <button
                      onClick={() =>
                        handleFormSubmit(null, nodes[currentNodeIndex]?.additionalData?.params?.mediaAndMessage?.[0]?.media)
                      }
                      className="node_ins_btn button-style p-2 bg-blue-500 text-white rounded-lg"
                    >
                      View Media
                    </button>
                  </div>
                ) : (
                  // Otherwise, render the form for text input
                  <form onSubmit={handleFormSubmit}>
                    <div className="chatbot-input mt-4">
                      <div className='botflow_types'>
                        <input
                          type={selectType}
                          {...(nodes[currentNodeIndex]?.additionalData?.layoutType != 'askFile' && { value: input })}
                          required
                          onChange={handleInputChange}
                          placeholder={addPlaceholder}
                          className="form-input p-2 border rounded-lg"
                        />
                      </div>
                      <div className='nde_chat_input_btn'>
                        <button type="submit" className="form-button p-2 bg-blue-500 text-white rounded-lg ml-2">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                )}

              </div>

            </div>
          )}
          {loading && (
            <div className="message bot p-2 rounded-lg mb-2 bg-gray-200 text-gray-800">
              <span>{initiateLiveChat ? 'Initiated WhatsApp Live chat.' : 'Loading...'}</span>
              <span className="dot1">.</span>
              <span className="dot2">.</span>
              <span className="dot3">.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage}>
          <div className="chatbot-input mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={showForm}
              className="mb-4 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
            {/* <button onClick={sendMessage} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">Send</button> */}
            <div id="button" data-testid="widgetButton" className="chat-open mobile-size__large bubbleAnimation-appear-done bubbleAnimation-enter-done">
              <div className="buttonWave"></div>
              <button type="submit" disabled={showForm} id="button-body" data-testid="widgetButtonBody" className="chrome" tabIndex="0" aria-label="Close chat widget" style={buttonStyle}>
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
        {/* <div className="generate-bot-container mt-4">
          <button onClick={generateBotSnippet} className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2 focus:outline-none">
            Generate Bot Code
          </button>
        </div> */}
      </div>
      <p className={`${activeclass} notify_message`}>{ConfirmationMessage}</p>

    </div>
  );
};

export default Chatbot;
