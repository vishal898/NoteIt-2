
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import  './AnkiCard.css'; 
import SimpleMDE from "react-simplemde-editor";
import SimpleMdeReact from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

import axios from 'axios';
import { flexbox } from '@mui/system';

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


function ChildModal(props) {
  const data=props.note
  const closeBoth=props.closeBoth;
  let str = "";
  str = data.body;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [disabled, setDisabled] = useState("none");
 
  const handleAnkiChange = (nid,quality)=>{
    console.log(nid);
    console.log(quality);
    ( async()=>{
      const updateAnki = await axios.post(`http://localhost:5000/ankiUpdate/${nid}/${quality}`,{
          withCredentials:true,
      });  
      console.log(updateAnki);
    })();
    
    closeBoth() ;
  }

  const getInstance = (instance) => {
    if(instance!== null)instance.togglePreview();
    console.log(instance.value);
  };

  function parseMarkdown(markdownText) {
    const htmlText = markdownText
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />')
    
    console.log(htmlText.trim());
  }

  const [value, setValue] = useState("**sdfsf**\n*sdfsdf*\n\n### sdff\n\n* sdf\n* sfs\n\n1. sdf\n2. fsd\n\n# sdfsdf");
  console.log(value);
  console.log(typeof(value));
  console.log(data.body);
  console.log(typeof(data.body));
  const ss = `${data.body}`;
  console.log(ss);
  console.log(typeof(ss));

  const onChange = (value) => {
    
    setValue(value);
  };
  parseMarkdown(data.body);

  return (
    <React.Fragment>
      <div className="complete">
      <Button onClick={handleOpen} className="buttonq" sx={{ color:"white",padding:" 0 12px",borderRadius:"32px",fontWeight:"bold"}} >Open Note</Button>
      </div>
      <Modal
        
        open={open}
       
      
      >
        <Box sx={{ ...style, width:"70%" }}>


         
          <h2 className="headingTitle">{data.title}</h2>
          
          
     
          <div className={disabled} >
          <div className="CoM">
          <SimpleMdeReact
            value={`${data.body}`} 
            onChange={onChange}
            // value={value}
            getMdeInstance= { getInstance } 
           options={{
            

            autofocus: false,
            spellChecker: false,
         
         // initialValue:{value},
         
          hideIcons: ['bold','italic','quote','heading','unordered-list','ordered-list','link','image','horizontal-rule','preview','side-by-side','guide','fullscreen']
 
          }}
         

        />
         </div>
        </div>


    <div className="bottoma">
        <button className="buttonq" onClick={()=>{  handleAnkiChange(data._id,1);}} >Very Easy</button>
        <button className="buttonq" onClick={()=>{ handleAnkiChange(data._id,2);}} >Easy</button>
        <button className="buttonq" onClick={()=>{  handleAnkiChange(data._id,3);}} >Medium</button>
        <button className="buttonq" onClick={()=>{ handleAnkiChange(data._id,4);}} >Hard</button>
        <button className="buttonq" onClick={()=>{ handleAnkiChange(data._id,5);}} >Very Hard</button>
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
    // var node = document.createElement("LI");                 
    const temp=ans.split(",");
    console.log(temp);
    // ans=ans.split(",").join("\n")
    // for(var k=0;k<temp.length;k++)
    // {
    //   var textnode = document.createTextNode(temp[k]);
    //   node.appendChild(textnode); 
    //   document.getElementById("myList").appendChild(node);  
    // }
    return (
    	<ul>
      {temp.map(a => <li>{a}</li>)}
      	</ul>
    )
    
    
    //return ans;
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
        

        <Box sx={{ ...style, width: 700,maxHeight:"800"}}>
          
        <h2  className="remind">Try to recall your note ....</h2>
       
        <h2  className="heading">{data.title}</h2>
        <br />
       
        <div id="myList" className="heading2" >{random(data.body)}</div>
        



          <ChildModal className="childmain1" closeBoth = {handleCloseP} note={data}/>
        </Box>
      </Modal>
    </div>
   
  </>
);
  }
export default AnkiCard;