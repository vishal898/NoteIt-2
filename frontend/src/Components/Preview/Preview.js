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

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const images = [
    {
      label: "Random Name #1",
      description: "1 - Probably the most random thing you have ever seen!"
    },
    {
      label: "Random Name #2",
      description: "2- Hello World!"
    },
    {
      label: "Random Name #3",
      description: "3 - Hello World!"
    }
  ];

function Preview(props) {
const note=props.note;
console.log(note)  
const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };  

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    // const handleRead=()=>{
    //     SimpleMdeReact.setDisabled(true);
    // }
  
    return (
        <div>
        <Button onClick={handleOpen}>Preview</Button>
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
          <Typography>{images[activeStep].label}</Typography>
          <Button  style={{justifyContent:'right'}} onClick={handleClose}>Close</Button>
        </Paper>
        <SimpleMDE 
            //   onChange={this.handleChange}
            //   value={this.state.textValue}
       
            value={images[activeStep].description}
                options={{
                 
                autofocus: true,
                spellChecker: false,
                autosave: {
                    enabled: true,
                    delay: 1000,
                    uniqueId: 'note'
                },
                disabled:true,
                
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

 