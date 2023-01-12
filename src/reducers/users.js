import { FETCH_USER, FETCH_USERS, UPDATE } from "../constants/actionTypes";

const users = (state = {users: []}, action) =>{
    switch(action.type){
        case FETCH_USERS:
            return {...state, users: action.payload}
        case FETCH_USER:
            return {...state, user: action.payload}
        case UPDATE:
            return {...state, users: state.users.map((user)=> user._id === action.payload._id ? action.payload : user)}
        default:
            return state
    }
}

export default users