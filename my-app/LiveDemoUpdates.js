import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { useEffect } from 'react';
import axios from 'axios';

export default function LiveDemoUpdates(props)
{
    const [List,setList] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:8080/updates`)
        .then(response => {
            setList(response.data["updates"]);
        })
        .catch(error => {
            console.log('There was an error!', error);      
        });
          
        },[])

    return (
        <Carousel 
        indicatorContainerProps={{
            style: {
                marginTop: '10px', // 5
            }
    
        }}>
            {
                List.map( (item) => <Item item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper elevation={3} sx={{backgroundColor : "white",display : "inline-block",width : "500px",height:"100px",marginLeft:"33%"}}>
            <p>{props.item}</p>
        </Paper>
    )
}