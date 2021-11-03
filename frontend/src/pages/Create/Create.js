import Navbar from '../../Components/Navbar/Navbar';
import Tags from '../../Components/Tags/Tags';
import Difficulty from '../../Components/Difficulty/Difficulty';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './Create.css';
// import {Button} from '@react-spectrum/button';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "easymde/dist/easymde.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from '@mui/material';
//import { sizeWidth } from '@mui/system';




const Create = () => {
 
  const [isLoading, setLoading] = useState(true);
  const [note, setNote]=useState()
  useEffect(async () => {
    const notes = await axios.get("http://localhost:5000/getAllNotes", 
      {withCredentials:true});
    setNote(notes.data);
    setLoading(false);
  }, []);
  console.log(note)

  const handleRemoveBtnClick = () => {
    console.log('clicked');
  }

  const handleSaveChange = (NID)=>{
    // console.log(NID);
    console.log(note);
    ( async()=>{
      const updatedNote = await axios.post('http://localhost:5000/createNote',note,{
          withCredentials:true,
      });  
      
    })();
  
  }
   
 if (isLoading) return "Loading...";
  else {
  return (
    <>
    <Navbar/>
   <div className="central">
        <Box className="container"> 
          <div className="Save">
            <div className="title" id="titleid" >
              <TextField id="titlefield" freesolo defaultValue ={note.title}   onChange={(event)=>{note.title = event.target.value;}} placeholder="Title Here"></TextField>
          </div>
          </div>
          <br />
            
          <SimpleMDE
            value={note.body }
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
            {/* <Tags tagsList = {note.tags} className="item buttonq"/> */}
            <Difficulty onChange = {(value)=>{ console.log(note.difficulty); note.difficulty = value; console.log(note.difficulty); }} dif={note.difficulty} className="item"/>
            <Button  className="item buttonq" onClick={()=> handleSaveChange(note._id)} >Save</Button>
          </div>     
        </Box>  
  </div>
</>
);
}
}            
export default Create;
