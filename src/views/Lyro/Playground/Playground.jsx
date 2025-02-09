import React, { useState, useEffect, useRef } from 'react';
import Chatbot from '../../LiveChat/ChatBot'
import '../../LiveChat/live-chat.css';
import './playground.css';
import Lyroheader from '../../../components/LyroAi/Lyroheader';
import { MdAdd, MdRefresh } from 'react-icons/md';
import Loader from '../../LiveChat/Loader/Loader';

const Playground = () => {
    const [patterns, setPatterns] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 7;
    const [input, setInput] = useState('');
    const chatbotRef = useRef();
    const [loading, setLoading] = useState(false);
    const [chatbotKey, setChatbotKey] = useState(Date.now());
    const baseURL = process.env.REACT_APP_API_BASE_URL;


    useEffect(() => {
        const fetchIntents = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await fetch(`${baseURL}/scrap_data/website-quwstion/${userId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                console.log('chl yr oh aya hi', data); 
    
                const patternsArray = data.scrapData.scrap_data
                    .filter(item => item && item.patterns)
                    .flatMap(item => item.patterns);
    
                setPatterns(patternsArray);
                console.log('Patterns:', patternsArray); // Check the patterns being set
            } catch (error) {
                console.error('Error fetching intents:', error);
            }
        };
    
        fetchIntents();
    }, []);
    

    const handleShowMore = () => {
        setCurrentIndex(prevOffset => Math.min(prevOffset + itemsPerPage, patterns.length));
    };

    const handleShowPrevious = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - itemsPerPage, 0));
    };

    const displayedPatterns = patterns.slice(currentIndex, currentIndex + itemsPerPage);
    console.log('Displayed Patterns:', displayedPatterns);
    const handlePatternClick = (pattern) => {
        if (chatbotRef.current) {
            chatbotRef.current.sendMessage(pattern);
        }
    };

    const handleResetTest = () => {
        setLoading(true);
        setChatbotKey(Date.now());

        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div className='main-data-sources'>
            <Lyroheader
                title='Play Ground'
                text=''
                Fhref='/'
                FIcon={<MdAdd />}
                buttonText='Activate'
            />

            <div className='playground mn-box-select'>
                <div className='inr_dat_box'>
                    <div className='chat_bot_playground'>
                        {loading ? (
                            <div className="loader"><Loader /></div>
                        ) : (
                            <Chatbot key={chatbotKey} ref={chatbotRef} />
                        )}
                    </div>
                    <div className='playground_context'>
                        <Lyroheader
                            title='Test Azister with your knowledge'
                            text='Type a question or try following examples to see how Azister responds. Feel free, test questions do not count toward the Azister conversations limit.'
                            FIcon={<MdRefresh />}
                            onButtonClick={handleResetTest}
                            buttonText='Reset Test'
                        />


                        <ul className='quize_sec'>
                            {displayedPatterns.map((pattern, index) => (
                                <li onClick={() => handlePatternClick(pattern)} key={index}>{pattern}</li>
                            ))}
                        </ul>

                        {currentIndex + itemsPerPage < patterns.length && (
                            <button type="button" onClick={handleShowMore} className="btn btn-new btn-size-l btn-primary undefined">
                                <span>Show more</span>
                            </button>
                        )}

                        {currentIndex > 0 && (
                            <button type="button" onClick={handleShowPrevious} className="btn btn-new btn-size-l btn-primary undefined">
                                <span>Show previous</span>
                            </button>
                        )}

                        <div className="css-1dgwj5h e1l5a2a40">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="default"
                                className="css-1jraybv e11k6mr30"
                                style={{ minWidth: '24px', minHeight: '24px' }}
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
                            </svg>
                            <p className="css-17dr1mu eimqq0f0">
                                To enhance Azister response quality and efficiency, keep adding more knowledge.{' '}
                                <a href="/data-sources">Add more knowledge</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playground;
