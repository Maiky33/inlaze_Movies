import axios from "axios";

let APIusers = 'http://localhost:4000/users';


export const registerRequest = async (user) => axios.post(`${APIusers}/register`, user,{
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const loginRequest = async (user) => axios.post(`${APIusers}/login`, user, {
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const logOutRequest = async (user) => axios.post(`${APIusers}/logout`, user,{
    withCredentials: true ,
    headers: {
      'Content-Type': 'application/json'
    }
});

export const reloginverifyTokenRequest = async () => axios.get(`${APIusers}/relogin`,{
    withCredentials: true 
});
