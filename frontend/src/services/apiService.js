import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
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

const list = (resource) => {
  return apiClient.get(`/${resource}`)
    .then(response => response.data)
    .catch(handleError);
};

const get = (resource, id) => {
  return apiClient.get(`/${resource}/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const create = (resource, data) => {
  return apiClient.post(`/${resource}`, data)
    .then(response => response.data)
    .catch(handleError);
};

const update = (resource, id, data) => {
  return apiClient.put(`/${resource}/${id}`, data)
    .then(response => response.data)
    .catch(handleError);
};

const remove = (resource, id) => {
  return apiClient.delete(`/${resource}/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const apiService = {
  list,
  get,
  create,
  update,
  delete: remove,
};

export default apiService;
export { list, get, create, update, remove as delete };