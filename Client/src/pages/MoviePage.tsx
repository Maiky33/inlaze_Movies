
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/principalPage.scss";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormRegister from "../components/FormRegister"
import SwiperComponent from "../components/SwiperComponent";
import MoviesComponent from "../components/MoviesComponent"

function PrincipalPage() {

  const {SingUp,SingIn,isAuthenticated,Errors,reloginverifyToken,LogOut}:any = useAuth()
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [formState, setformState] = useState(false)
  const [formActive, setformActive] = useState(false)

  const [MoviesSwiper, serMoviesSwiper] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_ACCESS_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        serMoviesSwiper(response.data.results.slice(0, 7));
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  
  const OnsubmitRegister = handleSubmit(async(values) =>{  
    if(formState){
      SingIn(values)
    }else{
      SingUp(values)
    }
  })

  const onSubmitSingUporSingIn =()=>{ 
    setformState(!formState)
  }
  

  useEffect(()=>{ 
    reloginverifyToken()
  },[])

  useEffect(()=>{ 
    if(isAuthenticated){  
      setformActive(false)
    }else{  
      setTimeout(()=>{    
        setformActive(true)
      },3000)
    }
  
  },[isAuthenticated])
 

  return (
    <div className="MoviePage">   
      
      buenas
      
    </div>
  );
}



export default PrincipalPage;
