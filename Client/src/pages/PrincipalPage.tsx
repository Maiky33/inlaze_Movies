
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/principalPage.scss";
import {useAuth} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import FormRegister from "../components/FormRegister"
import SwiperComponent from "../components/SwiperComponent";


function PrincipalPage() {

  const {SingUp,SingIn,isAuthenticated,Errors,reloginverifyToken}:any = useAuth()
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [formState, setformState] = useState(true)
  const [MoviesSwiper, serMoviesSwiper] = useState([]);
  const navigate = useNavigate()

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'TU_API_KEY_AQUÍ';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=`);
        serMoviesSwiper(response.data.results.slice(0, 7));
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchMovies();
  }, []);

  console.log("movies",MoviesSwiper)

  
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
      navigate("/HomeApp")
    }
  },[isAuthenticated])
 

  return (
    <div className="PrincipalPage">   
      <NavBar isAuthenticated={isAuthenticated}/> 
      <SwiperComponent MoviesSwiper={MoviesSwiper}/>

      
    </div>
  );
}

{/* <FormRegister 
            onSubmitSingUporSingIn={onSubmitSingUporSingIn}
            formState={formState}
            OnsubmitRegister={OnsubmitRegister}
            Errors={Errors}
            errors={errors}
            register={register}
          /> */}

export default PrincipalPage;
