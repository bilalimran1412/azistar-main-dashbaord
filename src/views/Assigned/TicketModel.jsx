import React, { useEffect, useState } from 'react';
import { HighIcon, LowIcon, NormalIcon } from '../Unassigned/icons';

const TicketModal = ({ isOpen, onClose, customerId, oldUserId }) => {
    const [assignees, setAssignees] = useState([]);
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchInterval = 5000;
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const [subject, setSubject] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [ticketMessage, setTicketMessage] = useState('');
    const [priority, setPriority] = useState('Normal');

    const siteUrls = [
        { id: 1, name: 'Site 1', url: 'https://site1.com', icon: 'icon-path-1.svg' },
        { id: 2, name: 'Site 2', url: 'https://site2.com', icon: 'icon-path-2.svg' },
        // Add more sites as needed
    ];

    const priorities = [
        { value: 'Normal', icon: <NormalIcon/> },
        { value: 'High', icon: <HighIcon/> },
        { value: 'Low', icon: <LowIcon/> }
    ];

    const fetchAgentByUserId = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const agentsResponse = await fetch(`${baseURL}/agents/${userId}`);
            if (agentsResponse.ok) {
                const agentsData = await agentsResponse.json();
                setAssignees(Array.isArray(agentsData) ? agentsData : [agentsData]);
            }

            const usersResponse = await fetch(`${baseURL}/auth/${oldUserId}`);
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                if (usersData && usersData.data) {
                    const user = usersData.data;
                    setAssignees(prevAssignees => {
                        const existingUserIds = prevAssignees.map(assignee => assignee._id);
                        if (!existingUserIds.includes(user._id)) {
                            return [...prevAssignees, user];
                        }
                        return prevAssignees;
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/customers/updateuser/${customerId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newuserId: selectedAssignee }),
            });

            if (response.ok) {
                const updatedChat = await response.json();
                console.log('Chat updated successfully:', updatedChat);
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Failed to update chat:', errorData.message);
                alert('Failed to update assignee. Please try again.');
            }
        } catch (error) {
            console.error('Error updating assignee:', error);
            alert('An error occurred while updating the assignee. Please try again.');
        } finally {
            setLoading(false);
            onClose();
        }
    };

    useEffect(() => {
        let intervalId;
        if (isOpen) {
            fetchAgentByUserId();
            intervalId = setInterval(() => {
                fetchAgentByUserId();
            }, fetchInterval);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent tiket_form_main">
                <button className="closeButton" onClick={onClose} aria-label="Close button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
                <h2 className="sendtrans">Create a ticket</h2>
                <form className='send_script' onSubmit={handleSubmit}>
                    <div className="formField tiket_form">
                        <label>
                            <input
                                name="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="css-1e8attl e1folx2s0"
                                required
                            />
                            <span>Ticket Subject</span>
                        </label>
                    </div>
                    <div className="formField tiket_form">
                        <label>
                            <input
                                name="contactEmail"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className="css-1e8attl e1folx2s0"
                                required
                            />
                            <span>To (customer e-mail address)</span>
                        </label>
                    </div>
                    <div className="formField tiket_form">
                        <label>
                            <span>From (sender address)</span>
                            <select className="css-1opvox5 e7vvrml7" required>
                                {siteUrls.map(site => (
                                    <option key={site.id} value={site.url}>
                                        <img src={site.icon} alt="" style={{ width: '20px', marginRight: '8px' }} />
                                        {site.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="formField tiket_form">
                        <label>
                            <span>Priority</span>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="css-1opvox5 e7vvrml7"
                            >
                                {priorities.map(priorityItem => (
                                    <option key={priorityItem.value} value={priorityItem.value}>
                                        {priorityItem.icon}
                                        {priorityItem.value}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="formField tiket_form">
                        <label>
                            <span>Assignee</span>
                            <select
                                value={selectedAssignee}
                                onChange={(e) => setSelectedAssignee(e.target.value)}
                                className="css-1opvox5 e7vvrml7"
                                required
                            >
                                <option value="">Select Assignee</option>
                                {assignees.map(assignee => (
                                    <option key={assignee._id} value={assignee._id}>
                                        <img src='avatar-icon.svg' alt="" style={{ width: '20px', marginRight: '8px' }} />
                                        {assignee.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="formField tiket_form">
                        <textarea
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                            placeholder="Enter a ticket message..."
                            className="css-2gtwu eo5a53u1"
                            required
                        />
                    </div>
                    <div className='buttonGroup'>
                        <button type="submit" className="btn btn-primary">
                            {loading ? 'Submitting...' : 'Submit as Open'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketModal;
