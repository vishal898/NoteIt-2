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



export default function Notecard(props) {
  const note = props.note;
  console.log(note);
  // if(note !== undefined)setLoading(false); 
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let username="I am the initial value. Erase me, or try the button above.\nsweety\nbnbnmbn\n> sjjhnjnxjksxnasjkxjksbxxjkb\n> jlnnjknk\n# jkjkljkljkljkljkl\n### jkljkljkljkljk\n\n\n\nnlknklnknk\nkljlkjk\n";
  const [isLoading, setLoading] = useState(true);
 useEffect(async () => {
 setLoading(false);
  }, []);
 if (isLoading) return "Loading...";
  else {
  return (
    <React.Fragment>
    <div>
      <Button onClick={handleOpen}>{note.title}</Button>
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
     
     <button  style={{justifyContent:'right'}} className="buttonq" onClick={handleClose}>Close</button>
     
     </div>
     <br />
      
       <SimpleMDE
     //   onChange={this.handleChange}
     //   value={this.state.textValue}

     value={`${note.body}\n ${note.title}\n ${note.difficulty}`}
         options={{
          
         autofocus: true,
         spellChecker: false,
         autosave: {
             enabled: true,
             delay: 1000,
             uniqueId: 'note'
         },
         
         showIcons: ['strikethrough', 'heading', 'code', 'table', 'horizontal-rule']

      }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tags className="item buttonq"/>
      <br />
     <Difficulty className="item"/>
     <br />
        <Button  className="item buttonq"  >Save</Button>
     </div>
     
    



      
      
      
     </Box>
     
    
   </Modal>
 </div>
 </React.Fragment>
  );
}
}