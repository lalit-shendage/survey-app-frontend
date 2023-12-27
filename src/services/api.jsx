import axios from 'axios';

const baseURL = 'https://survey-backend-dstk.onrender.com'; 

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
