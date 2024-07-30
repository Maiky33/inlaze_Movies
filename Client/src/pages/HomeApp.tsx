
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/homePage.scss";

import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchComponent from "../components/SearchComponent";
import Gradiend from "../images/gradiend-bg@2x.png"
import heroLeft from "../images/hero-left.png"
import heroRight from "../images/hero-right.png"


//Coneccion para escuchar y eviar los elementos



function HomeApp() {
  const {isAuthenticated}:any = useAuth()  
  const [inputValue, setinputValue] = useState()
  
  const [photos, setPhotos] = useState([]);

  const renderImages = (photos:any, startIndex:number, endIndex:number) => {
    return photos.slice(startIndex, endIndex).map((item:any, index:number) => (
      <img key={index} className="imagesColumn" src={item.urls.raw} alt=" " />
    ));
  };

  return (
    <div className="ContainerHomeApp">   
      <NavBar isAuthenticated={isAuthenticated}/> 
      {inputValue && inputValue !== "" ? <img src={Gradiend} draggable={false} className="headerSearchActive" /> : null}


      <div className={inputValue && inputValue !== "" ? "ContainerContentAppSearchActive" :"ContainerContentAppSearch"}> 
        {!inputValue || inputValue === "" ?
          <img className="heroBanner-left" src={heroLeft} alt="" />
          :null
        }

        <SearchComponent inputValue={inputValue} setinputValue={setinputValue} photos={photos} setPhotos={setPhotos}/>

        {!inputValue || inputValue === "" ?
          <img className="heroBanner-right" src={heroRight} alt="" />
          :null
        }
      </div>

      {inputValue && inputValue !== "" ? 
        <div className="containeColumnImages">
          <div className="containeImagesMap">
            {renderImages(photos, 0, 5)}
          </div>
          <div className="containeImagesMap">
            {renderImages(photos, 5, 10)}
          </div>
          <div className="containeImagesMap">
            {renderImages(photos, 10, 15)}
          </div>
          <div className="containeImagesMap">
            {renderImages(photos, 15, 20)}
          </div>
        </div>
        : null
      }

    </div>
  );
}

export default HomeApp;
