import React, { useState } from 'react'
import Chatbot from '../../LiveChat/ChatBot'
import '../../LiveChat/live-chat.css'
import './playground.css'

const UnPlayground = () => {

    return (
        <div className='main-data-sources'>
            <div className='hdr_st_so'>
                <div>
                    <h2>Play Ground</h2>
                </div>
            </div>
            <div className='un_play_ground playground mn-box-select'>
                <div className='inr_dat_box'>
                    <div className='chat_bot_playground'>
                        <img src="/bot.png" alt="bot" />
                    </div>
                    <div className='playground_context'>
                        <h3>Azister needs knowledge to answer customer questions</h3>
                        <p>To test or activate Azister, you must first provide it with knowledge.</p>
                        <a href="/data-sources">
                            <button type="button" class=" btn btn-new btn-size-l btn-primary undefined"><span>Add Knowledge to Azister</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnPlayground
