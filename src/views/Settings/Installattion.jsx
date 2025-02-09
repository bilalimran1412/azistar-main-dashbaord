import React, { useRef } from 'react';
import TabComponent from '../../components/TabComponent/Tab';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import Lyroheader from '../../components/LyroAi/Lyroheader';

const Installattion = () => {
    const textareaRef = useRef(); // Reference for the textarea

    const generateScript = () => {
        return `
            <div id="chatbot-container"></div>
            <script src="http://localhost:3000/widget.js"></script>
        `.trim();
    };

    const copyToClipboard = async () => {
        const script = generateScript(); 
        textareaRef.current.value = script; 
        textareaRef.current.select(); 
        await navigator.clipboard.writeText(script);
        alert('Script copied to clipboard!');
    };

    const tabs = [
        {
            label: 'Manual install',
            icon: <FaHome />,
            content: (
                <>
                    <div className='flex gap-10'>
                        <div className='circle'>1</div>
                        <h4>Paste this code snippet just before the &lt;/body&gt; tag</h4>
                    </div>
                    <div className="code-snippet-container pad_left">
                        <fieldset className="code-snippet-fieldset">
                            <legend className="code-snippet-legend">
                                <span>Code snippet</span>
                            </legend>
                            <textarea 
                                ref={textareaRef} // Attach the ref to the textarea
                                readOnly 
                                className="code-snippet-textarea" 
                                style={{ height: '120px' }} // Increased height for visibility
                            />
                        </fieldset>
                        <div className="code-snippet-buttons">
                            <button type="button" className="btn btn-copy" onClick={copyToClipboard}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className="icon-copy">
                                    <path fillRule="evenodd" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z" clipRule="evenodd"></path>
                                </svg>
                                <span>Copy to clipboard</span>
                            </button>
                            <button type="button" className="btn btn-email">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" className="icon-email">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9v-2H4V8l8 5 8-5v5h2V6c0-1.1-.9-2-2-2m-8 7L4 6h16zm7 4 4 4-4 4v-3h-4v-2h4z"></path>
                                </svg>
                                <span>Send instructions via email</span>
                            </button>
                        </div>
                    </div>
                    <div className='flex next_steps_space gap-10'>
                        <div className='circle'>1</div>
                        <h4>Go to your website to check if Azistar chat is there</h4>
                    </div>
                    <div className='par_text pad_left'>
                        <p>Go to your website where you’ve installed the chat widget code. This step is required to activate the widget.</p>
                    </div>
                </>
            )
        },
        {
            label: 'Shopify',
            icon: <FaUser />,
            content: (
                <>
                    <h2>User Information</h2>
                    <p>This is some content for the User tab.</p>
                    <ol>
                        <li>Point 2.1</li>
                        <li>Point 2.2</li>
                        <li>Point 2.3</li>
                    </ol>
                </>
            )
        },
        {
            label: 'WordPress',
            icon: <FaCog />,
            content: (
                <>
                    <div>
                        <ol>
                            <li>Log in to your WordPress account and go to Dashboard</li>
                            <li>Navigate to the “Plugins” section and select “Add New”.</li>
                            <li>Type “Azistar” in the search bar and hit the “Install New” button</li>
                            <li>Once installed, make sure to hit the “Activate” button before moving on</li>
                            <li>Click “Azistar Chat” in the left-hand side menu. Choose “Log in” and enter your email and password</li>
                            <li>Choose the project you want to integrate with your website</li>
                            <li>You’re all set! Hit “Open Azistar Panel” to start using live chat & Flows</li>
                        </ol>
                    </div>
                </>
            )
        },
        {
            label: 'WooCommerce',
            icon: <FaCog />,
            content: (
                <>
                    <div>
                        <ol>
                            <li>Log in to your WordPress account and go to Dashboard</li>
                            <li>Navigate to the “Plugins” section and select “Add New”.</li>
                            <li>Type “Azistar” in the search bar and hit the “Install New” button</li>
                            <li>Once installed, make sure to hit the “Activate” button before moving on</li>
                            <li>Click “Azistar Chat” in the left-hand side menu. Choose “Log in” and enter your email and password</li>
                            <li>Choose the project you want to integrate with your website</li>
                            <li>You’re all set! Hit “Open Azistar Panel” to start using live chat & Flows</li>
                        </ol>
                    </div>
                </>
            )
        },
        {
            label: 'BigCommerce',
            icon: <FaCog />,
            content: (
                <>
                    <div>
                        <ol>
                            <li>Go to your Magento admin page, then Content  Design  Configuration. Find the store view you want to configure and click Edit in the Action column</li>
                            <li>
                                Expand the HTML Head section, paste the widget code into the Scripts and Style Sheets field, and then press the “Save configuration” button
                            </li>
                            <li>
                                Go to System  Cache management, select ALL checkboxes, and press the Refresh/Submit button
                            </li>
                            <li>
                                Once you save the settings, the chat widget will appear on your website
                            </li>
                        </ol>
                    </div>
                </>
            )
        },
        {
            label: 'Magento',
            icon: <FaCog />,
            content: (
                <>
                    <div>
                        <h6>For a detailed instruction, please follow the article in our Help Center:</h6>
                    </div>
                </>
            )
        },
    ];

    return (
        <div className='inr_dat_instruction_box'>
            <Lyroheader
                title='Installation'
                text='It looks like you haven`t installed the chat code yet. Choose from one of the installation guides below:'
                FIcon=''
                onButtonClick=''
                buttonText=''
            />
            <TabComponent tabs={tabs} />
        </div>
    );
};

export default Installattion;
