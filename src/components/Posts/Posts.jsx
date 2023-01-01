import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import './styles.css';
import { useDispatch } from 'react-redux';
import Post from './Post/Post';
const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) =>
         state.posts
    )
  //  console.log(posts)
  return (
    !posts.length ? <CircularProgress /> : (
    <Box>
       {posts.map((post) =>(
        <Post setCurrentId={setCurrentId} key={post._id} post={post} />
      )).reverse()}
    </Box>
    )
  )
}

export default Posts