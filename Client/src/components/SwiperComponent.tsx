import "./scss/swiperComponent.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import 'react-circular-progressbar/dist/styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SwiperComponent(props:any) {

  const {MoviesSwiper, setformActive} = props
  const {isAuthenticated}:any = useAuth()


  const onClickFavorite = ()=>{ 
    if(!isAuthenticated){
      setformActive(true)
    }
  }

  return (
    <div className="containerSwiper">   
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        
        loop={true}
        autoplay={{delay:3000}}
        onSwiper={(swiper:any) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="Swiper"
      >

        {MoviesSwiper.map((movie:any) => (
          <SwiperSlide key={movie.id} className="movie">
            <img className="ImageBanner" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />

            <div className="TitleAndCircularMovie"> 

              <div className="containerTitle"> 
                <h3>{movie.title}</h3>
                <p>Rating: {movie.overview}</p>
              </div>

              <div className="CircularDate">
                <FaHeart className="Icon" onClick={onClickFavorite}/>

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
          </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  )
}

export default SwiperComponent;
