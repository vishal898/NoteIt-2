// import ReactDOMServer from "react-dom/server";
// import { useMemo } from "react";
// import ReactMarkdown from 'react-markdown'
// import SimpleMDE from "react-simplemde-editor";
// import {SimpleMdeReact} from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import React from 'react'

// import ReactDom from 'react-dom'


// const Render= () => {

//     //const notes = props.notes ;
//     const [note, setnotes] = useState("### weetty  \n* 222 \n*hjhj");
//     // const [isLoading, setLoading] = useState(true);
//     // if(notes!== undefined )setLoading(false);
  
  
//     //   ( async()=>{
          
//     //      const notes = await axios.get('http://localhost:5000/getAllNotes',{
//     //           withCredentials:true,
//     //       });
//     //       setnotes(notes.data)
//     //       console.log
         
//     //   })();
    
//   const customRendererOptions = useMemo(() => {
//     return {
//       previewRender() {
//         return ReactDOMServer.renderToString(
//           <ReactMarkdown
//             source={note}
            
//           />
//         );
//       },
//     } ;
//   }, []);

//   return (
//     <div>
//       <h4>Custom preview</h4>
//       <SimpleMdeReact options={customRendererOptions} />
//       ReactDom.render(<ReactMarkdown># Hello, *world* ```sweety``` ###swehejgbjhvhj!</ReactMarkdown>, document.body)
//     </div>
//   );
// };
// export default Render;