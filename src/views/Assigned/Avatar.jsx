import React from 'react';
import '../Styles/index.css';

const Avatar = ({ email, isHovered, isActive }) => {
    const displayName = email ? email.charAt(0).toUpperCase() : '?';

    return (
        <div className={`avatar ${isHovered ? 'hidden' : ''}`}>
            {displayName}
            {isActive && <span className="active-dot" />}
        </div>
    );
};

export default Avatar;