
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/navBar.scss";

import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { FiSun } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import {BiAlignRight, BiArrowFromBottom   } from "react-icons/bi";


//Coneccion para escuchar y eviar los elementos



function NavBar(props:any) {

  const {isAuthenticated} = props
  const usenavigate = useNavigate()

  const [Menu, setMenu] = useState(false);

  const ClickMenuBurger = () => {
    setMenu(!Menu);
  };

  return (
    <div className="containerNav">

      <div className="containerTitleAndItems"> 

        <div className="titleAndLogo"> 
          <h1>INLAZE</h1>
          <div className="subtitleMovies"> 
            <span className="line_left"></span>
            <p>Movies</p> 
            <span className="line_right"></span>
          </div>
        </div>

      
        <ul className={!Menu ? "itemsNav": "itemsNavMenuEnable"}>  
          <li>Popular</li>
          <li>Now Playing</li>
          <li>Upcoming</li>
          <li>Top Rated</li>
          <li>Favorites</li>
          <li>Saved</li>
        </ul>

        
      </div>
      
      <div className="IconsNav"> 
        {Menu ? <BiArrowFromBottom  onClick={ClickMenuBurger} className="BurgerIcon" /> : <BiAlignRight  onClick={ClickMenuBurger} className="BurgerIcon" />}
        <FiSun />
        <BiExit />
      </div>

      
    </div>
  );
}

export default NavBar;
