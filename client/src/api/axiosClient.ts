import axios, { type InternalAxiosRequestConfig } from "axios";
import { host } from '../utils/api'



const axiosClient = axios.create({
    baseURL: host,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem("token")
    if (token)
        config.headers.Authorization = `${token}`
    return config
}, (error: InternalAxiosRequestConfig) => {
    return Promise.reject(error);
})

export { axiosClient };