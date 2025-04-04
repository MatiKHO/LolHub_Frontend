import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://lolhub-backend.onrender.com/api",
    withCredentials: true,
});