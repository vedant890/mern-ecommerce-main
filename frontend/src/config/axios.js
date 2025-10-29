import axios from 'axios';

export const axiosi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});