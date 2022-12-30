import * as api from '../api';
import { FETCH_ALL,CREATE } from '../constants/actionTypes';

export const getPost = () => async(dispatch) =>{
    try {
        const {data} = await api.fetchPosts();
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const createPost = (post) => async(dispatch) =>{
    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}