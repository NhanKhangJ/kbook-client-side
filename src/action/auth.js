import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes'

export const signin= (formData, navigate, setDisabled, setShowSignInError) => async(dispatch) =>{
    const signinFail = async(message) =>{
        setDisabled(false)
        await setShowSignInError(message)
        setTimeout(()=>{setShowSignInError("")}, 4000)
    }
    try {
        const { data } = await api.signIn(formData);
        dispatch({type:AUTH, data})
        navigate('/posts')
    } catch(error) {
        signinFail(error.response.data.message)  
    }
    
}

export const signup= (formData, navigate, setDisabled, setShowSignUpError) => async(dispatch) =>{
    const signupFail = async(message) =>{
        setDisabled(false)
        await setShowSignUpError(message)
        setTimeout(()=>{setShowSignUpError("")}, 4000)
      }
    try {
        const {data} = await api.signUp(formData);
        await dispatch({type:AUTH, data})
        navigate('/posts')
    } catch (error) {
        signupFail(error.response.data.message)
    }
}