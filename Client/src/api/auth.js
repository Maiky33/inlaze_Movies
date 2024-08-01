import axios from "axios";

let API = 'http://localhost:4000/users'

export const registerRequest = async (user) => axios.post(`${API}/register`, user,{
    withCredentials: true // Esto incluye las cookies en la solicitud
});

export const loginRequest = async (user) => axios.post(`${API}/login`, user, {
    withCredentials: true // Esto incluye las cookies en la solicitud
});

export const logOutRequest = async (user) => axios.post(`${API}/logout`, user,{
    withCredentials: true // Esto incluye las cookies en la solicitud
});

export const reloginverifyTokenRequest = async () => axios.get(`${API}/relogin`,{
    withCredentials: true // Esto incluye las cookies en la solicitud
});
