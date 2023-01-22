
import { Avatar,Container, Typography, Paper, Stack, Box,Grow, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../action/users';
import { getPosts } from '../../action/posts';
import Intro from './Introduction/Intro';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import ProfileForm from './ProfileForm/ProfileForm';
import freeBackground from '../../images/freeBackground.jpeg'
import ImagesCollection from '../ImagesCollection/ImagesCollection';
import CopyRight from '../CopyRight/CopyRight';

const UserProfile = () => {
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();
    const {id} = useParams();
    const {users, user, localUser} = useSelector((state) => state.users); // eslint-disable-line
    const [openDialog, setOpenDialog] = useState(false)

  useEffect(()=>{
    dispatch(getPosts())
  },[currentId, dispatch])  

  useEffect(()=>{
    dispatch(getUser(id))
  },[dispatch, id]) 


  return (
    <>
      
   {!user  ? (<CircularProgress />): (
    <>
    {/* <Navbar /> */}
      <Container component={Grow} in sx={{mt: {xs:7, sm:7, md: 8, lg:8, xl:8}, maxWidth:{xs:'xl', sm: 'xl', md:'xl', xl:'xl'}, padding:{xs:'0', sm:'0', md:'0', xl:'auto'}} }>
        <Paper style={{height:'550px'}}>
         <div style={{backgroundImage:  `url(${user.cover || freeBackground})`, backgroundSize:"100% 120%",backgroundColor: 'bisque', height: '60%'}} >
  
         </div>
         <div style={{display:'flex', justifyContent:'center', alignItems:'center' ,flexDirection:'column', height:'35%', position:'relative', top:'-50px'}}>
           <div>
           <Avatar alt={user.name} src={user.avatar} sx={{ width:200, height:200, border: "10px solid white", fontSize:'4rem' }}>{user.name.split(" ")[0].substring(0,1)}{user.name.split(" ")[1].substring(0,1)}</Avatar>
           </div>
           <Typography variant="h3" gutterBottom>{user.name.replace(/\b[a-z]/g, c => c.toUpperCase())}</Typography>
         </div>
         </Paper>
      </Container>
      <Grow in>
       <Stack 
       direction="row"
       spacing={2} 
       justifyContent="space-between"
       sx={{margin:{lg: '0.4rem', xl: '0.4rem'}, flexDirection :{xs: 'column', sm: 'column', lg:'row' ,xl: 'row' } }}
            >
         <Box flex={4} p={2} pb={0} >
           <Intro localUser={localUser} user={user} setOpenDialog={setOpenDialog} />
           <ImagesCollection profileId={id} />
           <CopyRight />
           {localUser?._id === id && (
           <ProfileForm user={localUser} openDialog={openDialog} setOpenDialog={setOpenDialog} />
           )}
       
         </Box>
         <Box flex={6} p={2} style={{margin: '0px', marginTop:'1rem'}}  pt={0} >
           {localUser?._id === id && (
            <Form currentId={currentId} setCurrentId={setCurrentId} />
           )}
            <Posts profileId={id} setCurrentId={setCurrentId} />
         </Box>
      </Stack>
      </Grow>
    </>
    )}
   </>
  )
}

export default UserProfile