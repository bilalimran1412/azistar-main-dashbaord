import React, { useState } from 'react'
import DropDownForm from './DropDownForm'
import '../live-chat.css'
import AddManuallyIntent from './AddManually'
import { MdAdd } from 'react-icons/md';
import Lyroheader from '../../../components/LyroAi/Lyroheader';


const KnowledgeComponent = () => {
    const [showForm, setShowForm] = useState(false)
    const [showIndentForm, setShowIndentForm] = useState(false)
    const [message, setMessage] = useState('');
    const [activeclass, setActiveClass] = useState('');
    const baseURL = process.env.REACT_APP_API_BASE_URL;


    const displayForm = () => {
        setShowForm(true)
        setMessage('')
        setActiveClass('')
    }

    const closeForm = () => {
        setShowForm(false)
        setMessage('')
        setActiveClass('')
    }

    const closeIndentForm = () => {
        setShowIndentForm(false)
        setMessage('')
        setActiveClass('')
    }

    // Function to handle form submission
    const handleSubmit = async (url) => {
        try {
            const userId = localStorage.getItem('userId')
            const response = await fetch(`${baseURL}/scrap_data/addurl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url, userId })
            })
            const responseData = await response.json();
            console.log(responseData)

            if (response.ok) {
                setActiveClass('success_active')
                setMessage('URL submitted successfully')
                setShowForm(false)

                window.location.href = '/data-sources/added';
            } else {
                setActiveClass('error_active')
                setMessage('Failed to submit URL')
            }
        } catch (error) {
                setActiveClass('error_active')
                setMessage('Please try again')
            console.error('error_active')
        } finally {
            
        }
    }

    // Function Indent

    const IntentForm = () => {
        setShowIndentForm(true)
        setMessage('')
    }

    const handleIndentSubmit = async () => {
        setShowIndentForm(false)
        setMessage('Your intent saved')
    }

    return (
        <div className='main-data-sources'>
            <Lyroheader
                title='Data sources'
                text ='Azister will use the knowledge you add here to answer customer questions.'
                Fhref ='/data-sources/added'
                FIcon = {<MdAdd />}
                buttonText = 'Added Item'
            />
           
            <div className='mn-box-select'>
                <div className='inr_dat_box'>
                    <h2>You have no questions and answers yet</h2>
                    <p>
                        Azister needs knowledge to answer customer questions. Select one of the options below to do so. The more you feed
                        it, the better it performs.
                    </p>
                    <div className='box_event'>
                        <div className='evnt_inr_bx' onClick={displayForm}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                style={{ minWidth: '24px', minHeight: '24px' }}
                            >
                                <path fill='none' d='M0 0h24v24H0z'></path>
                                <path d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2m6.93 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8M12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96M4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8 8 0 0 1 5.08 16m2.95-8H5.08a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.03 8M12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96M14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2m.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2z'></path>
                            </svg>
                            <h6>Website URL</h6>
                            <p style={{ color: 'gray' }}>Provide the URL of your site to feed Azister with knowledge from it.</p>
                        </div>
                        <div onClick={IntentForm} className='evnt_inr_bx'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                style={{ minWidth: '24px', minHeight: '24px' }}
                            >
                                <path fill='none' d='M0 0h24v24H0z'></path>
                                <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM5.92 19H5v-.92l9.06-9.06.92.92zM20.71 5.63l-2.34-2.34c-.2-.2-.45-.29-.71-.29s-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41'></path>
                            </svg>
                            <h6>Add manually</h6>
                            <p style={{ color: 'gray' }}>Manually write your own specific questions.</p>
                        </div>
                    </div>
                </div>
            </div>
            {showForm && <DropDownForm closeForm={closeForm} onSubmit={handleSubmit} />}
            {showIndentForm && <AddManuallyIntent closeIndentForm={closeIndentForm} onSubmit={handleIndentSubmit} />}
            <p className={`${activeclass} notify_message`}>{message}</p>
        </div>
    )
}

export default KnowledgeComponent
