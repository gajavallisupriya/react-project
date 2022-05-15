import React from "react";
import Chatbot from "react-chatbot-kit";
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';
import 'react-chatbot-kit/build/main.css';
import './chat.css';

function ChatBot() {
  return (
    <div className="chat">
      <Chatbot config={config} actionProvider={ActionProvider} 	    messageParser={MessageParser} />
    </div>
  );
}

export default ChatBot;