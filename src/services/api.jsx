import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['auth-token'] = token;
  } else {
    delete api.defaults.headers.common['auth-token'];
  }
};

export default api;
