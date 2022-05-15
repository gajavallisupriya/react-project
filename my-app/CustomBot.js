import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRobot } from '@fortawesome/fontawesome-free-solid';
import Fab from '@mui/material/Fab';
const CustomBot = () => {
    return (
        <Fab sx={ {
             backgroundColor:'#7b1fa2',
             color:'#FFFFFF'}} size="medium" color="secondary" aria-label="add">
                  <FontAwesomeIcon icon={faRobot} />
                 </Fab>
    );
  }
  
  export default CustomBot;