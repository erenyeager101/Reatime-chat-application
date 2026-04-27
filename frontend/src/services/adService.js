import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response error:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request error:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  return Promise.reject(error);
};

const adService = {
  list: () => {
    return api.get('/ads')
      .then(response => response.data)
      .catch(handleError);
  },

  get: (id) => {
    return api.get(`/ads/${id}`)
      .then(response => response.data)
      .catch(handleError);
  },

  create: (adData) => {
    return api.post('/ads', adData)
      .then(response => response.data)
      .catch(handleError);
  },

  update: (id, adData) => {
    return api.put(`/ads/${id}`, adData)
      .then(response => response.data)
      .catch(handleError);
  },

  delete: (id) => {
    return api.delete(`/ads/${id}`)
      .then(response => response.data)
      .catch(handleError);
  },
};

export default adService;
export const { list, get, create, update, delete: remove } = adService;