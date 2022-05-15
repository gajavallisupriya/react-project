import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRobot } from '@fortawesome/fontawesome-free-solid';
import Fab from '@mui/material/Fab';
import ChatBot from './chat';
const style = {
 margin: 0,
 top: 'auto',
 right: 20,
 bottom: 20,
 left: 'auto',
 position: 'fixed',
 backgroundColor:'#E65100',
 color:'#FFFFFF',
};

  class ChatComponent extends Component {
   constructor( props ){
    super( props )
    this.state = { show : false };

    this.toggleDiv = this.toggleDiv.bind(this)
   }

   toggleDiv = () => {
    const { show } = this.state;
    this.setState( { show : !show } )
  }
  render() {
    return (
    <div>
      <div>
       { this.state.show && <ChatBot /> }
      </div>
      <div class="font-icon-wrapper" onClick={this.toggleDiv}>
      <Fab sx={ {
margin: 0,
 top: 'auto',
 right: 20,
 bottom: 20,
 left: 'auto',
 position: 'fixed',
 backgroundColor:'#7b1fa2',
 color:'#FFFFFF'}} size="medium" color="secondary" aria-label="add">
      <FontAwesomeIcon icon={faRobot} />
     </Fab>
  </div>
     </div>
     );
   }
  }
  export default ChatComponent;