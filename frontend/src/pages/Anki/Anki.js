
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Navbar from '../../Components/Navbar/Navbar';
import styles from './Anki.module.css'; 
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

let data={number:1,title:'How operating system works',diff:'easy'};




function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} className={styles.button2} >Complete Note</Button>
      <Modal
        
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width:"70%" }}>


          <h2  className={styles.childheading1}>Your Note</h2>
          <h2 className={styles.childtitle}>{data.title}</h2>
          
          
     
          <div>
          <SimpleMDE
          //   onChange={this.handleChange}
            value={data.title}


           options={{
            
            autofocus: true,
            spellChecker: false,
         
         // initialValue:{value},
          showIcons: ['strikethrough', 'heading', 'code', 'table', 'horizontal-rule']

          }}
        />
        </div>


    <div >
        <button className={styles.buttonql}>Very Easy</button>
        <button className={styles.buttonq}>Easy</button>
        <button className={styles.buttonq}>Medium</button>
        <button className={styles.buttonq}>Hard</button>
        <button className={styles.buttonqr}>Very Hard</button>
    </div>

          





          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const Anki = () => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };




  return (
    <>
    <Navbar/>
    <section className="hero-section">
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        

        <Box sx={{ ...style, width: 400 }}>
          
        <h2  className={styles.remind}>Try to remind your note ....</h2>
        <h2  className={styles.headingmain}>Title of your note</h2>
        <h2  className={styles.heading}>{data.title}</h2>



          <ChildModal className={styles.childmain1}/>
        </Box>
      </Modal>
    </div>
    </section>
  </>
);
}
export default Anki;