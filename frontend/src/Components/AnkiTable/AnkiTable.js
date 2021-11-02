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
<<<<<<< HEAD
import Preview from '../Preview/Preview';

import Notecard from '../Ankicard/Ankicard';
=======
import Notecard from '../Notecard/Notecard';

import AnkiCard from '../AnkiCard/AnkiCard';
>>>>>>> 2d246a9a3d065fa0ca163dfb9d33e6b0b2274360
import "./AnkiTable.css"


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
  
    color: theme.palette.common.white,
    fontSize: 16
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
        <TableHead className="headtq">
          <TableRow>
            <StyledTableCell style={{width: 15}}>Number</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
            <StyledTableCell align="center">Difficulty</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note,ind) => (
            // console.log(note);
            <StyledTableRow key={note._id}>
              <StyledTableCell component="th" scope="note" style={{width: 15}}> {ind+1} </StyledTableCell>
              <StyledTableCell align="center"  ><Button
                      onClick={ ()=>{
                        handleModal(note);
                        console.log(note);
                        
                      }}
                      color="primary"
                    > 
                    {<AnkiCard  note = {note} /> }
                   
                    </Button>   
              </StyledTableCell>
              <StyledTableCell align="center">{note.difficulty}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br /><br />
    
      </>

      :
      <div>isLoading</div>
     
    }
     
    </>
  );}
// }