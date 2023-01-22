import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from './Post/Post';



const Posts = ({ profileId, setCurrentId }) => {
   
    const posts = useSelector((state) =>
         state.posts
    )
    const  currentId  = useParams();
    const [postCount, setPostCount] = useState(4)
    
    const handleDisplayPost = () =>{
       const newPostCount = postCount + 4
       setPostCount(newPostCount)
    }
    
  return (
     profileId === currentId.id && currentId.id !== undefined 
     
    ? 

     !posts.length ? <CircularProgress /> : (
      <Box display="flex" flexDirection="column"  gap={2}>
       {posts.filter(post => post.creator === profileId).map((post) => ( 
        <div key={post._id}>
         <Post  setCurrentId={setCurrentId}  post={post} />
      
        </div>
       )).reverse().splice(0,postCount)}
       {postCount < posts.filter(post => post.creator === profileId).length && 
          posts.length > 4 && (
            <Button onClick={handleDisplayPost}>Load more</Button>
          )
        }
      </Box>
     )

    :

     !posts.length ? 
     <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
     <CircularProgress size="5rem" />
     </div>
      : (
      <Box display="flex" flexDirection="column" gap={2}>
       {posts.map((post) =>(
        <div key={post._id}>
         <Post  setCurrentId={setCurrentId}  post={post} />
        </div>
        )).reverse().splice(0,postCount)}
        {postCount < posts.length && 
          posts.length > 4 && (
            <Button onClick={handleDisplayPost}>Load more</Button>
          )
        }
      
      </Box>
    )
    
  ) 
  
}

export default Posts