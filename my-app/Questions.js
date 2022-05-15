import * as React from 'react';
import './Unanswered.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';

export default function Unanswered(){
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let question = data.get("question")
        let answer = data.get("answer");
        alert(question);
        alert(answer);
        setOpen(false);
      };
    return(
        <div>
        <List sx={{ margin:'5%' , width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>

    </List>
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>post the answer</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <input type="text" name="question" id="question" value= {question} />
          <br/><br/>
          <TextareaAutosize id="answer" name= "answer" aria-label="minimum height" required="true" minRows={5} placeholder="please answer this question" style={{ width: 500 }} />
        <br/><br/>
          <Button variant="contained" className="submit" type='submit'>Submit</Button>
          </Box>
        </DialogContent>

      </Dialog>  
    </div>
    
    );
}