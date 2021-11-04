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
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = useState(true);
  
 
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(async () => {  
    
    setLoading(false);
  }, []);
  const handleSaveChange = (NID)=>{
    console.log(note);
    ( async()=>{
      const updatedNote = await axios.post(`http://localhost:5000/updateNote/${NID}`,note,{
          withCredentials:true,
      });    
    })();
    setOpen(false);
  }

  const handleValuechange=(value)=>{
    note.body=value
  }
      const getInstance = (instance) => {
      // You can now store and manipulate the simplemde instance.
      // setMdeInstance(instance);
      // console.log(instance.options.disabled);
      // if(instance !== undefined)
    };
    let selectanki = 0;
    const ankiOnOff=()=>{
      
      
  
      selectanki++;
      selectanki = selectanki % 2;
      if (selectanki === 0) {
          document.getElementById("b5").style.backgroundColor = "Green";
          document.getElementById("b5").innerHTML = "On";
      } else {
          document.getElementById("b5").style.backgroundColor = "Red";
          document.getElementById("b5").innerHTML = "Off";
      }
  
      
      console.log(selectanki);
      if(selectanki===0)
        note.ankiOn=true;
      else
        note.ankiOn=false;
  
    }


 if (isLoading) return "Loading...";
  else {
  return (
    <React.Fragment>
    <div>
      <Button onClick={handleOpen}>{note.title}</Button>
      <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">  
        <Box className="container"> 
          
              <TextField sx={{ width: "100%",height:"50px" }} id="titlefield" freesolo defaultValue ={note.title}    onChange={(event)=>{note.title = event.target.value;}} placeholder="Title Here"></TextField>
           
          <br />
            <div className="CodeM">
          <SimpleMDE 
           
            value={note.body}
            onChange={handleValuechange}
            getMdeInstance= { getInstance } 
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
          <br/>

          <div className="bottom">
            <Box sx={{ width: "100%",height:"50px" }}>
            <Difficulty sx={{ color:"black",padding:" 0 12px",borderRadius:"32px"}} onChange = {(value)=>{ console.log(note.difficulty); note.difficulty = value; console.log(note.difficulty); }} dif={note.difficulty} /></Box>
            <div><Button id="b5" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px",height:"30px",width:"50px",backgroundColor:"red"}} onClick={ankiOnOff}>Off</Button></div>
            <div className="item">
            <Tags  className="buttonqs item" tagsList = {note.tags} />
            </div>
            <div className="item">
            <Button  className=" buttonqs item" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px"}} onClick={()=> handleSaveChange(note._id)} >Save</Button>
            </div>
          </div>     
        </Box>
      </Modal>
    </div>
 </React.Fragment>
  );
}
}