import Navbar from '../../Components/Navbar/Navbar';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import './Create.css';
const Create = () => {
  return (
    <>
    <Navbar/>
   <div className="central">
    <div className="container">
    
      
        <SimpleMDE/>
      
      
    </div>
    </div>
    </>
  )
}
export default Create;