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
export default function UnansweredAdmin(){
  const history = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openbox, setBoxOpen] = React.useState(false);
    const [staffopenbox, setStaffBoxOpen] = React.useState(false);
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
    const handleClickOpen1 = (e) => {
      setBoxOpen(true);
    };
    const handleClickOpen3 = (e) => {
      setStaffBoxOpen(true);
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
    const handleClose3 = () => {
      setStaffBoxOpen(false);
    };
    const handleClick = () => {
      sessionStorage.setItem("auth","false");
      window.location.reload(true);
      
    };
    const handleDelete = (question) => {
        const requestOptions = {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(question)
          }
          fetch('http://localhost:8080/delquestion',requestOptions)
          .then(response => response.json())
          .then(data => setList(data.questions));
        
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
        fetch('http://localhost:8080/putquestion',requestOptions)
        .then(response => response.json())
        .then(data => setList(data.questions));
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
        fetch('http://localhost:8080/putquestionquery',requestOptions)
        .then(response => response.json())
        .then(data => setList(data.questions));
      }
        setBoxOpen(false);
      };
      const handleSubmit3 = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let name = data.get("name")
        let email = data.get("email")
        let password = data.get("password")
        if(name.length>0 && email.length>0 && password.length>0){
        const requestOptions = {
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({name: name,email:email,password:password})
        }
        fetch('http://localhost:8080/putstaff',requestOptions)
        .then(response => response.json())
        .then(data =>{
          console.log(data);
          if(data.status=="yes"){
            alert("staff added sucessfully");
          }
          else{
            alert("staff mail id already existed cannot create staff");
          }
        }
        );
      }
        setStaffBoxOpen(false);
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
      <p id="head">Questions to Answer</p>
      <div id="add">
          <Button  className='login' color="secondary" onClick={handleClickOpen1}>
        Add Question
      </Button>
      </div>
      <div id="updates">
          <Button  className='login' color="secondary" onClick={handleClickOpen2}>
        New Updates
      </Button>
      </div>
      <div id="staff">
          <Button  className='login' color="secondary" onClick={handleClickOpen3}>
        Add Staff
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
      <Dialog maxWidth='sm' open={openbox} onClose={handleClose1} >
        <DialogTitle>post the question</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Enter your question
          </DialogContentText>
        <Box component="form" onSubmit={handleSubmit1} noValidate sx={{ mt: 1 }}>
          <TextField id="answer" name= "question" aria-label="minimum height" minRows={5} required placeholder="please answer this question" style={{ width: 500 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>
      <Dialog maxWidth='sm' open={staffopenbox} onClose={handleClose3} >
        <DialogTitle>Enter Staff Detials</DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={handleSubmit3} noValidate sx={{ mt: 1 }}>
        <DialogContentText>
            Name
          </DialogContentText>
          <TextField id="answer" name= "name" aria-label="minimum height" required style={{ width: 350 }} />
          <br/><br/>
          <DialogContentText>
            email Id
          </DialogContentText>
          <TextField id="answer" name= "email" aria-label="minimum height" type="email" required placeholder="example@gmail.com" style={{ width: 350 }} />
          <br/><br/>
          <DialogContentText>
            Password
          </DialogContentText>
          <TextField id="answer" name= "password" aria-label="minimum height" type="password" required  style={{ width: 350 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>  
    </div>
    
    );
}