import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import axios from "axios";

const tagList=["Cn","os"];

export default function Tags() {

 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tags,setTags]=React.useState(tagList)
 // console.log(tags);
  console.log("after")
  const [isLoading, setLoading] = useState(true);
  const [user, setUser]=useState()
  useEffect(async () => {
    const profile = await axios.get("http://localhost:5000/profile", 
      {withCredentials:true});
    setUser(profile.data);
   // setTags(profile.data.tags);
    console.log(profile.data.tags)
    setLoading(false);
  }, []);

  console.log(tags);
  

  if (isLoading) return "Loading...";
  else {
  return (
    <div>
      <Button onClick={handleOpen}>Tags</Button>
      <Modal
        open={open}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="container">

    <Stack spacing={3} sx={{ width: 500 }}>

      <Autocomplete
        multiple
        id="tags-filled"
        options={tagList.map((option) => option)}
       
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tag List"
            placeholder="Add tags"
          />
        )}
      />
    </Stack>
    <Button onClick={handleClose}>Close</Button>
    </Box>
    </Modal>
    </div>
  );
}

}


