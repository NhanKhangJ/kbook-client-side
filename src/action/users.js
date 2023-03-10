import * as api from '../api/index.js';
import { FETCH_USER, FETCH_USERS, UPDATE, FETCH_LOCAL_USER } from '../constants/actionTypes.js';

export const getUsers = () => async(dispatch) =>{
    try {
        const {data} = await api.fetchUsers();
        dispatch({type: FETCH_USERS, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const getUser = (id) => async(dispatch) =>{
    try {
        const {data} = await api.fetchUser(id);
        
        dispatch({type: FETCH_USER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const getLocalUser = (id) => async(dispatch) =>{
    try {
        const {data} = await api.fetchUser(id);
        // console.log(data)
        dispatch({type: FETCH_LOCAL_USER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUser = (id, updatedUser) => async (dispatch) =>{
    try {
        const {data} = await api.updateUser(id, updatedUser)
        
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}