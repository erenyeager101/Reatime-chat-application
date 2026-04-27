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

const listUsers = () => {
  return apiClient.get('/users')
    .then(response => response.data)
    .catch(handleError);
};

const getUser = (id) => {
  return apiClient.get(`/users/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const createUser = (userData) => {
  return apiClient.post('/users', userData)
    .then(response => response.data)
    .catch(handleError);
};

const updateUser = (id, userData) => {
  return apiClient.put(`/users/${id}`, userData)
    .then(response => response.data)
    .catch(handleError);
};

const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const userService = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userService;
export {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};