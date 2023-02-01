import React,{useEffect, useState} from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form';
import ProfileCard from '../ProfileCard/ProfileCard';
import Sponsor from '../Sponsor/Sponsor';
import CopyRight from '../CopyRight/CopyRight';
import Posts from '../Posts/Posts';
import { useDispatch} from 'react-redux';
import { getMorePosts } from '../../action/posts';
import { REMOVE } from '../../constants/actionTypes';

const Home = () => {;
  const [currentId, setCurrentId] = useState(0);
  const [openEditForm, setOpenEditForm] = useState(false)
  const dispatch = useDispatch();
  const [loadCount, setLoadCount] = useState(1)


  useEffect(()=>{
    dispatch({type: REMOVE})
  },[dispatch])

 useEffect(()=>{
  if(loadCount) dispatch(getMorePosts(loadCount))
 },[ dispatch,loadCount])  
 //If 




 const handleLoadMore = () =>{
  setLoadCount(loadCount+1)
 }

  return (
    <> 
        <Grow in  sx={{ p: {md: 0, lg: 10, xl: 10}, pt:{xs: 6, sm: 6, md: 10, lg: 10, xl: 10},}} >
         <Stack direction="row" maxWidth="xl" spacing={2} justifyContent="space-between" style={{gap:"2rem"}} sx={{margin:{lg: '0 2rem', xl: '0 2rem'}}} >
           <Box flex={2} style={{position:'sticky', top:'0'}} sx={{ display: { xs: 'none', md: 'block', lg: 'block', xl: 'block' } }} >
            <ProfileCard />
           </Box>
           <Box flex={5}  style={{marginLeft:'0', overflowY:'scroll'}}>
            <Form currentId={currentId} setCurrentId={setCurrentId} setOpenEditForm={setOpenEditForm} openEditForm={openEditForm} />
            <Posts setCurrentId={setCurrentId} setOpenEditForm={setOpenEditForm} handleLoadMore={handleLoadMore} />
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