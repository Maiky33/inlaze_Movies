import {useState,useEffect} from "react"
import axios from 'axios';
import "./scss/moviesComponent.scss"
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { FaRegHeart } from "react-icons/fa";
import { IoIosBookmark } from "react-icons/io";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';



function MoviesComponent(props:any) {

  const keyApi = process.env.REACT_APP_ACCESS_KEY; // Reemplaza con tu Access Key de Unsplash\\
  
  const [Movies, setMovies] = useState([])
  const [inputValue, setinputValue] = useState()
  const [category, setcategory] = useState("now_playing")

  const [selectGenresActive, setselectGenresActive] = useState(false)
  const [selectSortByActive, setselectSortByActive] = useState(false)

  const [selectGenres, setselectGenres] = useState({
    id: 28,
    name: "Action"
  })
  const [selectSortBy, setselectSortBy] = useState({  
    name:"Popularity descending",
    slug:"popularity.desc"
  })

  const {sort_byCategorys}:any = useAuth()
  const [genres, setgenres] = useState([])

  const onHandleChange =(e:any)=>{ 
    setinputValue(e.target.value)
  }


  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: keyApi,
          language: 'en-US',
          sort_by: selectSortBy.slug,
          with_genres: selectGenres.id
        }
      });
      setMovies(response.data.results)

      const responsegenre = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
        params: {
          api_key: keyApi,
          language: 'en-US'
        }
      });
      setgenres(responsegenre.data.genres);

    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

 

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
          <IoIosArrowDown size={20}/>
        </div>
        { 
          selectSortByActive? 
          <div className="optionsActive"> 
            {
              sort_byCategorys.map((item:any)=>(
                <p onClick={()=>setselectSortBy(item)}>{item.name}</p>
              )) 
            }
          </div>:null
        }
    
        <p>Genres</p>
        <div onClick={()=>setselectGenresActive(!selectGenresActive)} className="SelectFilter" id="">  
          <p>{selectGenres.name}</p>
          <IoIosArrowDown size={20}/>
        </div>

        { 
          selectGenresActive? 
          <div className="optionsActive"> 
            {
              genres?.map((item:any)=>(
                <p onClick={()=>setselectGenres(item)}>{item.name}</p>
              )) 
            }
          </div>:null
        }
        
      </div>

      <div className="containerMovies"> 
        {Movies?.map((movie:any) => (
            
          
          <div className="CardMovie"> 
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
                  <FaRegHeart className="heartIcon"/>
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
