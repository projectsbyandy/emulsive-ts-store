import axios from 'axios';

const emulsiveApiUrl = "http://localhost:8085/api";

export const emulsiveApi = axios.create({
  baseURL: emulsiveApiUrl,
});
