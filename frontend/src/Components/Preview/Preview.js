import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./Preview.css"
import { useEffect, useState } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);




function Preview(props) {
const note=props.note;
console.log(note)  ;  
const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };  

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const[loading,isLoading]=React.useState(true)
    

    const maxSteps = note.length;
  
  
    const handleNext = () => {
      console.log('next clicked');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // const handleRead=()=>{
    //     SimpleMdeReact.setDisabled(true);
    // }

    const [simpleMdeInstance, setMdeInstance] = useState();

    // const getMdeInstanceCallback = (simpleMde) => {
    //   setMdeInstance(simpleMde);
    //   // console.log(simpleMde);
    // };

    // useEffect(() => {
    //   console.log(activeStep);
    //   // simpleMdeInstance && simpleMdeInstance.togglePreview();
    //   // simpleMdeInstance &&
    //   //   console.info("Hey I'm editor instance!", simpleMdeInstance);
    // }, [activeStep]);

    const getInstance = (instance) => {
      // You can now store and manipulate the simplemde instance.
      // setMdeInstance(instance);
      // console.log(instance.options.disabled);
      // if(instance !== undefined)
      instance.togglePreview();
    };
  
    return (
        <div>
        <button className="buttonq1" onClick={handleOpen}>Preview</button>
        <Modal
          open={open}
         
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >  
        
      {/* <Box sx={{ maxWidth: 400, flexGrow: 1 }}> */}
      <Box className="container">
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Typography>{note[activeStep].title}</Typography>
          <Button  style={{justifyContent:'right'}} onClick={handleClose}>Close</Button>
        </Paper>
        <SimpleMDE 
            //   onChange={this.handleChange}
            //   value={this.state.textValue}
            getMdeInstance= { getInstance } 
            value={note[activeStep].body}
            
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
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
      </Modal>
      </div>
    );
}

export default Preview;