import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Notecard from '../Notecard/Notecard';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables(props) {
  
  const notes = props.notes ;
  // const [notes, setnotes] = useState(props.notes);
  // const [isLoading, setLoading] = useState(true);
  // if(notes!== undefined )setLoading(false);

  const handleDeleteChange = (noteId)=>{
    console.log(noteId);
    ( async()=>{
        const delData = await axios.post(`http://localhost:5000/deleteNote/${noteId}`,{
          withCredentials:true,
        });
        console.log(delData);
        const notes = await axios.get('http://localhost:5000/getAllNotes',{
            withCredentials:true,
        });
        const nd = await notes.data;
        console.log(nd);
        props.onChange(nd);   
    })();
  };

  const handleModal = (note)=>{
    //console.log(note);

  };
  
  // console.log(notes[0].difficulty);

  // if (isLoading) return "Loading...";
  // else {
  return (
    <>
    {
      notes
      ?
      <>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >Number</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Difficulty</StyledTableCell>
            <StyledTableCell align="right"> Delete </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note,ind) => (
            // console.log(note);
            <StyledTableRow key={note._id}>
              <StyledTableCell component="th" scope="note"> {ind+1} </StyledTableCell>
              <StyledTableCell align="right"  ><Button
                      onClick={ ()=>{
                        handleModal(note);
                        console.log(note);
                        
                      }}
                      color="primary"
                    > 
                    {<Notecard  note = {note} /> }
                    {/* {note.title} */}
                    </Button>   
              </StyledTableCell>
              <StyledTableCell align="right">{note.difficulty}</StyledTableCell>
              <StyledTableCell align="right"> <Button
                      onClick={ ()=>{
                        handleDeleteChange(note._id);
                      }}
                      color="secondary"
                    >DELETE</Button>   
                    </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </>

      :
      <div>isLoading</div>
    }
    </>
  );}
// }