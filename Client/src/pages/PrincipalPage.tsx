
import axios from "axios";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import "./scss/principalPage.scss";
import {useAuth} from "../context/AuthContext";
import NavBar from "../components/NavBar";
import FormRegister from "../components/FormRegister"
import SwiperComponent from "../components/SwiperComponent";
import MoviesComponent from "../components/MoviesComponent"

function PrincipalPage() {

  const {SingUp,SingIn,isAuthenticated,Errors,reloginverifyToken}:any = useAuth()
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [formState, setformState] = useState(false)
  const [formActive, setformActive] = useState(false)

  const [MoviesSwiper, serMoviesSwiper] = useState([]);
  const [MoviesFavorites, setMoviesFavorites] = useState([]);



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
    }
  
  },[isAuthenticated])
 

  return (
    <div className="PrincipalPage">   
      <NavBar setMoviesFavorites={setMoviesFavorites} setformActive={setformActive} isAuthenticated={isAuthenticated}/> 
      <SwiperComponent setformActive={setformActive} MoviesSwiper={MoviesSwiper}/>
      <MoviesComponent MoviesFavorites={MoviesFavorites} setformActive={setformActive} />

      {formActive? 
        <FormRegister 
          onSubmitSingUporSingIn={onSubmitSingUporSingIn}
          formState={formState}
          OnsubmitRegister={OnsubmitRegister}
          Errors={Errors}
          errors={errors}
          register={register}
          setformState={setformState}
          setformActive={setformActive}
        />
        :null
      }
      
      
    </div>
  );
}



export default PrincipalPage;
