
import axios from "axios";
import { useState,useEffect } from "react";
import "./scss/moviePage.scss";
import {useAuth} from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { CiPlay1 } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";

function MoviePage(props:any) {

  const {} = props
  const {isAuthenticated}:any = useAuth()

  const [formActive, setformActive] = useState(false)
  const [MoviePage, setMoviePage] = useState<any>([])
  const [cast, setCast] = useState([]);
  const { MovieID }  = useParams();
  const navigate = useNavigate()
  const [MoviesFavorites,setMoviesFavorites]= useState()


  const keyApi = process.env.REACT_APP_ACCESS_KEY;
  
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${MovieID}`, {
        params: {
          api_key: keyApi
        }
      });
      setMoviePage([response.data]);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  }
  const fetchCast = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${MovieID}/credits`, {
        params: {
          api_key: keyApi
        }
      });
      setCast(response.data.cast);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  useEffect(() => {
    fetchMovie()
    fetchCast();
  }, []);


  return (
    <div className="MoviePage">   
      <NavBar setMoviesFavorites={setMoviesFavorites}  setformActive={setformActive} isAuthenticated={isAuthenticated}/> 
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
                  <FaRegHeart />
                  <IoMdShare />
                  <IoIosBookmark />
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
            <p className="Title">Cast</p>
            <div className="containerActors"> 
              { 
                cast.map((item:any,index)=>{  
                  if(index < 20){  
                    return (  
                      <div className="Card"> 
                        <img className="Image" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="" />
                        <p className="ActorAndCharacter">{item.name}  <span> as {item.character}</span></p>
                      </div>
                    )
                  }
                })
              }
            </div>
          </div>

          { MoviePage.map((movie:any)=>(  

            <div className="plotSummary"> 
              <h3>Plot Summary</h3>
              <p>{movie.overview}</p>
            </div>
            ))
          }
        </div>

          <div className="containerDirector"> 
              { MoviePage.map((movie:any)=>(  

                <div className="extraData"> 
                  <h4>Status</h4>
                  <p>{movie.status}</p>
                  <h4>Tagline</h4>
                  <p>{movie.tagline}</p>
                  <h4>languages</h4>
                  <p>{movie.spoken_languages[0].name}</p>
                </div>
                ))
              }
          </div>
        </div>

    </div>
  );
}



export default MoviePage;
