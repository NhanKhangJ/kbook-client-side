import React,{useEffect, useState} from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form';
import ProfileCard from '../ProfileCard/ProfileCard';
import Sponsor from '../Sponsor/Sponsor';
import CopyRight from '../CopyRight/CopyRight';
import Posts from '../Posts/Posts';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../action/posts';
import { getUser } from '../../action/users';

const Home = () => {;
  const [currentId, setCurrentId] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const {users, user} = useSelector((state) => state.users); // eslint-disable-line
  const dispatch = useDispatch();
//   const posts = useSelector((state) =>
//   state.posts
// )
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
       <Grow in sx={{m: {md: 10, lg: 10, xl: 10}, mt:{xs: 6, sm: 6, md: 10, lg: 10, xl: 10} }}>
           <Stack direction="row" spacing={2} justifyContent="space-between" style={{gap:"2rem"}} sx={{margin:{lg: '0 2rem', xl: '0 2rem'}}} >
          <Box flex={2} style={{position:'sticky', top:'0'}} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }} >
           <ProfileCard currentUser={user} />
          </Box>
           <Box flex={5}  style={{marginLeft:'0', overflowY:'scroll'}}>
            <Form currentUser={user} currentId={currentId} setCurrentId={setCurrentId} />
            <Posts  currentUser={user} setCurrentId={setCurrentId} />
           </Box>
          <Box flex={3} style={{marginLeft:'0'}} sx={{ display: { xs: 'none', md: 'none', lg: 'block', xl: 'block' } }}>
           <Sponsor /> 
           <CopyRight />
          </Box>
           </Stack> 
        </Grow>    
    </>
  )
}

export default Home


//p is padding