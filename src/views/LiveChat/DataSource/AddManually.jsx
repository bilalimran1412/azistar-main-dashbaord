import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import Loader from '../Loader/Loader'

function AddManuallyIntent({ closeIndentForm, onSubmit }) {
    const [tag, setTag] = useState('')
    const [patterns, setPatterns] = useState('')
    const [responses, setResponses] = useState('')
    const [showLoader, setShowLoader] = useState(false)
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);

        const patternsArray = patterns.split(',').map((pattern) => pattern.trim());
        const responsesArray = responses.split(',').map((response) => response.trim());

        // Generate variations based on patterns
        const generatedResponses = patternsArray.map((pattern, index) => ({
            pattern,
            response: responsesArray[index] || '', 
        }));

        const data = {
            tag: tag,
            patterns: patternsArray,
            responses: responsesArray,
            generatedResponses: generatedResponses, 
        };

        try {
            const response = await fetch(`${baseURL}/scrap_data/addintent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to add intent');
            }

            setTimeout(() => {
                setTag('');
                setPatterns('');
                setResponses('');
                setShowLoader(false);
                onSubmit();
                closeIndentForm();
            }, 3000);
        } catch (error) {
            console.error('Error adding intent:', error);
            alert('Failed to add intent. Please try again.', error);
            onSubmit();
        }
    };

    return (
        <div className='drop_dwn_form add_manually_form'>
            <div className='inr_drop_dn_frm'>
                <div className='frm-outer'>
                    <div className='hdr_form'>
                        <div className='title_form'>
                            <div className='submit_btn'>
                                <button className='btn' onClick={handleSubmit} disabled={showLoader}>
                                    {showLoader ? 'Sending...' : 'Save and Close'}
                                </button>
                            </div>
                            <div className='icon_close' onClick={closeIndentForm}>
                                <MdClose />
                            </div>
                        </div>
                    </div>
                    <div className='form_show url_sub_form'>
                        <form>
                            <label className='input_lble_url'>
                                <input type='text' value={tag} placeholder='Tag' onChange={(e) => setTag(e.target.value)} required />
                            </label>
                            <label className='question input_lble_url'>
                                <textarea
                                    value={patterns}
                                    placeholder='Question'
                                    onChange={(e) => setPatterns(e.target.value)}
                                    rows='4'
                                    required
                                />
                            </label>
                            <label className='response input_lble_url'>
                                <textarea
                                    placeholder='Response'
                                    value={responses}
                                    onChange={(e) => setResponses(e.target.value)}
                                    rows='4'
                                    required
                                />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddManuallyIntent