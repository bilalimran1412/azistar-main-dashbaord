import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../views/Styles/dashboard.css';
import Layout from '../components/Layout/Layout';

const LiveChat = () => {
  const [customers, setCustomers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [input, setInput] = useState('');
  const userId = '66e673aeac3e4461b37b5ff1';
  const websiteId = 'azistar';
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${baseURL}/message/${userId}/${websiteId}`);
        const allMessages = response.data.messages || [];

        // Extract unique customer IDs
        const uniqueCustomerIds = Array.from(new Set(allMessages.map(message => message.customerId)));

        // Extract unique customer details based on unique IDs
        const uniqueCustomers = uniqueCustomerIds.map(id => {
          return allMessages.find(message => message.customerId === id);
        });

        setCustomers(uniqueCustomers);
        console.log('Fetched unique customers:', uniqueCustomers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, [userId, websiteId]);

  // Fetch messages whenever the selected customer changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedCustomer) {
        try {
          const response = await axios.get(`${baseURL}/message/${userId}/${websiteId}/${selectedCustomer}`);
          setMessages(response.data.messages || []);
        } catch (error) {
          console.error('Error fetching messages', error);
        }
      }
    };

    // Fetch messages initially
    fetchMessages();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchMessages, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedCustomer, userId, websiteId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const response = await axios.post(`${baseURL}/message/chat`, {
        message: input,
        userId,
        sender: 'user',
        websiteId,
        customerId: selectedCustomer // Include customerId when sending message
      });

      // Add the new message to the messages array
      if (response.data) {
        setMessages([...messages, response.data]);
      }
      setInput(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <Layout>
      <div className="live_chat dashboard-container">
        <div className="sidebar">
          <h2>Customers</h2>
          <ul className="customer-list">
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <li
                  key={index}
                  className={selectedCustomer === customer.customerId ? 'active' : ''}
                  onClick={() => setSelectedCustomer(customer.customerId)}
                >
                  {customer.customerId}
                </li>
              ))
            ) : (
              <p>No customers found.</p>
            )}
          </ul>
        </div>

        <div className="messages-section">
          <h2>Messages</h2>
          <div className="messages-list">
            {selectedCustomer ? (
              messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <span>{msg.sender === 'user' ? 'You' : 'Customer'}:</span> {msg.message}
                  </div>
                ))
              ) : (
                <p>No messages yet for this customer.</p>
              )
            ) : (
              <p>Please select a customer to view their messages.</p>
            )}
          </div>

          {selectedCustomer && (
            <div className="input-section">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LiveChat;
