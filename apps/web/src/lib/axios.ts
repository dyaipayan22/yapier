import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_SERVER_URL;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export default axiosPublic;