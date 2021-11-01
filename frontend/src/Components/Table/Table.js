import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
  
  const notes = props.notes;
  // console.log(notes[0].difficulty);
  return (
    <>
    {
      notes
      ?<TableContainer component={Paper}>
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
              <StyledTableCell align="right" >{note.title}</StyledTableCell>
              <StyledTableCell align="right">{note.difficulty}</StyledTableCell>
              <StyledTableCell align="right">  </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      :
      <div>HELLO</div>
    }
    </>
  );
}