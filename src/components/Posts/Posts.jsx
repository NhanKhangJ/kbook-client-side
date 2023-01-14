import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import './styles.css';

import Post from './Post/Post';
import { useParams } from 'react-router-dom';


const Posts = ({posts, currentUser, profileId, setCurrentId }) => {

    // const posts = useSelector((state) =>
    //      state.posts
    // )


    const currentId = useParams();

    //  console.log(currentUser)
    // const test = posts.filter(post => post.creator === profileId);
    // console.log(test)
    // console.log(currentId.id);
    // console.log(profileId)
    
  return (
     profileId === currentId.id && currentId.id !== undefined ?
     !posts.length ? <CircularProgress /> : (

      <Box>
      {posts.filter(post => post.creator === profileId).map((post) => ( 
       <Post currentUser={currentUser} setCurrentId={setCurrentId} key={post._id} post={post} />
     ))}
   </Box>
     )


   : !posts.length ? <CircularProgress /> : (
    <Box>
       {posts.map((post) =>(
        <Post currentUser={currentUser} setCurrentId={setCurrentId} key={post._id} post={post} />
      )).reverse()}
    </Box>
    )
    
  
    ) 
  
}

export default Posts