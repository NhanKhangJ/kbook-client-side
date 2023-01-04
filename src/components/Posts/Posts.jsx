import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import './styles.css';

import Post from './Post/Post';
const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) =>
         state.posts
    )

  return (
    !posts.length ? <CircularProgress /> : (
    <Box>
       {posts.map((post) =>(
        <Post setCurrentId={setCurrentId} key={post._id} post={post} />
      ))}
    </Box>
    )
  )
}

export default Posts