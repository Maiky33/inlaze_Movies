
import axios from "axios";
import { useState,useEffect } from "react";
import "./scss/imageComponent.scss";

import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/Logo.svg"

//Coneccion para escuchar y eviar los elementos



function ImageComponent(props:any) {

  const {isAuthenticated} = props
  const usenavigate = useNavigate()

  return (
    <div className="ContainerImageComponent">
      image Selected
    </div>
  );
}

export default ImageComponent;
