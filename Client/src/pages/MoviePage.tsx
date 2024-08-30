
import axios from "axios";
import { useState,useEffect,useCallback} from "react";
import "./scss/moviePage.scss";
import {useAuth} from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { CiPlay1 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";

function MoviePage(props:any) {

  const {isAuthenticated}:any = useAuth()

  const [MoviePage, setMoviePage] = useState<any>([])
  const [recomendations, setRecomendations] = useState([]);
  const { MovieID }  = useParams();

  const navigate = useNavigate()

  const [movieID , setMovieID] = useState(MovieID)

  const keyApi = process.env.REACT_APP_ACCESS_KEY;
  
  const fetchMovie = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}`, {
        params: {
          api_key: keyApi
        }
      });
      setMoviePage([response.data]);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }, [MovieID, keyApi,movieID]); // Dependencias: `MovieID` y `keyApi`

  const fetchRecomendations = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieID}/recommendations`, {
        params: {
          api_key: keyApi,
          language: 'en-US',
        }
      });
      setRecomendations(response.data.results);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  }, [MovieID, keyApi,movieID]); 

  const recomendationsClick = (itemSelected:any) =>{  
    setMovieID(itemSelected.id)
  }

  useEffect(() => {
    fetchMovie();
    fetchRecomendations();
  }, [fetchMovie, fetchRecomendations, MovieID]); 

  

  return (
    <div className="MoviePage">   
      <NavBar isAuthenticated={isAuthenticated}/> 
      <div className="containerArrow"> 
        <IoIosArrowBack onClick={()=>navigate("/")} className="Arrow"/>
      </div>
      { 
        MoviePage.map((movie:any)=>(
          <div style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundRepeat:"none",
            backgroundSize:"cover",
            height:"560px"
            }} className="containerimage"> 
            
            <div className="containerImageAndTrailer"> 
              <img className="Image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
              <div className="buttonTrailer"> 
                <p>Official Trailer</p>
                <CiPlay1  className="Icon"/>
              </div>
            </div>
            <div className="containerInfo"> 
              <div className="containerTitleandDate"> 
                <h2>{movie.original_title}</h2>
                <div className="containerDates"> 
                  <p>{movie.release_date}</p>
                  <p>{movie.runtime} minutes</p>
                </div>
              </div>
              <div className="ContainerOverView"> 
                <h3>Overview</h3>
                <p>{movie.overview}</p>
              </div>
              <div className="circularMovieAndIcons"> 
                <div className="circularMovie"> 
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
                     <p>Users Score</p>   
                </div>
                <div className="containerItems"> 
                  <FaHeart />
                </div>

              </div>

              <div className="ContainerGeners"> 
                { movie.genres.map((genre:any)=>( 
                  <p className="gener">{genre.name}</p>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
      
      <div className="containerCastAndDirector"> 
        <div className="containeCast"> 
          <div className="Cast"> 
            <p className="Title">Recommendations</p>
            <div className="containerRecomendations"> 
              { 
                recomendations?.map((item:any,index)=>{  
                  if(index < 20){  
                    return (  
                      <div className="Card"> 
                        <img onClick={()=>recomendationsClick(item)} className="Image" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="" />
                        <p className="ActorAndCharacter">{item.title}</p>
                      </div>
                    )
                  }else{  
                    return null
                  }
                })
              }
            </div>
          </div>

        </div>

          
        </div>

    </div>
  );
}



export default MoviePage;
