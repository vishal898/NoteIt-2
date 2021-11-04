
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../Components/Navbar/Navbar';
import './user.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
const User = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser]=useState()
  useEffect(async () => {
    const profile = await axios.get("http://localhost:5000/profile", 
      {withCredentials:true});
    setUser(profile.data);
    
    setLoading(false);
  }, []);
 // console.log(user.notes.length)

  if (isLoading) return "Loading...";
  else {
  return (
    <>
    <Navbar/>
      <div className="middle" >
        <div className="card">
      
          <h1 className="username"><li>{user.username}</li></h1>
          <p className="title"><li>{user.email}</li></p>
          <h2 className="yourtag">Note Count</h2>
          <button className="buttonhome"><li>{user.notes.length}</li></button>
          <h2 className="yourtag">Your Tags</h2>
          <p className="tags"><li>{user.tags.toString()}</li></p>

          <p><button className="loginbutton" ><a style={{color:'white'}} href="http://localhost:5000/logout">Logout</a></button></p>
        </div>
      
       
      </div>
    </>
  );
}

}
  
export default User;