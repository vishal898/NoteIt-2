
import React, { useState } from "react";
import "./Navbar.css";
import {BsPersonFill} from "react-icons/bs";
import { ReactComponent as Icon } from "../../NoteSVG.svg";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  
  return (
    <>
      <nav className="main-nav">
        <div className="Icon">
        <Icon style={{"height":"80","justify-content":"start","align-items": "center","width":"80"}} />
        </div>
        {/* 1st logo part  */}
        <div className="logo">

          <h1>
          
            <span>N</span>ote
            <span>I</span>t
          </h1>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
             "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/anki">Anki</NavLink>
            </li>
            <li>
              <NavLink to="/topic">Topic</NavLink>
            </li>
            <li>
              <NavLink to="/create">create</NavLink>
            </li>
            <li> <NavLink to="/user">
                < BsPersonFill/>
                </NavLink>
            </li>
            
          </ul>
        </div>


        


        


      </nav>     
    </>
  );
};

export default Navbar;