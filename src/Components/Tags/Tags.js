import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Tags.css";
import { useEffect, useState } from "react";
import axios from "axios";
let tagsList;

export default function Tags(props) {

  let oldtags=props.tagsList;
  const [open, setOpen] = React.useState(false);
 
 
  const handleOpen = () => { 
    setOpen(true);
    console.log(props.tagsList);
  }
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };
  

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
  
    if (key === "Enter" && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags(prevState => [...prevState, trimmedInput]);
      setInput('');
    }
  
    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }
  
    setIsKeyReleased(false);
  };
  
  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  

  const [input, setInput] = useState('');
  const [tags, setTags] = useState(props.tagsList);
  const [isLoading, setLoading] = useState(true);
  


  const handleClose = () =>{ 
      setOpen(false);
      tagsList=tags;
      props.onChange(tagsList);
  }

  
  useEffect(async () => {
    const profile = await axios.get("/", 
      {withCredentials:true});
    
    //setTags(profile.data.tags);
    
    
    
    setLoading(false);



  }, []);

  
  const handleTagDelete = ()=>{
    console.log('deleted chip');
  }

  const deleteTag = (index) => {
    setTags(prevState => prevState.filter((tag, i) => i !== index))
  }



  if (isLoading) return "Loading...";
  else {
  return (
    <div>
      <Button  className=" buttonqs" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px",height:"30px"}} onClick={handleOpen}>Tags</Button>
      <Modal
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box className="container">

      <div className="container">
      {tags.map((tag, index) => (
      <div className="tag" >
        {tag}
        <button sx={{float:"right"}} onClick={() => deleteTag(index)}>x</button>
      </div>
      ))}
          <input
          
          value={input}
          placeholder="Enter a tag"
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}



          />
          </div>



          <Button  className=" buttonqs" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px",margin:"5px",height:"30px"}} onClick={handleClose}>Close</Button>
    </Box>
    </Modal>
    </div>
  );
}

}