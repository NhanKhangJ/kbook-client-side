
import { Avatar,Container, Typography, Paper, Stack, Box,Grow, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, getUsers } from '../../action/users';
import { getPosts } from '../../action/posts';
import Navbar from '../Navbar/Navbar';
import Intro from './Introduction/Intro';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import ProfileForm from './ProfileForm/ProfileForm';

const UserProfile = () => {
  const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const {users, user} = useSelector((state) => state.users);  
    // const posts = useSelector((state) =>
    //      state.posts
    // )

    const [openDialog, setOpenDialog] = useState(false)
    const localUser = users?.filter(user => user._id === currentUser?.result?._id)

  useEffect(()=>{
    dispatch(getPosts())
  },[currentId, dispatch])  
// console.log(user._id)
  // console.log(id)

  // useEffect(()=>{
  //   dispatch(getUsers())
  //   dispatch(getUser(id))
  // },[dispatch, id, openDialog]) 

  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getUser(id))
  },[dispatch, id]) 
  
  
  // useEffect(()=>{
  //   dispatch(getUsers())
  //   dispatch(getUser(id))
  // },[dispatch, openDialog]) // eslint-disable-line



  // useEffect(()=>{
  //   dispatch(getUser(id))
  // },[])  // eslint-disable-line
  // console.log(localUser[0].avatar)

  return (
    <>
      
   {!user  ? (<CircularProgress />): (
    <>
    <Navbar openDialog={openDialog} />
      <Container component={Grow} in sx={{mt: 8, maxWidth:{xs:'xl', sm: 'xl', md:'xl', xl:'xl'}, padding:{xs:'0', sm:'0', md:'0', xl:'auto'}} }>
        <Paper style={{height:'550px'}}>
         <div style={{backgroundImage:  `url(${user.cover})`, backgroundSize:"100% 120%",backgroundColor: 'bisque', height: '60%'}} >
  
         </div>
         <div style={{display:'flex', justifyContent:'center', alignItems:'center' ,flexDirection:'column', height:'35%', position:'relative', top:'-50px'}}>
           <div>
           <Avatar alt={user.name} src={user.avatar} sx={{ width:200, height:200, border: "10px solid white" }} />
           </div>
           <Typography variant="h3" gutterBottom>{user.name}</Typography>
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
         <Box flex={4} p={2} >
           <Intro currentUser={localUser[0]} user={user} setOpenDialog={setOpenDialog} />
           {currentUser?.result?._id === id && (
           <ProfileForm user={user} openDialog={openDialog} setOpenDialog={setOpenDialog} />
           )}
         </Box>
         <Box flex={6} p={2} style={{margin: '0px'}} >
           {currentUser?.result?._id === id && (
            <Form currentUser={localUser[0]} currentId={currentId} setCurrentId={setCurrentId} />
           )}
            <Posts  currentUser={localUser[0]} profileId={id} setCurrentId={setCurrentId} />
         </Box>
      </Stack>
      </Grow>
    </>
    )}
   </>
  )
}

export default UserProfile