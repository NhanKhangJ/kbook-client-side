import {AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state={authData:null}, action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action.data})) //set the profile of user at the local storage 
            // receive the action object from the dispatch and save it in to the local storage
            return { ...state, authData: action.data}
        case LOGOUT:    
            localStorage.clear() // clear local storage to have no user so other component can base on that to render 
            return { ...state, authData: null}
        default:
            return state
    }
}
export default authReducer
