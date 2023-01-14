import React,{useEffect, useState} from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../action/posts';
import Posts from '../Posts/Posts';
import Navbar from '../Navbar/Navbar';
import { getUser } from '../../action/users';
import ProfileCard from '../ProfileCard/ProfileCard';
import Sponsor from '../Sponsor/Sponsor';
const Home = () => {;
  const [currentId, setCurrentId] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const {users, user} = useSelector((state) => state.users); // eslint-disable-line
  const dispatch = useDispatch();
  const posts = useSelector((state) =>
  state.posts
)
 useEffect(()=>{
   dispatch(getPosts())
 },[currentId, dispatch])  

 useEffect(()=>{
  dispatch(getUser(currentUser?.result?._id))
 },[dispatch]) // eslint-disable-line
// eslint-disable-line

  return (
    <> 
       <Navbar />
       <Grow in sx={{m: {md: 10, lg: 10, xl: 10}, mt:{xs: 10} }}>
           <Stack direction="row" spacing={2} justifyContent="space-between" style={{gap:"2rem"}} sx={{margin:{lg: '0 2rem', xl: '0 2rem'}}}>
          <Box flex={2} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }} >
           <ProfileCard currentUser={user} />
          </Box>
           <Box flex={5}  style={{marginLeft:'0'}}>
            <Form currentUser={user} currentId={currentId} setCurrentId={setCurrentId} />
            <Posts posts={posts} currentUser={user} setCurrentId={setCurrentId} />
           </Box>
          <Box flex={3} style={{marginLeft:'0'}} sx={{ display: { xs: 'none', md: 'none', lg: 'block', xl: 'block' } }}>
           <Sponsor /> 
          </Box>
           </Stack> 
        </Grow>    
    </>
  )
}

export default Home


//p is padding