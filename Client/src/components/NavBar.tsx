
import "./scss/navBar.scss";
import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {BiAlignRight, BiArrowFromBottom   } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";



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
        navigate("/", { state: { from: 'Favorites' } })
      }else{
        setMoviesPopular(false)
        const res = await allFavorites()
        setMoviesFavorites(res)
      }
    }
  }

  const onClickPopular = ()=>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      if(MovieID){  
        navigate("/", { state: { from: 'Popular' } })
      }else{  
        setMoviesPopular(true)
      }
    }
  }

  const onclickUserCircle = ()=>{ 
    if(isAuthenticated) return
    setformActive(true)
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
        <FaRegUserCircle className={isAuthenticated? "IconAuthentificated" :"Icon"} onClick={()=>{onclickUserCircle}}/>
        {isAuthenticated?
          <>  
            <IoMdExit className="Icon" onClick={ClickCloseSession}/>
          </>
          : null
        }
      </div>

      
    </div>
  );
}

export default NavBar;
