
import React, { useState } from "react";
import "./Navbar.css";
import {BsPersonFill} from "react-icons/bs";


import { NavLink } from "react-router-dom";

const Navbar = () => {
  
  return (
    <>
      <nav className="main-nav">
      <img src={require("./noteIcon.png")} width="10px" height="10px" alt="icon" ></img>
        {/* 1st logo part  */}
        <div className="logo">
        
          <h2>
            <span>N</span>ote
            <span>I</span>t
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
             "menu-link"
          }>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
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
            <li>        <a href="#">
                < BsPersonFill/>
              </a></li>
            
          </ul>
        </div>


        


        


      </nav>     
    </>
  );
};

export default Navbar;