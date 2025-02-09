import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    MainLayout,
    Column,
    SideBar,
    ChatSection,
    Message,
    CustomerInfo,
    ActionButton,
} from '../Assigned/StyledContest';
import { FiTrash, FiRotateCw, FiCheckCircle } from 'react-icons/fi';
import CardTops from '../Unassigned/CardTop';
import AllCard from '../Unassigned/AllCard';
import '../Styles/userconversation.css';
import Avatar from '../Assigned/Avatar';
import ChatHeader from '../Assigned/ChatHeader';
import '../Styles/index.css'
import CustomerListTooltip from '../Assigned/CustomeListTootip';

function Assigned() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [customerInfo, setCustomerInfo] = useState(null);
    const [checkedCustomers, setCheckedCustomers] = useState([]);
    const [userId, setUserId] = useState();
    // const userId = '66ffa340ab8fe75d52fbfb6e';
    const websiteId = 'azistar';
    const [hoveredCustomerId, setHoveredCustomerId] = useState(null);
    const [actionMenuVisible, setActionMenuVisible] = useState(false);
    const [oldUserId, setoldUserId] = useState();
    const [customersAll, setCustomersAll] = useState([]);
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const idUser = localStorage.getItem('userId');
        setUserId(idUser);
    }, []);

    useEffect(() => {
        if (userId) {
            console.log(userId, 'id ai hi');
        }
    }, [userId]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchCustomers = async () => {
        try {
            const newuserId = localStorage.getItem('userId');
            const response = await axios.get(`${baseURL}/customers/${newuserId}`);
            const customerData = response.data.customers || [];
            setCustomersAll(customerData);

            const activeCustomers = customerData.filter(customer => customer.status == 'false');

            // Get last messages including timestamps
            const updatedCustomers = await Promise.all(activeCustomers.map(async (customer) => {
                const lastMessageResponse = await axios.get(
                    `${baseURL}/message/${userId}/${customer._id}`
                );

                const lastMessage = lastMessageResponse.data.lastMessage;

                return {
                    ...customer,
                    lastMessage: {
                        message: lastMessage ? lastMessage.message : 'No messages yet',
                        timestamp: lastMessage ? lastMessage.timestamp : null
                    }
                };
            }));

            setCustomers(updatedCustomers);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const customerStatus = async (customerId, status) => {
        try {
            const response = await axios.patch(
                `${baseURL}/customers/${customerId}`,
                { status }
            );

            if (response.data.success) {
                alert(`Message status updated to "${status}".`);
                fetchMessages(customerId);
                window.location.href('/assigned')
            } else {
                alert('Failed to update message status.');
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    // Fetch messages for the selected customer
    const fetchMessages = async customerId => {
        if (customerId) {
            try {
                const response = await axios.get(
                    `${baseURL}/message/${userId}/${customerId}`
                );
                const messagesWithEmail = response.data.messages.map(msg => {
                    const customer = customers.find(c => c._id === customerId);
                    return {
                        ...msg,
                        customerEmail: customer ? customer.email : 'Unknown Email' // Add email to message
                    };
                });
                setMessages(messagesWithEmail || []);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        }
    };

    // Fetch selected customer info
    const fetchCustomerInfo = async customerId => {
        try {
            const response = await axios.get(
                `${baseURL}/customers/${userId}/${customerId}`
            );

            if (response.data.success && response.data.customers.length > 0) {
                setCustomerInfo(response.data.customers[0]);
                setoldUserId(response.data.customers[0].userId);
                console.log('information', customerInfo);
            } else {
                console.error('No customer data found');
                setCustomerInfo(null);
            }
        } catch (error) {
            console.error('Error fetching customer info', error);
        }
    };


    // Send a message
    const sendMessage = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/message/chat`,
                {
                    message: input,
                    userId,
                    sender: 'user',
                    websiteId,
                    customerId: selectedCustomer,
                }
            );

            // Add the new message to the messages array
            if (response.data) {
                setMessages(prevMessages => [...prevMessages, response.data]);
            }
            setInput('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    // Function to open the Chatbot in a new popup window
    const openChatbotPopup = () => {
        const popup = window.open('', 'Chatbot', 'width=400,height=600'); // Set your desired width and height
        if (popup) {
            popup.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Chatbot</title>
          <link rel="stylesheet" href="http://localhost:3000/assets/ChatBot-o5e-1Ygz.css"> <!-- Include your CSS file -->
        </head>
        <body>
          <div id="chatbot-root"></div>
          <script src="http://localhost:3000/widget.js"></script> 
          <script>
            const userId = '66e673aeac3e4461b37b5ff1';
            const websiteId = 'azistar';
            ReactDOM.render(React.createElement(Chatbot, { userId, websiteId }), document.getElementById('chatbot-root'));
          </script>
        </body>
        </html>
      `);
            popup.document.close();
        }
    };


    const updateMessageStatus = async (customerId, status) => {
        try {
            const response = await axios.patch(
                `${baseURL}/customers/${customerId}`,
                { status }
            );

            if (response.data.success) {
                alert(`Message status updated to "${status}".`);
                fetchMessages(customerId);
                fetchCustomers();
                if (status === 'false') {
                    window.location.href = '/solved';
                }
            } else {
                alert('Failed to update message status.');
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };


    // Handle conversation actions
    const handleAction = async action => {
        try {
            if (action === 'solve' && selectedCustomer) {
                await updateMessageStatus(selectedCustomer, 'false');
            } else {
                await axios.post(`${baseURL}/conversation/action`, {
                    action,
                    customerId: selectedCustomer,
                });
                alert(`Action "${action}" was successful.`);
            }
        } catch (error) {
            console.error(`Error performing action ${action}:`, error);
        }
    };

    // Delete Customer
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this customer permanently?");
        if (isConfirmed) {
            try {
                const response = await fetch(`${baseURL}/customers/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove deleted customer from the customer list
                    setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== id));

                    // Clear messages and selected customer if the deleted customer was selected
                    if (selectedCustomer === id) {
                        setMessages([]);
                        setSelectedCustomer(null);
                        setCustomerInfo(null);
                    }

                    alert('Customer deleted successfully.');
                } else {
                    throw new Error(`Failed to delete customer with ID ${id}`);
                }
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        } else {
            console.log('Deletion cancelled by user.');
        }
    };


    // Handle checkbox check/uncheck
    const handleCheckboxChange = customerId => {
        const updatedCheckedCustomers = checkedCustomers.includes(customerId)
            ? checkedCustomers.filter(id => id !== customerId) // Uncheck
            : [...checkedCustomers, customerId]; // Check

        setCheckedCustomers(updatedCheckedCustomers);

        // If only one customer is checked, set as selected customer for chat
        if (updatedCheckedCustomers.length === 1) {
            setSelectedCustomer(updatedCheckedCustomers[0]);
            fetchMessages(updatedCheckedCustomers[0]);
            fetchCustomerInfo(updatedCheckedCustomers[0]);
        } else {
            setSelectedCustomer(null); // Clear selected customer if none or multiple are checked
        }
    };

    // Handle customer row click (open chat)
    const handleCustomerClick = customerId => {
        setSelectedCustomer(customerId);
        fetchMessages(customerId);
        fetchCustomerInfo(customerId);
        console.log(customerId);
    };

    const groupMessagesByDate = (messages) => {
        return messages.reduce((acc, msg) => {
            const date = new Date(msg.timestamp);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push(msg);
            return acc;
        }, {});
    };


    useEffect(() => {
        fetchCustomers();
        const intervalId = setInterval(fetchCustomers, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (selectedCustomer) {
            fetchMessages(selectedCustomer);
            const messageIntervalId = setInterval(() => {
                fetchMessages(selectedCustomer);
            }, 3000);

            return () => clearInterval(messageIntervalId);
        }

    }, [selectedCustomer]);

    const timeAgo = (timestamp) => {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const difference = Math.floor((now - messageTime) / 1000); // difference in seconds

        if (difference < 60) {
            return `${difference} sec${difference !== 1 ? 's' : ''}`;
        } else if (difference < 3600) {
            const minutes = Math.floor(difference / 60);
            return `${minutes} min${minutes !== 1 ? 's' : ''}`;
        } else if (difference < 86400) { // Less than 1 day
            const hours = Math.floor(difference / 3600);
            return `${hours} hr${hours !== 1 ? 's' : ''}`;
        } else if (difference < 2592000) { // Less than 30 days
            const days = Math.floor(difference / 86400);
            return `${days} day${days !== 1 ? 's' : ''}`;
        } else if (difference < 31536000) { // Less than 1 year
            const months = Math.floor(difference / 2592000);
            return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
            const years = Math.floor(difference / 31536000);
            return `${years} year${years !== 1 ? 's' : ''}`;
        }
    };

    const addMessage = async (messageText, sender = 'system') => {
        if (!selectedCustomer) {
            console.error("No selected customer");
            return;
        }
        // const newMessage = {
        //     sender,
        //     message: messageText,
        //     timestamp: Date.now(),
        //     customerEmail: selectedCustomer.email || 'Unknown Email', 
        //     customerId: selectedCustomer.id || null
        // };
        console.log(selectedCustomer);
        try {
            const response = await axios.post(
                `${baseURL}/message/chat`,
                {
                    message: messageText,
                    userId,
                    sender,
                    websiteId,
                    customerId: selectedCustomer,
                }
            );

            if (response.data) {
                setMessages(prevMessages => [...prevMessages, response.data]);
            }
            setInput('');
        } catch (error) {
            console.error('Error sending message', error);
        }
    };




    const customerList = (
        <ul className="customer-list">
            {customers.map((customer) => (
                <li
                    key={customer._id}
                    className={checkedCustomers.includes(customer._id) ? 'active' : ''}
                    onClick={() => handleCustomerClick(customer._id)}
                    onMouseEnter={() => setHoveredCustomerId(customer._id)}
                    onMouseLeave={() => setHoveredCustomerId(null)}
                >
                    <div>
                        {/* Only show the Avatar if not selected */}
                        {!checkedCustomers.includes(customer._id) && (
                            <Avatar email={customer.email} isHovered={hoveredCustomerId === customer._id} />
                        )}

                        {/* Show the checkbox if selected or hovered */}
                        {(checkedCustomers.includes(customer._id) || hoveredCustomerId === customer._id) && (
                            <input
                                type="checkbox"
                                checked={checkedCustomers.includes(customer._id)}
                                onChange={e => {
                                    e.stopPropagation();
                                    handleCheckboxChange(customer._id);
                                }}
                            />
                        )}
                    </div>
                    <div className="customer-info">
                        <div className='email_custmr'>
                            <h4 className='customer_email'>{customer.email}</h4>

                            {actionMenuVisible || hoveredCustomerId === customer._id ? (
                                <button
                                    aria-label="Conversation options button"
                                    onClick={e => {
                                        e.stopPropagation();
                                        // Toggle the action menu visibility
                                        setActionMenuVisible(prev => !prev);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                                    </svg>
                                </button>
                            ) : (
                                <span className="timestamp">
                                    {customer.lastMessage.timestamp
                                        ? timeAgo(customer.lastMessage.timestamp)
                                        : 'No time yet'}
                                </span>
                            )}
                        </div>

                        <p>Live Chat</p>
                        <h6>{customer.lastMessage.message}</h6>

                        {/* Always show action menu if it is visible */}
                        {actionMenuVisible && (
                            <div className="action-menu">
                                <CustomerListTooltip
                                    isVisible='isVisible'
                                    selectedCustomer={customer._id}
                                    oldUserId={oldUserId}
                                    handleSolved={() => {
                                        handleAction('solve');
                                        setActionMenuVisible(false); // Hide action menu after action
                                    }}
                                    handleDelete={() => {
                                        handleDelete(selectedCustomer);
                                        setActionMenuVisible(false); // Hide action menu after action
                                    }}
                                    onSelect={e => {
                                        e.stopPropagation();
                                        handleCheckboxChange(customer._id);
                                        setActionMenuVisible(false); // Hide action menu after action
                                    }}
                                    markAsUnread={() => {
                                        updateMessageStatus(customer._id, 'unread');
                                        setActionMenuVisible(false); // Hide action menu after action
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );





    const groupedMessages = groupMessagesByDate(messages);


    return (
        <MainLayout>
            {/* Left Sidebar */}
            <SideBar>
                {checkedCustomers.length === 0 ? (
                    <h3>📬 My Open</h3>
                ) : (
                    <div className="actions">
                        <button onClick={() => handleAction('markUnread')}>🔄</button>
                        <button onClick={() => handleDelete(selectedCustomer)}>🗑️</button>
                        <button onClick={() => handleAction('reassign')}>🔁</button>
                        <button onClick={() => handleAction('solve')}>✔️</button>
                    </div>
                )}
                {customers.length > 0 ? customerList : <p></p>}
                <p>Select a customer to view messages.</p>
            </SideBar>

            {/* Chat Section */}
            <Column>
                {selectedCustomer ? (
                    <div>
                        <ChatHeader
                            SolvedChat={() => handleAction('solve')}
                            handleDelete={() => handleDelete(selectedCustomer)}
                            messages={messages}
                            VisterBan={() => updateMessageStatus(selectedCustomer, 'ban')}
                            addMessage={addMessage}
                            customerId={selectedCustomer}
                            oldUserId={oldUserId}
                        />
                        <ChatSection>
                            {/* <h2>Messages</h2> */}
                            <div className="messages-list">
                                {Object.entries(groupMessagesByDate(messages)).length > 0 ? (
                                    Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                                        <div key={date}>
                                            <div className='date-header'>
                                                <h4>{date}</h4>
                                            </div>
                                            {msgs.map((msg, index) => (
                                                <Message key={index} sender={msg.sender}>
                                                    <div className={`message-content ${msg.sender === 'system' ? 'system_chat' : ''}`}>
                                                        {msg.sender === 'user' ? (
                                                            <>
                                                                <div className="customer-icon">
                                                                    <Avatar email='you' isHovered={hoveredCustomerId === msg.customerId} isActive={selectedCustomer === msg.customerId} />
                                                                </div>
                                                                <span>You</span>
                                                                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>

                                                            </>
                                                        ) : msg.sender === 'system' ? (
                                                            <>
                                                                <div className='systm_manage'>
                                                                    <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="customer-icon">
                                                                    <Avatar email={msg.customerEmail} isHovered={hoveredCustomerId === msg.customerId} isActive={selectedCustomer === msg.customerId} />
                                                                </div>
                                                                <span>{msg.customerEmail || msg.customerId}</span>
                                                                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>

                                                            </>
                                                        )}
                                                        <div className='chat_both'>
                                                            {msg.message.includes("http") ? (
                                                                <img src={msg.message} alt="Message content" className="message-image" />
                                                            ) : (
                                                                msg.message
                                                            )}
                                                        </div>

                                                    </div>
                                                </Message>
                                            ))}
                                        </div>

                                    ))

                                ) : (
                                    <p>No messages yet for this customer.</p>
                                )}
                                <div ref={messagesEndRef} />

                            </div>

                            {/* Input section */}
                            {customers.length === 0 ? (

                                <div className="input-section">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                    />
                                    <button onClick={sendMessage}>Send</button>
                                </div>
                            ) : (
                                <CardTops
                                    CardTopHeading=''
                                    CardTopDescription='This conversation is marked as solved. Click the button or press ⏎ Enter to start a new conversation with the same visitor.'
                                    CarTopButton='Start new conversation'
                                    onClick={() => customerStatus(selectedCustomer, 'active')}
                                    CardTopBelow=''
                                />
                            )}
                        </ChatSection>
                    </div>
                ) : (
                    <div>
                        {customersAll.length === 0 ? (
                            <CardTops
                                CardTopHeading='No active conversations'
                                CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
                                CarTopButton='Simulate a conversation'
                                onClick={openChatbotPopup}
                                CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
                            />
                        ) : (
                            <CardTops
                                CardTopHeading='No active conversations'
                                CardTopDescription='Before starting a real conversation with your visitors, simulate one to see how things work!'
                                CarTopButton='My Open'
                                href='/assigned'
                                CardTopBelow='You can also integrate Tidio with other apps to keep everything in one place!'
                            />
                        )}
                        <AllCard />
                    </div>
                )}
            </Column>

            {/* Right Sidebar (Customer Info) */}
            {customers.length > 0 && selectedCustomer && customerInfo && (
                <CustomerInfo>
                    <h3>Customer Info</h3>
                    <p>
                        <strong>Email:</strong> {customerInfo.email}
                    </p>
                    <p>
                        <strong>Location:</strong> {customerInfo.location}
                    </p>
                    <p>
                        <strong>Phone:</strong> {customerInfo.phone}
                    </p>
                </CustomerInfo>
            )}


        </MainLayout>
    );
}

export default Assigned;
