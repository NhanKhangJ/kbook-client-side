import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:4000'});

API.interceptors.request.use((req) =>{ // a function is going to happen for each one of our request
    if(localStorage.getItem('profile')) { //send our token to our backend so it can verify the user
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts= () => API.get('/posts');
export const createPost= (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (value, id) => API.patch(`/posts/${id}/commentPost`, {value})
export const deletePost = (id) => API.delete(`/posts/${id}`);


export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser)



export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
