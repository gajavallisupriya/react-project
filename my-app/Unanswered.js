import * as React from 'react';
import './Unanswered.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import DialogContentText from '@mui/material/DialogContentText';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import logos from './logo.png';
export default function Unanswered(){
  const history = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [question,setQuestion] =React.useState("");
    const [list, setList] = useState([]);
    useEffect(()=>{
      const auth = sessionStorage.getItem('auth')
      if(auth=='true'){
      axios.get(`http://localhost:8080/questions`)
      .then(response => {
          setList(response.data["questions"]);
      })
      .catch(error => {
          console.log('There was an error!', error);      
      });
    }
    else{
      history('/');
    }
        
      },[])
    const handleClickOpen = (e) => {
      setOpen(true);
      setQuestion(e.target.innerText);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClick = () => {
      sessionStorage.setItem("auth","false");
      window.location.reload(true);
      
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let question = data.get("question")
        let answer = data.get("answer");
        let emailid = sessionStorage.getItem("email");
        if(answer.length>0){
        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({question: question,answer:answer,email:emailid})
        }
        fetch('http://localhost:8080/putquestion',requestOptions)
        .then(response => response.json())
        .then(data => setList(data.questions));
      }
        setOpen(false);
      };
    return(
        <div>
    <div className="one">
      <h1>VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY</h1>
      <img src={logos}></img>
      <div id="logout">
          <Button  className='login' color="secondary" onClick={handleClick}>
        Logout
      </Button>
      </div>
          </div>
          <p>Questions to Answer</p>
        <List sx={{ margin:'5%' , width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
       {list.map((que) => {
                return(
                    <ListItem alignItems="flex-start" divider="True" button="True" onClick={handleClickOpen} >
        <ListItemText
          primary= {que}
        />
      </ListItem>
                )
            })}
    </List>
    <Dialog maxWidth='sm' open={open} onClose={handleClose} >
        <DialogTitle>post the answer</DialogTitle>
        <DialogContent>
        <DialogContentText>
            {question}
          </DialogContentText>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input type="text" name="question" id="question" value= {question} />
          <br/><br/>
          <TextField id="answer" name= "answer" aria-label="minimum height" minRows={5} required placeholder="please answer this question" style={{ width: 500 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>  
    </div>
    
    );
}