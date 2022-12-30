import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:4000'});

export const fetchPosts= () => API.get('/posts');
export const createPost= (newPost) => API.post('/posts', newPost)