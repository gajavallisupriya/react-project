import Accordion from '@mui/material/Accordion';
import React from 'react'; 
import AccordianDetails  from '@mui/material/AccordionDetails';
import  AccordionSummary from '@mui/material/AccordionSummary';
import  Typography  from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import './Fquestions.css';
import {useEffect, useState} from 'react';
export default function Fquestions() {
    const [expanded, setExpanded] = React.useState(false);
    const [faqs,setFaqs] = React.useState([]);
    const handleChange = (panel) => (event,isExpanded) =>{
        setExpanded(isExpanded ? panel : false);
    };
    useEffect(()=>{
        axios.get(`http://localhost:8080/faqs`)
        .then(response => {
            setFaqs(response.data["questions"]);
            console.log(response.data["questions"]);
        })
        .catch(error => {
            console.log('There was an error!', error);      
        });
          
        },[])
    return (
     <div className="accordian">
        {faqs.map((faq)=> {
            return(
                <Accordion expanded = {expanded === faq.index} onChange={handleChange(faq.index)}>
             <AccordionSummary
               expandIcon = {<ExpandMoreIcon/>}
               aria-controls="panel1bh-content"
               id="panel1bh-header">
                   <Typography sx={{ width: '33%', flexShrink: 0}}>
                       {faq.question}
                   </Typography>
               </AccordionSummary>
               <AccordianDetails>
                   <Typography>
                       {faq.answer}
                   </Typography>
               </AccordianDetails>
         </Accordion>
            );
        })} 
     </div>
    );
}