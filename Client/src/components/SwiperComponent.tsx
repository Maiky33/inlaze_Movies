import {useState,useEffect} from "react"
import axios from 'axios';
import "./scss/swiperComponent.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { FaRegHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { IoIosBookmark } from "react-icons/io";
import 'react-circular-progressbar/dist/styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SwiperComponent(props:any) {

  const {MoviesSwiper} = props

  return (
    <div className="containerSwiper">   
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
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

      <div className="containerItemsAndFavorites"> 
        <div className="itemsContainer"> 
          <p>Trama</p>
          <p>Cast</p>
          <p>Gallery</p>
          <p>Info</p>
        </div>
        <div className="IconsContainer"> 
          <FaRegHeart />
          <IoIosBookmark />
          <IoMdShare />
        </div>
      </div>
    </div>
  )
}

export default SwiperComponent;
