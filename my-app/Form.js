import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './Form.css';

export default function Form() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let username = data.get("username");
    let password = data.get("password");
    const requestOptions = {
      method : 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({username:username,password:password})
    }
    fetch('http://localhost:8080/getstaff',requestOptions)
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      if(data.status=="yes"){
        sessionStorage.setItem('auth', "true");
        sessionStorage.setItem('email', username);
        history('/staff');
      }
      else if(username=='admin@123' && password=='1234')
      {
        sessionStorage.setItem('auth', "true");
        sessionStorage.setItem('email', "admin@123");
        history('/admin');
      }
      else{
        alert("please enter valid username and password");
      }
    }
    );
    setOpen(false);
  };

  return (
    <div className='button'>
      <Button  className='login' color="secondary" onClick={handleClickOpen}>
        staff/Admin 
        <br/>
        Login
      </Button>
      
      <Dialog maxWidth='sm' open={open} onClose={handleClose} >
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
         
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField autoFocus id="UserName" label="user name" required name='username'
            size='small' margin='dense'
          />
          <br/><br/>
        <TextField id="password" label="Password" type="password" required name='password'
          size="small" 
        />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>
      
    </div>
  );
}
