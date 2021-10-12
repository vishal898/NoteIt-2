import Navbar from '../../Components/Navbar/Navbar';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './Create.css';
import {Button} from '@react-spectrum/button';
import {TextField} from '@react-spectrum/textfield';
const Create = () => {
  return (
    <>
    <Navbar/>
   <div className="central">
    <div className="container">
    
    <div class="title" id="titleid">
        <TextField id="titlefield" placeholder="Title Here"></TextField>
        </div>
        <Button variant="cta">Save</Button>
        <SimpleMDE/>
      
      
    </div>
    </div>
    </>
  )
}
export default Create;