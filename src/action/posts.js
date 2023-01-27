import * as api from '../api';
import { FETCH_ALL,CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_MORE } from '../constants/actionTypes';

export const getPosts = (time) => async(dispatch) =>{
    try {
        const {data} = await api.fetchPosts(time);
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error);
    }
}


export const getPostsByCreator = (userId, time) => async(dispatch) =>{
    try {
        const {data} = await api.fetchPostsByCreator(userId,time);
        dispatch({type: FETCH_MORE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const getMorePosts= (time) => async(dispatch) =>{
    try {
        const {data} = await api.fetchPosts(time)
        dispatch({type: FETCH_MORE, payload: data})
    } catch (error) {
        console.log(error);
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

export const updatePost = (id, post) => async(dispatch) =>{
    try {
        // console.log(id)
        const {data} = await api.updatePost(id, post);
        console.log(data)
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
export const likePost = (id) => async (dispatch) =>{
    try {
      const {data} = await api.likePost(id);
      dispatch({type: LIKE, payload: data})
    } catch (error) {
      console.log(error)
    }
  }

export const commentPost = (value, id) => async(dispatch) =>{
    try {
        const {data} = await api.commentPost(value,id);
        dispatch({type: COMMENT, payload: data})
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}


export const deletePost = (id) => async(dispatch) =>{
    try {
        const {data} = await api.deletePost(id);
        dispatch({type: DELETE, payload: data})
    } catch (error) {
        console.log(error)
    }
}