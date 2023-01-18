import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import './styles.css';

import Post from './Post/Post';
import { useParams } from 'react-router-dom';


const Posts = ({ currentUser, profileId, setCurrentId }) => {

    const posts = useSelector((state) =>
         state.posts
    )
    const  currentId  = useParams();
    const [postCount, setPostCount] = useState(4)
    
    const handleDisplayPost = () =>{
       const newPostCount = postCount + 4
       setPostCount(newPostCount)
    }

    //  console.log(currentUser)
    // const test = posts.filter(post => post.creator === profileId);
    // console.log(test)
    // console.log(currentId.id);
    // console.log(profileId)
    // console.log(currentId)
    
  return (
     profileId === currentId.id && currentId.id !== undefined 
     
    ? 

     !posts.length ? <CircularProgress /> : (
      <Box display="flex" flexDirection="column"  gap={2}>
       {posts.filter(post => post.creator === profileId).map((post) => ( 
        <div key={post._id}>
         <Post  currentUser={currentUser} setCurrentId={setCurrentId}  post={post} />
      
        </div>
       )).reverse().splice(0,postCount)}
       <Button onClick={handleDisplayPost}>Load more</Button>
      </Box>
     )

    :

     !posts.length ? <CircularProgress /> : (
      <Box display="flex" flexDirection="column" gap={2}>
       {posts.map((post) =>(
        <div key={post._id}>
         <Post  currentUser={currentUser} setCurrentId={setCurrentId}  post={post} />
        </div>
        )).reverse().splice(0,postCount)}
        {postCount < posts?.length && (
          posts?.length > 4 && (
            <Button onClick={handleDisplayPost}>Load more</Button>
          )
        )}
      
      </Box>
    )
    
  ) 
  
}

export default Posts