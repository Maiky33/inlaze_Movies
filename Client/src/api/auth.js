import axios from "axios";

let API = 'https://inlaze-movies-server.vercel.app/users'
let APIfavorites = 'https://inlaze-movies-server.vercel.app'


export const registerRequest = async (user) => axios.post(`${API}/register`, user,{
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const loginRequest = async (user) => axios.post(`${API}/login`, user, {
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const logOutRequest = async (user) => axios.post(`${API}/logout`, user,{
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const reloginverifyTokenRequest = async () => axios.get(`${API}/relogin`,{
    withCredentials: true 
});


// favorites endpoint
export const getallFavorites = async () => axios.get(`${APIfavorites}/favorites`,{
    withCredentials: true 
});

export const postFavoriteMovie = async (movie) => axios.post(`${APIfavorites}/favorites`, movie, {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const deletedFavoriteMovie = async () => axios.delete(`${APIfavorites}/favorites`,{
    withCredentials: true 
});
