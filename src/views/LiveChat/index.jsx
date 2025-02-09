// pages/index.js
import Chatbot from './ChatBot';
import { useState } from 'react';
import './live-chat.css'
import { MdChat } from 'react-icons/md'; 
import Layout from '../../components/Layout/Layout';

export default function Home() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(true)
  }

  return (
   <Layout>
     <div id='chatbote' className='live_chat'>
        <h1>Welcome to Live Chat</h1>
        <button className='chatbotToggle' onClick={toggleChatbot}>
          <MdChat className='chatIcon' />
        </button>
        {chatbotOpen && (
          <div className='chatbotContainer'>
            <Chatbot />
          </div>
        )}
    </div>
   </Layout>
     
  );
}
