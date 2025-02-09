import React, { useState } from 'react';
import axios from 'axios';
import { generatePassword } from './passwordUtils';

const AjentSignup = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [activeclass, setActiveClass] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;




    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setActiveClass('');
        setLoading(true)
        const userId = localStorage.getItem('userId');
        const password = generatePassword();
        console.log(password);
        console.log(email)
        console.log(userId)
        const userData = {
            name,
            email,
            password,
            userId,
            role: 'Admin',
            department: 'Departments'
        };

        try {
            const response = await axios.post(`${baseURL}/agents`, userData);
            console.log('User added:', response.data);
            setActiveClass('success_active');
            setMessage('Assign Successful');
            setLoading(false);
            setTimeout(() => {
                setActiveClass('');
                onClose();
                name('');
                email('');
            }, 500)
            isOpen(false);
        } catch (error) {
            console.error('Error adding user:', error);
            setMessage('Error adding user:', error)
        }
        setLoading(false);
    };

    return (
        isOpen && (
            <div className="modalOverlay">
                <div className="modalContent">
                    <header>
                        <div className='sendtrans'>
                            <h2>Add an Agent</h2>
                        </div>
                        <button onClick={onClose} className='closeButton' aria-label="close">
                            &times;
                        </button>
                    </header>
                    <form className='send_script view_sent' onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="text"
                                value={name}
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label>

                            <input
                                type="email"
                                value={email}
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className='same_default'>
                            <span>Permissions</span>
                            <input
                                type="text"
                                value='Admin'
                                placeholder='Admin'
                                readOnly
                                required
                            />
                            <h6>Permissions enable you to limit the Agent’s access to certain parts of the product. Learn more                            </h6>
                        </label>
                        <div className='warning_stage'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="warning" class="css-1mrdc1e e11k6mr30" style={{ minwidth: '24px', minheight: '24px' }}><path fill-rule="evenodd" d="M12.002 5.675 19.586 19H4.464zm9.8 13.174L13.18 3.701c-.545-.935-1.815-.935-2.36 0L2.2 18.943c-.545.935.09 2.057 1.18 2.057h17.243c1.089 0 1.724-1.216 1.18-2.15M11 17c0 .546.454 1 1 1s1-.454 1-1-.454-1-1-1-1 .454-1 1m0-3.25c0 .682.454 1.25 1 1.25s1-.568 1-1.25v-2.5c0-.682-.454-1.25-1-1.25s-1 .568-1 1.25z" clip-rule="evenodd"></path></svg>
                            <p>
                                Editing permissions is not available in your current plan. Upgrade to Growth plan to unlock those features.
                            </p>
                        </div>
                        <label className='same_default'>
                            <input
                                type="text"
                                value='Departments'
                                placeholder='Departments'
                                required
                                readOnly
                            />
                            <h6>Departments help you to deliver the conversation to the right operator faster. Learn more                            </h6>
                        </label>
                        <div className='warning_stage'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="warning" class="css-1mrdc1e e11k6mr30" style={{ minwidth: '24px', minheight: '24px' }}><path fill-rule="evenodd" d="M12.002 5.675 19.586 19H4.464zm9.8 13.174L13.18 3.701c-.545-.935-1.815-.935-2.36 0L2.2 18.943c-.545.935.09 2.057 1.18 2.057h17.243c1.089 0 1.724-1.216 1.18-2.15M11 17c0 .546.454 1 1 1s1-.454 1-1-.454-1-1-1-1 .454-1 1m0-3.25c0 .682.454 1.25 1 1.25s1-.568 1-1.25v-2.5c0-.682-.454-1.25-1-1.25s-1 .568-1 1.25z" clip-rule="evenodd"></path></svg>
                            <p>
                                Adding departments is not available in your current plan. Upgrade to Tidio+ plan to unlock those features.
                            </p>
                        </div>

                        <div className='submit_frm'>
                            <button type="submit"
                                disabled={loading}
                            >

                                {loading ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </form>
                </div>
                {message ? (
                    <p className={`${activeclass} notify_message`}>{message}</p>
                ) : null}
            </div>
        )
    );
};

export default AjentSignup;
