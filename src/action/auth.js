import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes'

export const signin= (formData, navigate) => async(dispatch) =>{
    try {
        const { data } = await api.signIn(formData);
        dispatch({type:AUTH, data})
        navigate('/posts')
    } catch(error) {
        console.log(error.response.status)
        if(error.response.status === 400 || error.response.status || 404){
            alert('Email or password is not correct!!')
        }
    }
    
}

export const signup= (formData, navigate) => async(dispatch) =>{
    try {
        const { data } = await api.signUp(formData);

        dispatch({type:AUTH, data})

        navigate('/posts')
    } catch (error) {
        console.log(error.response.status)
        if(error.response.status === 400){
            alert('email is already exist!')
        }
    }
}