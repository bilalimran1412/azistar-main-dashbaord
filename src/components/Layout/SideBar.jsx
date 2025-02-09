import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEnvelope,FaChevronRight, FaComments, FaPlay, FaUser, FaClipboardList, FaHome, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../views/Styles/sidebar.css';
import { HubIcon, KnowledgeIcon, PlayGroundICon, TagBelowIcon, SourceIcon, SuggesitionIcon, InBoxIcon, LyroICon, UserIcon, SettingIcon, LiveChatIcon, PenICon, URLIcon, LEDIcon, Browser, EnvelopIcon, FMIcon, InstaIcon, WhatsIcon, WhatsappIcon, AccountIcon, NotifiyIcon, ClockIcon, WorkFlowIcon, TeamIcon, ServiceIcon, MobileLedIcon, EmojiIcon, TagICon, GlobeICon, DomainIcon, TrackingIcon, Assign, LeftArrow, AccountBook, DetailsBil, DubleArrowIcon, KeyIcon } from '../../views/Unassigned/icons';

const Sidebar = ({ onSubmenuToggle }) => {
    const location = useLocation();
    const [isInboxOpen, setInboxOpen] = useState(false);
    const [isPlaygroundOpen, setPlaygroundOpen] = useState(false);
    const [isKnowledgeOpen, setKnowledgeOpen] = useState(false);
    const [isSettingOpen, setisSettingOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
        const inboxPaths = ['/unassigned', '/assigned', '/solved'];
        const playgroundPaths = ['/hub', '/data-sources', '/play-ground', '/data-sources/added', '/suggestions', '/configure', '/configure/general','/configure/personality', '/configure/conversation-handoff'];

        // Check if the current path matches any submenu paths
        if (inboxPaths.includes(location.pathname)) {
            setInboxOpen(true);
            setPlaygroundOpen(false);
            setKnowledgeOpen(false);
            onSubmenuToggle(true);
        } else if (playgroundPaths.includes(location.pathname)) {
            setPlaygroundOpen(true);
            setInboxOpen(false);
            setKnowledgeOpen(false);
            onSubmenuToggle(true);
        }

        const shouldOpen = playgroundPaths.includes(location.pathname);
        setOpenMenus(prev => ({ ...prev, inbox: shouldOpen, playground: shouldOpen }));
        // onSubmenuToggle(true, shouldOpen);
    }, [location.pathname, onSubmenuToggle]);

    const toggleMenu = (menu) => {
        setOpenMenus(prev => {
            const isOpen = prev[menu];
            return {
                ...Object.keys(prev).reduce((acc, key) => {
                    acc[key] = false; // Close all menus
                    return acc;
                }, {}),
                [menu]: !isOpen, 
            };
        });
    };

    const MenuItem = ({ icon, label, to, submenuItems, menuKey }) => (
        <li className='' onClick={submenuItems ? (e) => { e.stopPropagation(); toggleMenu(menuKey); } : undefined}>
            {to ? (
                <Link to={to} className={`menuItem ${location.pathname === to ? 'active' : ''}`}>
                    <>{icon} {label}</>
                </Link>
            ) : (
                <a className={`submenuItem `}>
                    {icon} {label}
                    {submenuItems && (
                        <span className={`expand-icon`}>
                            {openMenus[menuKey] ? <FaChevronUp /> : <FaChevronRight />}
                        </span>
                    )}
                </a>
            )}
            {submenuItems && (
                <div className={`sub_menu ${openMenus[menuKey] ? 'open' : ''}`}>
                    <ul>
                        {submenuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                to={item.to}
                                submenuItems={item.submenuItems}
                                menuKey={item.menuKey}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
    

    const handleInboxToggle = (event) => {
        event.stopPropagation();
        const newInboxState = !isInboxOpen;
        setInboxOpen(newInboxState);
        setPlaygroundOpen(false);
        setisSettingOpen(false);
        onSubmenuToggle(newInboxState);
    };

    const handlePlaygroundToggle = (event) => {
        event.stopPropagation(); // Prevent click event from bubbling up
        const newPlaygroundState = !isPlaygroundOpen;
        setPlaygroundOpen(newPlaygroundState);
        setInboxOpen(false);
        setisSettingOpen(false);
        onSubmenuToggle(newPlaygroundState);
    };

    const handleSettingToggle = (event) => {
        event.stopPropagation();
        const newPlaygroundState = !isSettingOpen;
        setisSettingOpen(newPlaygroundState);
        setInboxOpen(false);
        setPlaygroundOpen(false);
        onSubmenuToggle(newPlaygroundState);
    };



    const handleKnowledgeToggle = (event) => {
        event.stopPropagation();
        const newKnowledgeState = !isKnowledgeOpen;
        setKnowledgeOpen(newKnowledgeState);
        setInboxOpen(false);
        setisSettingOpen(false);
        setPlaygroundOpen(false);
        onSubmenuToggle(newKnowledgeState);
    };

    return (
        <div className='sidebarlayout'>
            <div className='logo'>
                <h2>Azistar</h2>
            </div>
            <ul className='menu'>
                <li>
                    <Link to="/" className={`menuItem ${location.pathname === '/' ? 'active' : ''}`}>
                        <div className='in_itm'><FaHome /> <span className='tooltip'>Canvas</span></div>
                    </Link>
                </li>
                <li className='menuItem' onClick={handleInboxToggle}>
                <div className='in_itm'><InBoxIcon /> <span className='tooltip'>Inbox</span></div>
                    <div className={`submenu ${isInboxOpen ? 'open' : ''}`}>
                        <div className='sub_menu_hdr'>
                            <h2>Inbox</h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/unassigned" className={`submenuItem ${location.pathname === '/unassigned' ? 'active' : ''}`}>
                                    👋   Unassigned
                                </Link>
                            </li>
                            <li>
                                <Link to="/assigned" className={`submenuItem ${location.pathname === '/assigned' ? 'active' : ''}`}>
                                    📬   My open
                                </Link>
                            </li>
                            <li>
                                <Link to="/solved" className={`submenuItem ${location.pathname === '/solved' ? 'active' : ''}`}>
                                    ✅   Solved
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to="/live-chat" className={`menuItem ${location.pathname === '/live-chat' ? 'active' : ''}`}>
                    <div className='in_itm'><FaComments /> <span className='tooltip'>Live Chat</span></div>
                    </Link>
                </li>
                <li className='menuItem' onClick={handlePlaygroundToggle}>
                <div className='in_itm'><LyroICon /> <span className='tooltip'>Playground</span></div>
                    <div className={`submenu ${isPlaygroundOpen ? 'open' : ''}`}>
                        <div className='sub_menu_hdr'>
                            <h2>Lyro AI Chatbot</h2>
                        </div>
                        <ul>
                            <li>
                                <Link to="/hub" className={`submenuItem ${location.pathname === '/hub' ? 'active' : ''}`}>
                                    <HubIcon /> Hub
                                </Link>
                            </li>
                            <li>
                                <li>
                                    <MenuItem
                                        icon={<KnowledgeIcon />}
                                        label="Knowledge"
                                        menuKey="knowledge"
                                        submenuItems={[
                                            { label: 'Data Source', to: "/data-sources", icon: <SourceIcon /> },
                                            { label: 'Suggestions', to: "/suggestions", icon: <SuggesitionIcon /> },
                                        ]}
                                    />
                                </li>
                               
                            </li>
                            <li>
                                <Link to="/play-ground" className={`submenuItem ${location.pathname === '/play-ground' ? 'active' : ''}`}>
                                    <PlayGroundICon /> Playground
                                </Link>
                            </li>
                            <li>
                                <Link to="/configure/general" className={`submenuItem ${location.pathname === '/configure/general' || '/configure/personality' || '/configure/conversation-handoff' ?  'active' : ''}`}>
                                    <SettingIcon/> Configure
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to="/signIn" className={`menuItem ${location.pathname === '/signIn' ? 'active' : ''}`}>
                    <div className='in_itm'><UserIcon /> <span className='tooltip'>Sign In</span></div>
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className={`menuItem ${location.pathname === '/signup' ? 'active' : ''}`}>
                    <div className='in_itm'><UserIcon /> <span className='tooltip'>Sign Up</span></div>
                    </Link>
                </li>
                <li className='menuItem' onClick={handleSettingToggle}>
                <div className='in_itm'><SettingIcon /> <span className='tooltip'>All Setting</span></div>
                    <div className={`submenu ${isSettingOpen ? 'open' : ''}`}>
                        <div className='sub_menu_hdr'>
                            <h2>All Setting</h2>
                        </div>
                        <ul>
                            <h6 className='sub_title'>Channels</h6>
                            <li>
                                <MenuItem
                                    icon={<LiveChatIcon />}
                                    label="Live Chat"
                                    menuKey="live"
                                    submenuItems={[
                                        { label: 'Appearance', to: "", icon: <PenICon /> },
                                        { label: 'SideBar', to: "", icon: <TagBelowIcon /> },
                                        { label: 'Installation', to: "/installation", icon: <URLIcon /> },
                                        { label: 'Chat Page', to: "", icon: <LEDIcon /> },
                                        { label: 'Translations', to: "", icon: <Browser /> },
                                    ]}
                                />
                            </li>

                            <li>
                                <Link to="/live-chat" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <EnvelopIcon />   Helpdesk
                                </Link>
                            </li>
                            <li>
                                <Link to="/live-chat" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <FMIcon />   Facebook Messenger
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <InstaIcon />   Instagrame
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <WhatsappIcon />  WhatsApp
                                </Link>
                            </li>
                            <h6 className='sub_title'>Personal</h6>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <AccountIcon />  Account
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <NotifiyIcon /> Notifications
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <ClockIcon /> Operating hours
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <WhatsappIcon />  WhatsApp
                                </Link>
                            </li>
                            <h6 className='sub_title'>General</h6>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <AccountIcon />  Canned Response
                                </Link>
                            </li>
                            <li>
                                <li>
                                    <MenuItem
                                        icon={<WorkFlowIcon />}
                                        label="Workflow"
                                        menuKey="workflow"
                                        submenuItems={[
                                            { label: 'Chat assignment', to: "", icon: <Assign /> },
                                            { label: 'Automatic solve', to: "", icon: <LeftArrow /> },
                                        ]}
                                    />
                                </li>

                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <TeamIcon /> Team
                                </Link>
                                <div className={`sub_menu ${'' ? 'open' : ''}`}>
                                    <ul>
                                        <li>
                                            <Link to="/live-chat" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                                <PenICon />   Team Mate
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <ServiceIcon />  Service Level Agreements
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <EmojiIcon /> Customer satisfaction
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <MobileLedIcon /> Download apps
                                </Link>
                            </li>
                            <li>
                                <Link to="" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <TagICon />  Tags and properties
                                </Link>
                            </li>
                            <li>
                                <li>
                                    <MenuItem
                                        icon={<GlobeICon />}
                                        label="Project & Billing"
                                        menuKey="billing"
                                        submenuItems={[
                                            { label: 'Preferences', to: "", icon: <AccountBook /> },
                                            { label: 'Billing', to: "", icon: <DetailsBil /> },
                                        ]}
                                    />
                                </li>
                            </li>
                            <li>
                                <Link to="/live-chat" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <DomainIcon /> Domains
                                </Link>
                            </li>
                            <li>
                                <Link to="/live-chat" className={`submenuItem ${location.pathname === '' ? 'active' : ''}`}>
                                    <TrackingIcon />  Tracking
                                </Link>
                            </li>
                            <li>
                                <MenuItem
                                    icon={<DubleArrowIcon />}
                                    label="Developer"
                                    menuKey="developer"
                                    submenuItems={[
                                        { label: 'Project data', to: "", icon: <DubleArrowIcon/> },
                                        { label: 'OpenAPI', to: "", icon: <KeyIcon/> },
                                    ]}
                                />
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
