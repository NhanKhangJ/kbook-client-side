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
 },[dispatch])  

  return (
    <> 
       <Navbar />
       <Grow in sx={{mt: 10}}>
           <Stack direction="row" spacing={2} justifyContent="space-between">
          <Box flex={2} p={2} 	sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Profile </Box>
          <Box flex={4} p={2}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <Posts setCurrentId={setCurrentId} />
          </Box>
          <Box flex={2} p={2} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }}>Advertiser </Box>
           </Stack> 
        </Grow>    
    </>
  )
}

export default Home


//p is padding