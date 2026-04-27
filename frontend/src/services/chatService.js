import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

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
    console.error('Status code:', error.response.status);
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

const listChats = () => {
  return apiClient.get('/chats')
    .then(response => response.data)
    .catch(handleError);
};

const getChat = (id) => {
  return apiClient.get(`/chats/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const createChat = (chatData) => {
  return apiClient.post('/chats', chatData)
    .then(response => response.data)
    .catch(handleError);
};

const updateChat = (id, chatData) => {
  return apiClient.put(`/chats/${id}`, chatData)
    .then(response => response.data)
    .catch(handleError);
};

const deleteChat = (id) => {
  return apiClient.delete(`/chats/${id}`)
    .then(response => response.data)
    .catch(handleError);
};

const chatService = {
  listChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
};

export default chatService;
export {
  listChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
};