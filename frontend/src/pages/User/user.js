import React from 'react';

import Navbar from '../../Components/Navbar/Navbar';
import Menu from './menuApi';

import './user.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
const User = () => {

  const [menuData, setMenuData] = React.useState(Menu);
  const largerThanSixty = Menu.filter( number => {
    return number.googleID ==="vishalg"
  })

  return (
    <>
    <Navbar/>


      <div  >
        <div className="card">
      
          <h1 className="username">{ largerThanSixty.map(number => <li>{number.username}</li>) }</h1>
          <p className="title">{largerThanSixty.map(number => <li>{number.email}</li>) }</p>
          <h2 className="yourtag">Note Count</h2>
          <button className="buttonhome">{ largerThanSixty.map(number => <li>{number.notes.length}</li>) }</button>
          <h2 className="yourtag">Your Tags</h2>
          <p className="tags">{ largerThanSixty.map(number => <li>{number.tags.toString()}</li>) }</p>

          <p><button className="loginbutton">Logout</button></p>
        </div>
       
      </div>
    </>
  );
}
export default User;