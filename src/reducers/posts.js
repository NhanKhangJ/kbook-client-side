import { FETCH_ALL,CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_MORE, REMOVE} from "../constants/actionTypes";


 const posts = (state = { posts: [] }, action) =>{
    switch(action.type){
        case FETCH_ALL: //fetch all the document current ly inside the user view
            return {
                ...state,
                posts: action.payload.data,
                totalPost: action.payload.total
            }
        case FETCH_MORE:
            return {
                ...state,
                posts: [...(Array.isArray(state.posts) ? state.posts : []), ...action.payload.data],
                totalPost: action.payload.total
            }
        case CREATE:
            return { 
                ...state, 
                posts: [action.payload.data, ...state.posts],
                totalPost: action.payload.total
            };
        case UPDATE:
            return { ...state, posts: state.posts.map((post)=> (post._id === action.payload._id ? { ...post, ...action.payload } : post))};
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) =>{
                         // Change the post that just received a comment
                    if(post._id=== action.payload._id){
                        return action.payload;
                    }
                             // return all the post normally
                    return post;
               
                })
            }       
        case DELETE:
            return { 
                ...state, 
                posts: state.posts.filter((post) => (post._id !== action.payload.data )),
                totalPost: action.payload.total
                    };    
        case REMOVE:
            return{
                ...state,
                posts : []
            }            
        default:
            return posts
    }
}

export default posts;