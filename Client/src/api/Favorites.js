import axios from "axios";

let APIfavorites = 'http://localhost:4000/favorites';

// favorites endpoint
export const getallFavorites = async () => axios.get(`${APIfavorites}/allFavorites`,{
    withCredentials: true 
});

export const toogleFavoriteMovie = async (movie) => axios.post(`${APIfavorites}/toggleFavorite`, movie, {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
