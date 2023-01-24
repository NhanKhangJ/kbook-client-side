import React,{useEffect, useState} from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form';
import ProfileCard from '../ProfileCard/ProfileCard';
import Sponsor from '../Sponsor/Sponsor';
import CopyRight from '../CopyRight/CopyRight';
import Posts from '../Posts/Posts';
import { useDispatch} from 'react-redux';
import { getPosts } from '../../action/posts';

const Home = () => {;
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

 useEffect(()=>{
   dispatch(getPosts())
 },[currentId, dispatch])  

  return (
    <> 
        <Grow in  sx={{ p: {md: 0, lg: 10, xl: 10}, pt:{xs: 6, sm: 6, md: 10, lg: 10, xl: 10},}} >
         <Stack direction="row" maxWidth="lg" spacing={2} justifyContent="space-between" style={{gap:"2rem"}} sx={{margin:{lg: '0 2rem', xl: '0 2rem'}}} >
           <Box flex={2} style={{position:'sticky', top:'0'}} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }} >
            <ProfileCard />
           </Box>
           <Box flex={5}  style={{marginLeft:'0', overflowY:'scroll'}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Posts setCurrentId={setCurrentId} />
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