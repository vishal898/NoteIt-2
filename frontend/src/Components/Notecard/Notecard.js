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

import { TextField } from '@mui/material';
import { sizeWidth } from '@mui/system';



export default function Notecard(props) {

  const note = props.note;
  // console.log(note.tags); 
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  // const [note, setNote] = useState(props.note);


  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(async () => {
    setLoading(false);
  
  }, []);

  const handleRemoveBtnClick = () => {
    console.log('clicked');
  }

  const handleSaveChange = (NID)=>{
    // console.log(NID);
    console.log(note);
    ( async()=>{
      const updatedNote = await axios.post('http://localhost:5000/updateNote/',note,{
          withCredentials:true,
      });  
      
    })();
    setOpen(false);
  }
   
 if (isLoading) return "Loading...";
  else {
  return (
    <React.Fragment>
    <div>
      <Button onClick={handleOpen}>{note.title}</Button>
      <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">  
        <Box className="container"> 
          <div className="Save">
            <div className="title" id="titleid" >
              <TextField id="titlefield" freesolo defaultValue ={note.title}   onChange={(event)=>{note.title = event.target.value;}} placeholder="Title Here"></TextField>
            </div>
          </div>
          <br />
            <div >
          <SimpleMDE 
           className="CodeMi"
            value={" \n #### I am the initial value. "}
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
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Tags tagsList = {note.tags} className="item buttonq"/>
            <Difficulty onChange = {(value)=>{ console.log(note.difficulty); note.difficulty = value; console.log(note.difficulty); }} dif={note.difficulty} className="item"/>
            <Button  className="item buttonq" onClick={()=> handleSaveChange(note._id)} >Save</Button>
          </div>     
        </Box>
      </Modal>
    </div>
 </React.Fragment>
  );
}
}