import Navbar from '../../Components/Navbar/Navbar';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './Create.css';
// import {Button} from '@react-spectrum/button';
import {TextField} from '@react-spectrum/textfield';
const Create = () => {
  return (
    <>
    <Navbar/>
   <div className="central">
    <div className="container">
    <div className="save">
    <div className="title" id="titleid">
        <textarea id="titlefield" placeholder="Title Here"></textarea>
        </div>
        <button >Save</button>
        </div>  
        <SimpleMDE
  
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
        
      
      
    </div>
    </div>
    </>
  )
}
export default Create;