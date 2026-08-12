import axios from 'axios';
import {getToken} from './authStorage';


const api = axios.create({
  baseURL: 'http://192.168.1.11:3000',
  //10.0.2.2
  //192.168.1.11
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;