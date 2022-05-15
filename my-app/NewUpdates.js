import * as React from 'react';
import './UnansweredAdmin.css';
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useEffect, useState} from 'react';
import logos from './logo.png';
export default function NewUpdates(){
  const history = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openbox, setBoxOpen] = React.useState(false);
    const [question,setQuestion] =React.useState("");
    const [questione,setQuestione] =React.useState("");
    const [list, setList] = useState([]);
    useEffect(()=>{
      const auth = sessionStorage.getItem('auth')
      if(auth=='true'){
      axios.get(`http://localhost:8080/updates`)
      .then(response => {
          setList(response.data["updates"]);
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
      setQuestione(e.target.innerText);
    };
    const handleClickOpen1 = (e) => {
      setBoxOpen(true);
    };
    const handleClickOpen2 = (e) => {
      history('/admin/updates');
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleClose1 = () => {
      setBoxOpen(false);
    };
    const handleClick = () => {
      history('/admin')
      
    };
    const handleDelete = (question) => {
        const requestOptions = {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(question)
          }
          fetch('http://localhost:8080/delupdate',requestOptions)
          .then(response => response.json())
          .then(data => setList(data.updates));
        
      };
      const handleChange = (event) => {
        setQuestion(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let question = data.get("question")
        let answer = data.get("answer");
        if(answer.length>0){
        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({question: question,answer:answer})
        }
        fetch('http://localhost:8080/putupdate',requestOptions)
        .then(response => response.json())
        .then(data => setList(data.updates));
      }
        setOpen(false);
      };
      const handleSubmit1 = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let question = data.get("question")
        if(question.length>0){
        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({question: question})
        }
        fetch('http://localhost:8080/putupdatequery',requestOptions)
        .then(response => response.json())
        .then(data => setList(data.updates));
      }
        setBoxOpen(false);
      };
    return(
        <div>
          <div className="one">
      <h1>VASIREDDY VENKATADRI INSTITUTE OF TECHNOLOGY</h1>
      <img src={logos}></img>
          <div id="logout">
          <Button  className='login' color="secondary" onClick={handleClick}>
        Back
      </Button>
      </div>
      </div>
      <p id="head">New Updates</p>
      <div id="add">
          <Button  className='login' color="secondary" onClick={handleClickOpen1}>
        Add new Update
      </Button>
      </div>
        <List sx={{ margin:'5%' , width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }} button="True" onClick={handleClickOpen} >
       {list.map((que) => {
                return(
                    <ListItem alignItems="flex-start" divider="True"  >
        <ListItemText
          primary= {que}
        />
        <IconButton aria-label="delete" size="large" color='primary' onClick={(e) => { e.stopPropagation();handleDelete({que});}} >
  <DeleteIcon />
</IconButton>
      </ListItem>
                )
            })}
    </List>
    <Dialog maxWidth='sm' open={open} onClose={handleClose} >
        <DialogTitle>post the answer</DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input type="text" name="question" id="question" value= {questione} />
          <br/><br/>
          <TextField id="answer" name= "answer" aria-label="minimum height" minRows={5} required value={question} onChange={handleChange} style={{ width: 500 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>
      <Dialog maxWidth='sm' open={openbox} onClose={handleClose1} >
        <DialogTitle>post the question</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Enter your message
          </DialogContentText>
        <Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 1 }}>
          <TextField id="answer" name= "question" aria-label="minimum height" minRows={5} required placeholder="message" style={{ width: 500 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>  
    </div>
    
    );
}