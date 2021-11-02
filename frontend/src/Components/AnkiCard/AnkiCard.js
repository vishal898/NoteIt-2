
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import  './AnkiCard.css'; 
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

// let data={number:1,title:'# How operating system works',diff:'easy',body:"jjkkjjkkj\n# head1\njkjjjk hhjhhjhj hhhhjh\n## head2klkk jjjkjk\njjkjkjkjkjkjkjkjk\njkjkjkjkjkjkjkjk\njjkjkjkjk hjhjhjhjhj hhjhjhjhj\n### head3\njkkjjkjkjkjk"};




function ChildModal(props) {
  const data=props.note
  const closeBoth=props.closeBoth;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
 


  

  return (
    <React.Fragment>
      <Button onClick={handleOpen} className="button2" >Complete Note</Button>
      <Modal
        
        open={open}
       
      
      >
        <Box sx={{ ...style, width:"70%" }}>


          <h2  className="childheading1">Your Note</h2>
          <h2 className="childtitle">{data.title}</h2>
          
          
     
          <div>
          <SimpleMDE
             
            value={data.body}
            
           options={{
            

            autofocus: false,
            spellChecker: false,
         
         // initialValue:{value},
         
          hideIcons: ['bold','italic','quote','heading','unordered-list','ordered-list','link','image','horizontal-rule','preview','side-by-side','guide','fullscreen']
 
          }}
          

        />; 
        
      
          





        </div>


    <div >
        {/* <button className="buttonql" onClick={()=>{closeBoth ;  handleAnkiChange(1);} >Very Easy</button>
        <button className="buttonq" onClick={()=>{closeBoth ;  handleAnkiChange(2);} >Easy</button>
        <button className="buttonq" onClick={()=>{closeBoth ;  handleAnkiChange(3);} >Medium</button>
        <button className="buttonq" onClick={()=>{closeBoth ;  handleAnkiChange(4);} >Hard</button>
        <button className="buttonqr" onClick={()=>{closeBoth ;  handleAnkiChange(5);} >Very Hard</button> */}
    </div>

          





          
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const AnkiCard = (props) => {

  const data=props.note
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseP = () => {
    setOpen(false);
  };





  function random(str) {

    let ans="";
    let tmp="";
    let isHeading=0;
    let isPrevHash=0;
    let backCnt=0;
    if(str.length==0)
      return "";

    if(str[0]=='#')
      isPrevHash=1;

    for(let i=1;i<str.length;i++)
    {
      if(isHeading==0)
      {
        if(str[i]=='#')
          isPrevHash=1;
        else if(str[i]==' ')
        {
          if(isPrevHash==1)
          {
            isPrevHash=0;
            isHeading=1;
          }
        }
        else
          isPrevHash=0;
      }
      else
      {
          let z='\n'
          if(str[i]==z)
          {
            
            for(var j=0;j<backCnt;j++)
                ans=ans+'\\';
            ans=ans+',';
            isHeading=0;
              
              backCnt=0;
              isPrevHash=0;
          }
          else if(str[i]!=='\\' && str[i]!=='n')
          { 
              for(var j=0;j<backCnt;j++)
                ans=ans+'\\';
              ans=ans+str[i];
              backCnt=0;
          }
          else if(str[i]==='\\')
          {
            backCnt++;
          }
          else{
            if(backCnt%2===1)
            { 
              for(var j=0;j<backCnt-1;j++)
              ans=ans+'\\';
              isHeading=0;
              
              backCnt=0;
              isPrevHash=0;
              ans=ans+','

            }
            else
            {
              for(var j=0;j<backCnt-1;j++)
              ans=ans+'\\';
              ans=ans+'n';
              backCnt=0;
            }
          }
      }
    }
    
    return ans;
  }







  return (
    <>
    
    <div>
      <Button onClick={handleOpen}>{data.title}</Button>
      <Modal
        open={open}
        
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        

        <Box sx={{ ...style, width: 400 }}>
          
        <h2  className="remind">Try to remind your note ....</h2>
        <h2  className="headingmain" >Title of your note</h2>
        <h2  className="heading">{data.title}</h2>
        <h2  className="heading" >{random(data.body)}</h2>



          <ChildModal className="childmain1" closeBoth = {handleCloseP} note={data}/>
        </Box>
      </Modal>
    </div>
   
  </>
);
  }
export default AnkiCard;