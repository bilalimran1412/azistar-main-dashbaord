// components/Layout.js
import { useState } from 'react';
import '../../views/Styles/otherlayout.css';
import Sidebar from './SideBar';

const otherLayout = ({ children }) => {



    return (
        <div className='other_layout' style={{ display: 'flex' }}>
            <main className='main'>
                {children}
            </main>
        </div>
    );
};

export default otherLayout;
