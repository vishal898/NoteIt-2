// import ReactDOMServer from "react-dom/server";
// import { useMemo } from "react";
// import ReactMarkdown from "";
// import SimpleMDE from "react-simplemde-editor";
// import {SimpleMdeReact} from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export const CustomPreview = () => {
//   const customRendererOptions = useMemo(() => {
//     return {
//       previewRender() {
//         return ReactDOMServer.renderToString(
//           <ReactMarkdown
//             source={note.body}
            
//           />
//         );
//       },
//     } ;
//   }, []);

//   return (
//     <div>
//       <h4>Custom preview</h4>
//       <SimpleMdeReact options={customRendererOptions} />
//     </div>
//   );
// };