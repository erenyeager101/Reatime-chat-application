import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authorization token or other headers here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// CRUD operations
const list = (resource) => {
  return api.get(`/${resource}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const get = (resource, id) => {
  return api.get(`/${resource}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const create = (resource, data) => {
  return api.post(`/${resource}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const update = (resource, id, data) => {
  return api.put(`/${resource}/${id}`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const remove = (resource, id) => {
  return api.delete(`/${resource}/${id}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export default api;
export { list, get, create, update, remove };