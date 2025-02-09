import React, { useEffect, useState } from 'react';

const ReassignModel = ({ isOpen, onClose, customerId, oldUserId }) => {
    const [assignees, setAssignees] = useState([]); // List of agents
    const [selectedAssignee, setSelectedAssignee] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchInterval = 5000;
    const baseURL = process.env.REACT_APP_API_BASE_URL;


    const fetchAgentByUserId = async () => {
        try {
            const userId = localStorage.getItem('userId');
            // Fetch agents
            const agentsResponse = await fetch(`${baseURL}/agents/${userId}`);
            if (agentsResponse.ok) {
                const agentsData = await agentsResponse.json();
                setAssignees(Array.isArray(agentsData) ? agentsData : [agentsData]);
            } else {
                console.error('Failed to fetch agents data. Status:', agentsResponse.status);
            }

            // Fetch users
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
            } else {
                console.error('Failed to fetch users data. Status:', usersResponse.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    // Handle selecting an assignee
    const handleAssigneeSelect = async (assigneeName, assigneeId) => {
        console.log(`Selected assignee: ${assigneeName}`);
        setLoading(true);
        try {
            const response = await fetch(`${baseURL}/customers/updateuser/${customerId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newuserId: assigneeId }),
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
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                </button>
                <header className='sendtrans'>
                    <h2>Reassign the conversation</h2>
                </header>
                <div className="assigneeSelect">
                    <label htmlFor="assigneeSelect">
                        <span>Reassign the conversation to...</span>
                        <select
                            id="assigneeSelect"
                            value={selectedAssignee ? selectedAssignee._id : ''} // Control the value
                            onChange={(e) => {
                                const { value } = e.target;
                                const selected = assignees.find(assignee => assignee._id === value); // Adjusted to use _id
                                setSelectedAssignee(selected);
                            }}
                        >
                            <option value="" disabled>Select an assignee</option>
                            {assignees.length > 0 ? (
                                assignees.map(assignee => (
                                    <option key={assignee._id} value={assignee._id}>
                                        {assignee.name}  {assignee.email}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Loading...</option>
                            )}
                        </select>
                    </label>
                    <div className="buttonGroup modalActions">
                        <button
                            type="button"
                            className="btn copyButton btn-primary"
                            onClick={() => selectedAssignee && handleAssigneeSelect(selectedAssignee.name, selectedAssignee._id)}
                            disabled={loading}
                        >
                            {loading ? 'Reassigning...' : 'Reassign'}
                        </button>
                        <button type="button" className="exportButton btn btn-default" onClick={onClose}>Close</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReassignModel;
