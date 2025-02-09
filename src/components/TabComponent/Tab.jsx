import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './tab.css';

const TabComponent = ({ tabs }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname.split('/').pop(); // Get the last segment of the path
    const [activeTab, setActiveTab] = useState(currentTab || tabs[0]?.label);

    const handleTabClick = (tab) => {
        setActiveTab(tab.label);
        if (tab.to) {
            navigate(tab.to); // Navigate to the specified route
        }
    };

    return (
        <div className="tab-container">
            <div className="tab-menu">
                {tabs.map(tab => (
                    <div
                        key={tab.label}
                        className={`tab-menu-item ${activeTab === tab.label ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.icon} 
                        {tab.label}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {/* Render the JSX directly */}
                {tabs.find(tab => tab.label === activeTab)?.content}
            </div>
        </div>
    );
};

export default TabComponent;
