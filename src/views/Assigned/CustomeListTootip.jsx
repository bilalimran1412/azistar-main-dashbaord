// components/TooltipComponent.js

import React from 'react';
import '../Styles/index.css'
import { useState } from 'react';
import ReassignModel from './ReassignModel';
const baseURL = process.env.REACT_APP_API_BASE_URL;


const CustomerListTooltip = ({isVisible, selectedCustomer, handleSolved, handleDelete, onSelect, markAsUnread, oldUserId}) => {
    const [userData, setUserData] = useState(null);
    const [isReassignModelOpen, setReassignModelOpen] = useState(false);

    const fetchUserData = async () => {
        const response = await fetch(`${baseURL}/auth/getuser`);
        
        if (response.ok) {
            const data = await response.json();
            setUserData(data);
        } else {
            console.error("Failed to fetch user data");
            setUserData(null);
        }
    };

    
    const handleReassignClick = async () => {
        setReassignModelOpen(true); 
    };
    
    return (
        <div
            data-tippy-root=""
            id="tippy-21"
            style={{ zIndex: 100, visibility: isVisible ? 'visible' : 'hidden', position: 'relative', inset: '0px auto auto 0px', margin: 0}}
        >
            <div className="tippy-box" data-state="visible" tabIndex="-1" data-theme="dropdown notranslate" data-animation="shift" role="tooltip" style={{ maxWidth: '350px', transitionDuration: '0ms' }} data-placement="bottom-start">
                <div className="tippy-content" data-state="visible" style={{ transitionDuration: '0ms' }}>
                    <div className={selectedCustomer}> 
                        <ul className="tootip_un">
                            <li className="tooltip_list">
                                <button type="button" onClick={markAsUnread} className="css-1pfpjj3 e574d5b9">
                                    <span className="css-g16dan e574d5b2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className="css-0 e11k6mr30">
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M22 8.98V18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10.1c-.06.32-.1.66-.1 1 0 1.48.65 2.79 1.67 3.71L12 11 4 6v2l8 5 5.3-3.32c.54.2 1.1.32 1.7.32 1.13 0 2.16-.39 3-1.02M16 5c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3"></path>
                                        </svg>
                                    </span>
                                    <span className="css-1946f34 e574d5b0">Mark as unread</span>
                                </button>
                            </li>
                            <li className="tooltip_list">
                                <button type="button" className="css-1pfpjj3 e574d5b9" onClick={handleSolved}>
                                    <span className="css-g16dan e574d5b2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" className="css-0 e11k6mr30">
                                            <path fill="none" d="M0 0h20v20H0z"></path>
                                            <path d="M15.833 2.5c.917 0 1.667.75 1.667 1.667v11.666c0 .917-.75 1.667-1.667 1.667H4.158c-.925 0-1.658-.75-1.658-1.667l.008-11.666c0-.917.725-1.667 1.65-1.667zm0 1.667H4.158V12.5H7.5c0 1.383 1.125 2.5 2.5 2.5s2.5-1.117 2.5-2.5h3.333zm-2.692 1.569 1.123 1.123-5.137 5.138-2.709-2.71 1.13-1.12 1.579 1.579z"></path>
                                        </svg>
                                    </span>
                                    <span className="css-1946f34 e574d5b0">Solve</span>
                                </button>
                            </li>
                            <li className="tooltip_list">
                                <button type="button" className="css-1pfpjj3 e574d5b9" onClick={onSelect}>
                                    <span className="css-g16dan e574d5b2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                        </svg>
                                    </span>
                                    <span className="css-1946f34 e574d5b0">Select</span>
                                </button>
                            </li>
                            <li className="tooltip_list">
                                <button type="button" onClick={handleReassignClick} className="css-1pfpjj3 e574d5b9">
                                    <span className="css-g16dan e574d5b2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className="css-0 e11k6mr30">
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path d="M9.273 12.023a3.635 3.635 0 0 1-3.637-3.637A3.635 3.635 0 0 1 9.273 4.75a3.635 3.635 0 0 1 3.636 3.636 3.635 3.635 0 0 1-3.636 3.637M9.273 13.84c2.427 0 7.273 1.22 7.273 3.637v1.819H2v-1.819c0-2.418 4.845-3.636 7.273-3.636M14.727 10.205h3.646V7.477L22 11.114l-3.627 3.636v-2.727h-3.646z"></path>
                                        </svg>
                                    </span>
                                    <span className="css-1946f34 e574d5b0">Reassign</span>
                                </button>
                            </li>
                            <li className="tooltip_list">
                                <button type="button" className="css-1pfpjj3 e574d5b9" onClick={handleDelete}>
                                    <span className="css-g16dan e574d5b2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className="css-0 e11k6mr30">
                                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                        </svg>
                                    </span>
                                    <span className="css-1946f34 e574d5b0">Delete</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ReassignModel isOpen={isReassignModelOpen} onClose={() => setReassignModelOpen(false)} customerId= {selectedCustomer} oldUserId={oldUserId}/>
        </div>
    );
};

export default CustomerListTooltip;