import React, { useState, useEffect, useRef } from 'react';
import '../Styles/userconversation.css';
import TranscriptModal from './TranScriptPreviewModel';
import SendTranscriptModal from './SendTranscriptModal';
import BanVistor from './BanVistor';
import TicketModal from './TicketModel';

const ChatHeader = ({ SolvedChat, messages, handleDelete, VisterBan, addMessage, userId, customerId, oldUserId }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMoreOptionsOpen, setMoreOptionsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSendModalOpen, setSendModalOpen] = useState(false);
    const [isBanModalOpen, setBanModalOpen] = useState(false);
    const [assignee, setAssignee] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchInterval = 5000;
    const [isTiketModel, setisTiketModel] = useState(false);
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const fetchAgentByUserId = async () => {
        try {
            const userId = localStorage.getItem('userId');
            // Fetch agents
            const agentsResponse = await fetch(`${baseURL}/agents/${userId}`);
            if (agentsResponse.ok) {
                const agentsData = await agentsResponse.json();
                setAssignee(Array.isArray(agentsData) ? agentsData : [agentsData]);
            } else {
                console.error('Failed to fetch agents data. Status:', agentsResponse.status);
            }

            // Fetch users
            const usersResponse = await fetch(`${baseURL}/auth/${oldUserId}`);

            if (usersResponse.ok) {
                const usersData = await usersResponse.json();

                if (usersData && usersData.data) {

                    const user = usersData.data;

                    setAssignee(prevAssignees => {
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

    useEffect(() => {
        let intervalId;
        fetchAgentByUserId();
        intervalId = setInterval(() => {
            fetchAgentByUserId();
        }, fetchInterval);
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []);

    const toggleDropdown = (event) => {
        console.log('done')
        event.stopPropagation();
        setDropdownOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTiketClick = async () => {
        setisTiketModel(true); 
    };


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
            setLoading(false); // End loading state
        }
    };



    const handleMoreOptionSelect = (option) => {
        console.log(`Selected option: ${option}`);
        if (option === 'Transcript preview') {
            setModalOpen(true);
            addMessage('Preview This Chat');
        } else if (option === 'Send transcript') {
            setSendModalOpen(true);
        } else if (option === 'Ban visitor') {
            setBanModalOpen(true);
        }
        setMoreOptionsOpen(false);
    };




    const handleVistors = () => {
        VisterBan();
        addMessage("Visitor has been banned.");
        setBanModalOpen(false);
    };

    const transcript = messages.map(msg => {
        const time = new Date(msg.timestamp).toLocaleString();
        const sender = msg.sender === 'user' ? 'You' : msg.customerEmail;
        return `(${time}) ${sender}: ${msg.message}`;
    }).join('\n');

    const handleCopy = () => {
        navigator.clipboard.writeText(transcript);
        alert("Copied to clipboard!");
    };

    const handleDownloadCSV = () => {
        const csvContent = [
            ['Time', 'User', 'Message'],
            ...messages.map(msg => [
                new Date(msg.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                msg.sender === 'user' ? 'You' : msg.customerEmail,
                msg.message
            ])
        ]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "chat_transcript.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addMessage("Chat transcript has been exported as CSV.");
    };

    const handleSendTranscript = async (email) => {
        try {
            const response = await fetch(`${baseURL}/customers/send-transcript`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, transcript }),
            });
            if (response.ok) {
                alert('Transcript sent successfully!');
            } else {
                alert('Failed to send transcript.');
            }
        } catch (error) {
            console.error('Error sending transcript:', error);
            alert('Error sending transcript.');
        } finally {
            setSendModalOpen(false);
        }
    };

    return (
        <header className='header'>
            <div className='dropdown' ref={dropdownRef}>
                <div
                    className='trigger'
                    role="button"
                    tabIndex="0"
                    onClick={toggleDropdown}
                    onKeyPress={toggleDropdown}
                >
                    <p className='assigneeLabel'>Assignee</p>
                    {assignee.length > 0 ? (
                        <>
                            <div className='avatarContainer'>
                                <img src={assignee[0].image} alt="Assignee Avatar" className='avatar' />
                            </div>
                            <p className='assigneeName'>
                                {userId === customerId ? "You" : assignee.name }
                            </p>
                        </>
                    ) : (
                        <p className='assigneeName'>Loading...</p>
                    )}

                    <svg className='icon' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="m7 10 5 5 5-5z"></path>
                        <path fill="none" d="M0 0h24v24H0z"></path>
                    </svg>
                </div>
                {isDropdownOpen && (
                    <div className='dropdownMenuAjent'>
                        <ul className='menuList'>
                            {assignee.map((assignee, index) => (
                                <li key={index} className='menuItem'>
                                    <button
                                        type="button"
                                        className='menuButton'
                                        onClick={() => handleAssigneeSelect(assignee.name, assignee._id, customerId)}
                                    >
                                        <div role="option" className='option'>
                                            <div
                                                className='avatar'
                                                style={{ backgroundImage: `url(${assignee.image || 'default_image_url'})` }}
                                            ></div>
                                            <span>{assignee.name} {assignee.email}</span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
            <div className='actionButtons'>
                <button type="button" className='solveButton' onClick={SolvedChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20">
                        <path fill="none" d="M0 0h20v20H0z"></path>
                        <path d="M15.833 2.5c.917 0 1.667.75 1.667 1.667v11.666c0 .917-.75 1.667-1.667 1.667H4.158c-.925 0-1.658-.75-1.658-1.667l.008-11.666c0-.917.725-1.667 1.65-1.667zm0 1.667H4.158V12.5H7.5c0 1.383 1.125 2.5 2.5 2.5s2.5-1.117 2.5-2.5h3.333zm-2.692 1.569 1.123 1.123-5.137 5.138-2.709-2.71 1.13-1.12 1.579 1.579z"></path>
                    </svg>
                    Solve
                </button>
                <button onClick={handleTiketClick} type="button" aria-label="Create a ticket" className='ticketButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M20.586 13.413A2 2 0 0 1 22 10v-4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 1 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-1.414-.586M13 8v3h3v2h-3v3h-2v-3H8v-2h3V8z" clipRule="evenodd"></path>
                    </svg>
                </button>
                <div className='moreOptions'>
                    <button
                        type="button"
                        aria-label="More options"
                        className='moreButton'
                        onClick={() => setMoreOptionsOpen(prev => !prev)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                        </svg>
                    </button>
                    {isMoreOptionsOpen && (
                        <div className='dropdown__menu'>
                            <ul style={{ width: '200px' }}>
                                <li>
                                    <button className='css-1pfpjj3' onClick={handleDownloadCSV}>
                                        Export transcript to .CSV
                                    </button>
                                </li>
                                <li>
                                    <button className='css-1pfpjj3' onClick={() => handleMoreOptionSelect('Transcript preview')}>
                                        Transcript preview
                                    </button>
                                </li>
                                <li>
                                    <button className='css-1pfpjj3' onClick={() => handleMoreOptionSelect('Send transcript')}>
                                        Send transcript
                                    </button>
                                </li>
                                <li>
                                    <button className='css-1pfpjj3' onClick={() => handleMoreOptionSelect('Ban visitor')}>
                                        Ban visitor
                                    </button>
                                </li>
                                <li>
                                    <button className='css-1pfpjj3' onClick={handleDelete}>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <TranscriptModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                transcript={transcript}
                onCopy={handleCopy}
                onExport={handleDownloadCSV}
            />

            <SendTranscriptModal
                isOpen={isSendModalOpen}
                onClose={() => setSendModalOpen(false)}
                transcript={transcript}
                onSend={handleSendTranscript}
            />

            <BanVistor
                isOpen={isBanModalOpen}
                onVistorBan={handleVistors}
                onClose={() => setBanModalOpen(false)}
            />

            <TicketModal isOpen={isTiketModel} onClose={() => setisTiketModel(false)} customerId= {customerId} oldUserId={oldUserId}/>
        </header>
    );
};

export default ChatHeader;
