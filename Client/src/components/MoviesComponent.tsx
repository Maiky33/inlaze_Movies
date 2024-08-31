import {useState,useEffect,useCallback} from "react"
import axios from 'axios';
import "./scss/moviesComponent.scss"
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { useLocation, useNavigate } from "react-router-dom";



function MoviesComponent(props:any) {

  const keyApi = process.env.REACT_APP_ACCESS_KEY; // Reemplaza con tu Access Key de Unsplash\\
  
  const [Movies, setMovies] = useState([])

  const [inputValue, setinputValue] = useState("")
  const navigate = useNavigate()
  const location = useLocation();


  const [selectGenresActive, setselectGenresActive] = useState(true)

  const [selectGenres, setselectGenres] = useState({
    id: 28,
    name: "Action"
  })

  const {isAuthenticated,addFavorite,user,allFavorites}:any = useAuth()
  const [genres, setgenres] = useState([])
  const {setformActive,MoviesFavorites,MoviesPopular,setMoviesPopular,localfromNavegite} = props

  useEffect(()=>{ 
    if(MoviesFavorites){  
      const newMoviesFavorites = MoviesFavorites.map((item:any)=>{  
        return{ 
          ...item,
          favorite:true
        }
      })

      setMovies(newMoviesFavorites)
    }
  },[MoviesFavorites])

  const onHandleChange =(e:any)=>{ 
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      setinputValue(e.target.value)
    }
  }


  const onClickselectGener = (item:any) =>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      setMoviesPopular(false)
      setselectGenres(item)
    }
  }

  const onClickFavoriteCard = (itemmovie:any) =>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{

      const newMoviesFavorites:any = Movies.map((item: any) => {
        if(itemmovie.id === item.id){ 
          return{
            ...item,
            favorite:true
          }
        }else{  
          return item
        }
        
      });

      setMovies(newMoviesFavorites)
      addFavorite(user.user.id,itemmovie)
    }
  }

  const fetchMovies = useCallback(async () => {
    try {
      const responseGenre = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: keyApi,
          language: 'en-US'
        }
      });
      setgenres(responseGenre.data.genres);

      let responseMovies:any = [];

      if (inputValue !== "") {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: keyApi,
            query: inputValue
          }
        });
        responseMovies = response.data.results;
      } else {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: keyApi,
            language: 'en-US',
            sort_by: "popularity.desc",
            with_genres: selectGenres.id
          }
        });
        responseMovies = response.data.results;
      }

      if(localfromNavegite === "Popular"){
         
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: keyApi,
            language: 'en-US',
            sort_by: "popularity.desc",
            with_genres: "28"
          }
        });
        responseMovies = response.data.results;
        navigate(location.pathname, { replace: true })
      }else if(localfromNavegite === "Favorites"){  
        responseMovies = [];
      }

      const resFavorites = await allFavorites();

      if (resFavorites) {
        const newMoviesFavorites:any = responseMovies.map((item: any) => {
          const isFavorite = resFavorites.some((itemFavorite: any) => item.id === itemFavorite.id);

          return {
            ...item,
            favorite: isFavorite,
          };
        });

        setMovies(newMoviesFavorites);
      } else {
        setMovies(responseMovies);
      }

    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  }, [inputValue, selectGenres, keyApi, allFavorites,MoviesPopular,localfromNavegite,location.pathname,navigate]);

  const onClickPageImage = (movie:any)=>{  
    if(!isAuthenticated){  
      setformActive(true)
    }else{  
      navigate(`/MoviePage/${movie.id}`)
    }
  }

 

  useEffect(() => {
    fetchMovies();
  }, [inputValue,selectGenres,isAuthenticated,fetchMovies,MoviesPopular]);

  return (
    <div className="containerMoviesAndFiltersComponent">   
      <div className="ColumnFilters"> 
        
        <p>Search</p>
        <div className="containerSearchIcon"> 
          <input placeholder="Keywords" onChange={onHandleChange} type="text" />
          <CiSearch className="searchIcon"/>
        </div>
      
  
    
        <p>Genres</p>
        <div onClick={()=>setselectGenresActive(!selectGenresActive)} className="SelectFilter" id="">  
          <p>{selectGenres.name}</p>
          <IoIosArrowDown className="ArrowDown" size={20}/>
        </div>

        { 
          selectGenresActive? 
          <div className="optionsActive"> 
            {
              genres?.map((item:any)=>(
                <p className={item.name === selectGenres.name? "ActiveItem" : ""} onClick={()=>onClickselectGener(item)}>{item.name}</p>
              )) 
            }
          </div>:null
        }
        
      </div>

      <div className="containerMoviesandtitle">
        {MoviesPopular? <p className="title">Popular</p> : null}

        <div className={Movies.length< 5? "containerMoviesMin" :"containerMovies"}> 
          
          {Movies?.map((movie:any) => (
            <div  className="CardMovie"> 
              <img onClick={()=>onClickPageImage(movie)} className="ImageMovie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> 

              <div className="containTextImage"> 
                <div className="titleAndDate"> 
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>

                <div className="containerIcons"> 
                  <div className="IconsText"> 
                    <p>Rating</p>
                    <div className="ProgressCicular"> 
                      <CircularProgressbar
                        value={Math.round(movie.vote_average*10)}
                        text={`${Math.round(movie.vote_average*10)}%`}
                        styles={buildStyles({
                          pathColor: "#4DA14F", // Color del progreso
                          textColor: "#ffffff", // Color del texto
                          trailColor: '#e0e0e0', // Color del círculo de fondo
                          strokeLinecap: 'round', // Estilo del borde
                        })}
                      />
                    </div>
                
                  </div>
                  <div className="IconsText"> 
                    <p>Favorites</p>
                    <FaHeart onClick={()=>onClickFavoriteCard(movie)} className={movie.favorite? "heartIconActive":"heartIcon"}/>
                  </div>
                </div>
              </div>      
            </div>
              
            ))} 
        </div>
      </div>
    </div>
  )
}

export default MoviesComponent;
