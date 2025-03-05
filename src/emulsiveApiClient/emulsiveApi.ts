import axios from 'axios';

export const emulsiveApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_ADDRESS,
});
