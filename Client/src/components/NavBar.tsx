
import { useState } from "react";
import "./scss/navBar.scss";

import {useAuth} from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import {BiAlignRight, BiArrowFromBottom   } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";




function NavBar(props:any) {

  const {LogOut,allFavorites}:any = useAuth()
  const {isAuthenticated,setformActive,setMoviesFavorites} = props
  const [Menu, setMenu] = useState(false);
  const { MovieID }  = useParams();
  const navigate = useNavigate()

  const ClickMenuBurger = () => {
    setMenu(!Menu);
  };

  const ClickCloseSession =()=>{ 
    LogOut()
  }

  const onClickFavorites = async()=>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      if(MovieID){
        navigate("/")
      }else{
        const res = await allFavorites()
        setMoviesFavorites(res)
      }
    }
  }

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
          <li onClick={onClickFavorites} className="Icon">Favorites</li>
          <li>Saved</li>
        </ul>

        
      </div>
      
      <div className="IconsNav"> 
        {Menu ? <BiArrowFromBottom  onClick={ClickMenuBurger} className="BurgerIcon" /> : <BiAlignRight  onClick={ClickMenuBurger} className="BurgerIcon" />}
        {isAuthenticated?
          <>  
            <FaRegUserCircle className="Icon"/>
            <IoNotificationsOutline className="Icon"/>
            <ImExit className="Icon" onClick={ClickCloseSession}/>
          </>
          :
          <BiExit className="Icon" onClick={()=>{setformActive(true)}}/>
        }
      </div>

      
    </div>
  );
}

export default NavBar;
