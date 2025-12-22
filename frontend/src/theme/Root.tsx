
import React from 'react';
import Chatbot from '../components/Chatbot/Chatbot';
import '../components/Chatbot/Chatbot.css';

// Default implementation, that you can customize
export default function Root({children}) {
  return (
    <>
      {children}
      <Chatbot />
    </>
  );
}
