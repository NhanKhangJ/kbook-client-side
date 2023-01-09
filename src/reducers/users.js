import { FETCH_USER, FETCH_ALL } from "../constants/actionTypes";

const users = (state = {users: []}, action) =>{
    switch(action.type){
        case FETCH_ALL:
            return {...state, users: action.payload}
        case FETCH_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}

export default users