import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const authService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
authService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
authService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const list = () => {
  return authService.get('/auth')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const get = (id) => {
  return authService.get(`/auth/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const create = (data) => {
  return authService.post('/auth', data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const update = (id, data) => {
  return authService.put(`/auth/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const remove = (id) => {
  return authService.delete(`/auth/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export default authService;
export { list, get, create, update, remove };