import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './Post/Post';



const Posts = ({ setCurrentId, handleLoadMore}) => {
    
  const totalPost = useSelector((state) =>(
    state.posts.totalPost
 ))
    const posts = useSelector( (state) =>
          state.posts.posts
    )
    if(totalPost === 0){
      return ""
    }
     

  if(!posts?.length){
    return(
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
      <CircularProgress size="5rem" />
      </div>
    ) 
  }



 
    return (
    
    //  !posts?.length ?
    //  <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
    //  <CircularProgress size="5rem" />
    //  </div>
    //   :
    //   (
      <Box display="flex" flexDirection="column" gap={2}>
      {
         posts?.map((post) =>(
        <div key={post._id}>
         <Post setCurrentId={setCurrentId}  post={post} />
        </div>
        ))}
        { totalPost > posts?.length ? 
          <Button onClick={handleLoadMore}>Load more</Button>
        : ""}
      </Box>
    )
    
  // ) 

}

export default Posts