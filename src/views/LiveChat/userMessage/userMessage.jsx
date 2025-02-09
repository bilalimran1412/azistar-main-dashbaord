import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component
import { BsTrash } from 'react-icons/bs'; // Assuming you need icons
import '../live-chat.css'; // Assuming you have appropriate styles

function UserMessages() {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        // Fetch all users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${baseURL}/auth/getuser`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setUsers(result);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Fetch messages when a user is selected
        if (selectedUserId) {
            const fetchMessages = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${baseURL}/messages?userId=${selectedUserId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const result = await response.json();
                    setMessages(result);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchMessages();
        }
    }, [selectedUserId]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this record permanently?");
        if (isConfirmed) {
            try {
                const response = await fetch(`${baseURL}/messages/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
                } else {
                    throw new Error(`Failed to delete message with ID ${id}`);
                }
            } catch (error) {
                console.error('Error deleting message:', error);
                setError(error.message);
            }
        } else {
            console.log('Deletion cancelled by user.');
        }
    };

    return (
        <div>
            <div className='hdr_st_so hdr_deta'>
                <div>
                    <h2>User Messages</h2>
                    <p>Select a user to view their messages.</p>
                </div>
            </div>

            <div className="scrollAreaViewport">
                {loading && !selectedUserId ? (
                    <Loader />
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : !selectedUserId ? (
                    <div>
                        <h3>Select a User</h3>
                        <ul>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <li id={user.id} key={user.id}>
                                        <button onClick={() => setSelectedUserId(user.id)}>{user.email}</button>
                                    </li>
                                ))
                            ) : (
                                <p>No users available</p>
                            )}
                        </ul>
                    </div>
                ) : (
                    <div>
                        <h3>Messages for User ID: {selectedUserId}</h3>
                        {loading ? (
                            <Loader />
                        ) : (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Sender</th>
                                        <th>Message</th>
                                        <th>Timestamp</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length > 0 ? (
                                        messages.map(message => (
                                            <tr key={message.id}>
                                                <td>{message.sender}</td>
                                                <td>{message.text}</td>
                                                <td>{new Date(message.timestamp).toLocaleString()}</td>
                                                <td>
                                                    <button onClick={() => handleDelete(message.id)}><BsTrash /></button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No messages available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                        <button onClick={() => setSelectedUserId(null)}>Back to User List</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserMessages;
