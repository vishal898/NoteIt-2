import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Tags from '../Tags/Tags';
import Difficulty from '../../Components/Difficulty/Difficulty';
import './Notecard.css';



export default function Notecard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setLoading] = useState(true);
  const [user, setUser]=useState()
  useEffect(async () => {
    const profile = await axios.get("http://localhost:5000/profile", 
      {withCredentials:true});
    setUser(profile.data);
    setLoading(false);
  }, []);
  let username="sweety";
  

  if (isLoading) return "Loading...";
  else {

  

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
       
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        
         <Box className="container">
       
    
       
       <div className="Save">
       <div className="title" id="titleid">
     <textarea id="titlefield" placeholder="Title Here"></textarea>
     </div>
     
     <Button  style={{justifyContent:'right'}} onClick={handleClose}>Close</Button>
     
     </div>
     <br />
      
       <SimpleMDE
     //   onChange={this.handleChange}
     //   value={this.state.textValue}

         options={{
          
         autofocus: true,
         spellChecker: false,
         autosave: {
             enabled: true,
             delay: 1000,
             uniqueId: 'note'
         },
         //initialValue:{username},
         showIcons: ['strikethrough', 'heading', 'code', 'table', 'horizontal-rule']

}}
/>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
       
     <Button   >Save</Button>
     </div>
     <Tags/>
     <Difficulty/>



      
      
      
     </Box>
     
    
   </Modal>
 </div>
  );
}
}

