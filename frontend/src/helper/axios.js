import axios from "axios";

const token = window.localStorage.getItem("auth-token");
const API_URI = process.env.REACT_APP_API_URI;

console.log("URI: ",API_URI);


const axiosInstance = axios.create({
  baseURL: API_URI,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem("auth-token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }

    return req;
})

export default axiosInstance;