// import React from 'react';

// import Navbar from '../../Components/Navbar/Navbar';
// import Menu from './menuApi';

// import './user.css';
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
// const User = () => {

//   const [menuData, setMenuData] = React.useState(Menu);
//   const largerThanSixty = Menu.filter( number => {
//     return number.googleID ==="vishalg"
//   })

//   return (
//     <>
//     <Navbar/>


//       <div  >
//         <div className="card">
      
//           <h1 className="username">{ largerThanSixty.map(number => <li>{number.username}</li>) }</h1>
//           <p className="title">{largerThanSixty.map(number => <li>{number.email}</li>) }</p>
//           <h2 className="yourtag">Note Count</h2>
//           <button className="buttonhome">{ largerThanSixty.map(number => <li>{number.notes.length}</li>) }</button>
//           <h2 className="yourtag">Your Tags</h2>
//           <p className="tags">{ largerThanSixty.map(number => <li>{number.tags.toString()}</li>) }</p>

//           <p><button className="loginbutton">Logout</button></p>
//         </div>
       
//       </div>
//     </>
//   );
// }
// export default User;


// import React, { useEffect, useState } from "react";
// import axios from "axios"; 


// const User = () => {
//   const [profile,setProfileData]=React.useState()

//   const [menuData, setMenuData] = React.useState(Menu);
//   const largerThanSixty = Menu.filter( number => {
//     return number.googleID ==="vishalg"
//   })

//   return (
//     <>
//     <Navbar/>


//       <div  >
//         <div className="card">
      
//           <h1 className="username">{ largerThanSixty.map(number => <li>{number.username}</li>) }</h1>
//           <p className="title">{largerThanSixty.map(number => <li>{number.email}</li>) }</p>
//           <h2 className="yourtag">Note Count</h2>
//           <button className="buttonhome">{ largerThanSixty.map(number => <li>{number.notes.length}</li>) }</button>
//           <h2 className="yourtag">Your Tags</h2>
//           <p className="tags">{ largerThanSixty.map(number => <li>{number.tags.toString()}</li>) }</p>

//           <p><button className="loginbutton">Logout</button></p>
//         </div>
       
//       </div>
//     </>
//   );
// }

// function User() {


 
//     const profile = axios.get("/profile");
//     //setUser(profile.data);
//    // setLoading(false);


//     return (
//       <div>
//         <p>Email: {profile.email}</p>
//         <p>First Name: {profile.first_name}</p>
//         <p>Last Name: {profile.last_name}</p>
//       </div>
//     );
  
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../Components/Navbar/Navbar';
import './user.css';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

function User() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(async () => {
    console.log('useEffect');
    const profile = await axios.get("http://localhost:5000/profile",{
      withCredentials:true,
  });
    // fetch("http://localhost:5000/profile")
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    // });

    console.log(profile);
    setUser(profile.data);
    setLoading(false);
    console.log(user);
  }, []);

  if (isLoading) return "Loading...";
  else {
    return (
      <div>
        <p>Email: {user.email}</p>
        <p>UserName: {user.username}</p>
        <p>Tags: {user.tags}</p>
      </div>
    );
  }
}

export default User;