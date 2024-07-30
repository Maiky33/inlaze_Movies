
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/navBar.scss";

import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.svg"

//Coneccion para escuchar y eviar los elementos



function NavBar(props:any) {

  const {isAuthenticated} = props

  const usenavigate = useNavigate()

  return (
    <div className="containerNav">
      <div className="titleAndLogo"> 
        <h1>INLAZE</h1>
        <div className="subtitleMovies"> 
          <span className="line_left"></span>
          <p>Movies</p> 
          <span className="line_right"></span>
        </div>
      </div>

      
      <ul className="itemsNav">  
        <li>Popular</li>
        <li>Now Playing</li>
        <li>Upcoming</li>
        <li>Top Rated</li>
        <li>Favorites</li>
        <li>Saved</li>
      </ul>
      


      
    </div>
  );
}

export default NavBar;
