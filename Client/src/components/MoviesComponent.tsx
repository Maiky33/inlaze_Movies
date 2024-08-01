import {useState,useEffect} from "react"
import axios from 'axios';
import "./scss/moviesComponent.scss"
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { useNavigate } from "react-router-dom";



function MoviesComponent(props:any) {

  const keyApi = process.env.REACT_APP_ACCESS_KEY; // Reemplaza con tu Access Key de Unsplash\\
  
  const [Movies, setMovies] = useState([])

  const [inputValue, setinputValue] = useState("")
  const navigate = useNavigate()


  const [selectGenresActive, setselectGenresActive] = useState(true)
  const [selectSortByActive, setselectSortByActive] = useState(true)

  const [selectGenres, setselectGenres] = useState({
    id: 28,
    name: "Action"
  })
  const [selectSortBy, setselectSortBy] = useState({  
    name:"Popularity descending",
    slug:"popularity.desc"
  })

  const {sort_byCategorys,isAuthenticated,addFavorite,user,allFavorites}:any = useAuth()
  const [genres, setgenres] = useState([])
  const {setformActive,MoviesFavorites} = props

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

  const onClickselectSort = (item:any) =>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
      setselectSortBy(item)
    }
  }

  const onClickselectGener = (item:any) =>{  
    if(!isAuthenticated){ 
      setformActive(true)
    }else{
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

  const fetchPhotos = async () => {
    try {
      const responsegenre = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
        params: {
          api_key: keyApi,
          language: 'en-US'
        }
      });
      setgenres(responsegenre.data.genres);

      let responseMovies:any

      if(inputValue !== ""){ 
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: keyApi,
            query: inputValue
          }
        });
        responseMovies = response.data.results
      }else{  
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: keyApi,
            language: 'en-US',
            sort_by: selectSortBy.slug,
            with_genres: selectGenres.id
          }
        });
        responseMovies = response.data.results
      }

      const resFavorites = await allFavorites()

      const newMoviesFavorites = responseMovies.map((item: any) => {
        const isFavorite = resFavorites.some((itemFavorite: any) => item.id === itemFavorite.id);
  
        return {
          ...item,
          favorite: isFavorite,
        };
      });


      setMovies(newMoviesFavorites)

    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const onClickPageImage = (movie:any)=>{  
    if(!isAuthenticated){  
      setformActive(true)
    }else{  
      navigate(`/MoviePage/${movie.id}`)
    }
  }

 

  useEffect(() => {
    fetchPhotos();
  }, [inputValue,selectGenres,selectSortBy]);

  return (
    <div className="containerMoviesAndFiltersComponent">   
      <div className="ColumnFilters"> 
        
        <p>Search</p>
        <div className="containerSearchIcon"> 
          <input placeholder="Keywords" onChange={onHandleChange} type="text" />
          <CiSearch className="searchIcon"/>
        </div>
      
        <p>Sort By</p>
        <div onClick={()=>setselectSortByActive(!selectSortByActive)} className="SelectFilter" id="">  
          <p >{selectSortBy?.name}</p>
          <IoIosArrowDown className="ArrowDown" size={20}/>
        </div>
        { 
          selectSortByActive? 
          <div className="optionsActive"> 
            {
              sort_byCategorys.map((item:any)=>(
                <p className={item.name === selectSortBy.name? "ActiveItem" : ""} onClick={()=>onClickselectSort(item)}>{item.name}</p>
              )) 
            }
          </div>:null
        }
    
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

      <div className={Movies.length< 5? "containerMoviesMin" :"containerMovies"}> 
        {Movies?.map((movie:any) => (
            
          
          <div onClick={()=>onClickPageImage(movie)} className="CardMovie"> 
            <img className="ImageMovie" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> 

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
                <div className="IconsText"> 
                  <p>Save</p>
                  <IoIosBookmark className="BookmarkIcon"/>
                </div>
              </div>
            </div>      
          </div>
            
          ))} 
      </div>
    </div>
  )
}

export default MoviesComponent;
