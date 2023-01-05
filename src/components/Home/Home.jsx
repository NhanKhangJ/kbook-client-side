import React,{useEffect, useState} from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../action/posts';
import Posts from '../Posts/Posts';
import Navbar from '../Navbar/Navbar';
const Home = () => {;
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch();

 useEffect(()=>{
   dispatch(getPosts())
 },[currentId, dispatch])  

  return (
    <> 
       <Navbar />
       <Grow in sx={{m: {lg: 10, xl: 10,}, mt:{xs: 10} }}>
           <Stack direction="row" spacing={{}} justifyContent="space-between" sx={{margin:{ lg: '0 2rem', xl: '0 2rem' }}}>
          <Box flex={2} p={2}	sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Profile </Box>
          <Box flex={4} p={2}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <Posts  setCurrentId={setCurrentId} />
          </Box>
          <Box flex={2} p={2} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Advertiser </Box>
           </Stack> 
        </Grow>    
    </>
  )
}

export default Home


//p is padding