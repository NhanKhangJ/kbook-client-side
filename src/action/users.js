import * as api from '../api/index.js';
import { FETCH_USER } from '../constants/actionTypes.js';

export const getUser = (id) => async(dispatch) =>{
    try {
        const {data} = await api.fetchUser(id);
        dispatch({type: FETCH_USER, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}