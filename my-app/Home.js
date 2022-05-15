import logos from './logo.png';
import './Home.css';
import Fquestions from './Fquestions';
import Form from './Form'
import ChatBot from './chat';
import { Box } from '@mui/system';
import {useEffect, useState} from 'react';
import LiveDemoUpdates from './LiveDemoUpdates';
import ChatComponent from './ChatComponents';
function Home() {
  const [auth, setAuth] = useState("false");

useEffect(() => {
  sessionStorage.setItem('auth', "false");
}, [auth]);
  return (
    <div>
    <div className="one">
      <h1>VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY</h1>
      <img src={logos}></img>
      <Form/>
    </div>
    <div>
      <LiveDemoUpdates/>
      <p className='label'>Frequently asked questions</p>
      <Fquestions/>
    </div>
    <ChatComponent/>
    </div>
  );
}

export default Home;
