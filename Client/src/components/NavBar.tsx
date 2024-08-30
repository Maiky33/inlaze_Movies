
import "./scss/navBar.scss";
import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {BiAlignRight, BiArrowFromBottom   } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";




function NavBar(props:any) {

  const {LogOut,allFavorites}:any = useAuth()
  const {isAuthenticated,setformActive,setMoviesFavorites,setMoviesPopular} = props
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
        setMoviesPopular(false)
        const res = await allFavorites()
        setMoviesFavorites(res)
      }
    }
  }

  const onClickPopular = async()=>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      if(MovieID){  
        navigate("/")
      }else{  
        setMoviesPopular(true)
      }
    }
  }

  return (
    <div className="containerNav">

      <div className="containerTitleAndItems"> 

        <div className="titleAndLogo"> 
          <h1>QUICKBET</h1>
          <div className="subtitleMovies"> 
            <span className="line_left"></span>
            <p>Movies</p> 
            <span className="line_right"></span>
          </div>
        </div>

      
        <ul className={!Menu ? "itemsNav": "itemsNavMenuEnable"}>  
          <li onClick={onClickPopular}  className="Icon">Popular</li>
          <li onClick={onClickFavorites} className="Icon">Favorites</li>
        </ul>

        
      </div>
      
      <div className="IconsNav"> 
        {Menu ? <BiArrowFromBottom  onClick={ClickMenuBurger} className="BurgerIcon" /> : <BiAlignRight  onClick={ClickMenuBurger} className="BurgerIcon" />}
        {isAuthenticated?
          <>  
            <FaRegUserCircle className="IconAuthentificated" onClick={ClickCloseSession}/>
          </>
          :
          <FaRegUserCircle className="Icon" onClick={()=>{setformActive(true)}}/>
        }
      </div>

      
    </div>
  );
}

export default NavBar;
