// components/Layout.js
import { useState } from 'react';
import '../../views/Styles/layout.css';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const handleSubmenuToggle = (isOpen) => {
        setIsSubmenuOpen(isOpen);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar isSubmenuOpen={isSubmenuOpen} onSubmenuToggle={handleSubmenuToggle} />
            <main className={`main ${isSubmenuOpen ? 'layoutWithSubmenu' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
