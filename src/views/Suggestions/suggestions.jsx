import React from 'react'
import Lyroheader from '../../components/LyroAi/Lyroheader'
import { MdAdd } from 'react-icons/md';
import Box from '../../components/Box';

function suggestions() {
    return (
        <div>
            <div className='main-data-sources'>
                <Lyroheader
                    title='Suggestions'
                    text='Complete suggested questions to help Lyro deal with similar questions in the future. Suggestions are based on questions your customers are likely ask and ones that Lyro could not answer because of lack of knowledge.'
                    Fhref='/data-sources/added'
                    FIcon={<MdAdd />}
                    buttonText='Test Lyro'
                    Shref=''
                    Sclass='add_new_deta'
                    SIcon={<MdAdd />}
                    buttonSText='Activate'
                />
            </div>
            <div className='mn-box-select'>
                <div className='inr_dat_box'>
                    <h2>No unanswered questions</h2>
                    <p>
                        Here you'll find questions from the last 30 days that Lyro doesn't know the answer to. You will be able to add responses. Remember to check back later for new updates.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default suggestions