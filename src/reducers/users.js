import { FETCH_USER, FETCH_USERS, UPDATE, FETCH_LOCAL_USER } from "../constants/actionTypes";

const users = (state = {users: []}, action) =>{
    switch(action.type){
        case FETCH_USERS:
            return {...state, users: action.payload}
        case FETCH_USER:
            return {...state, user: action.payload}
        case FETCH_LOCAL_USER:
            return {...state, localUser: action.payload}
        case UPDATE:
            return {...state, localUser: action.payload }
        default:
            return state
    }
}

export default users