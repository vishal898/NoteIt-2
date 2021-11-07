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
import { useHistory } from 'react-router-dom';
//import { sizeWidth } from '@mui/system';





const Create = () => {
  const getvalueA=(e,val)=>{
    console.log(val);
    note.ankiOn=val;

  }
 
  const [isLoading, setLoading] = useState(true);
  const [note, setFilter] = useState({
    title:"",
    body:"",
    difficulty: "easy",
    tags:[],
    url:"none",
    createdTime:new Date(),
    ankiOn:false,
  });
  useEffect(async () => {
    
    setLoading(false);
  }, []);

  const handleRemoveBtnClick = () => {
    console.log('clicked');
  }

  const handleSaveChange = ()=>{
    // console.log(NID);
    console.log("***************************************");
    console.log(note);

    let x=note;

    //delete x._id;

    ( async()=>{
      const updatedNote = await axios.post('http://localhost:5000/createNote',note,{
          withCredentials:true,
      });  
      
    })();
    
   
    console.log("............");
    //console.log(x);
  }

  
  const onChange = (value) => {
    
    note.body=value;
  };

  let selectanki = 0;
  const ankiOnOff=()=>{
    
    

    selectanki++;
    selectanki = selectanki % 2;
    if (selectanki == 0) {
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


  function Appi() {
    let history = useHistory();
  
    const redirect = () => {
      handleSaveChange(note._id);
      history.push('/home')
    }
  
    return (
      <div>
        <button id="saveb" className=" buttonqs item" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px"}} onClick={redirect}>Save</button>
      </div>
    )
  }
  
  
      




 if (isLoading) return "Loading...";
  else {
  return (
    <>
    <Navbar/>
   <div className="central">
        <Box className="container"> 
          
            <TextField sx={{ width: "100%",height:"50px" }} id="titlefield" freesolo defaultValue ={note.title}    onChange={(event)=>{note.title = event.target.value; }} placeholder="Title Here"></TextField>
           
          <br />
          <div className="CodM"> 
          <SimpleMDE
               onChange={onChange}
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
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
            {/* <Tags tagsList = {note.tags} className="item buttonq"/> */}
            {/* <Difficulty onChange = {(value)=>{ console.log(note.difficulty); note.difficulty = value; console.log(note.difficulty); }} dif={note.difficulty} className="item"/>
            <Button  className="item buttonq" onClick={()=>{handleSaveChange()}} >Save</Button>
              

  
            <button id="b5" onClick={ankiOnOff}>On</button> */}
            <div className="bottom">
            <Box sx={{ width: "100%",height:"50px" }}>
            <Difficulty sx={{ color:"black",padding:" 0 12px",borderRadius:"32px"}}  onChange = {(value)=>{ console.log(note.difficulty); note.difficulty = value; console.log(note.difficulty); }} dif={note.difficulty} /></Box>
            <div><Button id="b5" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px",height:"30px",width:"50px",backgroundColor:"red"}} onClick={ankiOnOff}>Off</Button></div>
            <div className="item">
            <Tags  className="buttonqs item" tagsList = {note.tags} onChange={(value)=>{console.log(value);note.tags=value}}/>
            </div>
            <div className="item">
            
            <Appi/>
            </div>
         
 

 

          </div>      
        </Box>  
  </div>
</>
);
}
}            
export default Create;