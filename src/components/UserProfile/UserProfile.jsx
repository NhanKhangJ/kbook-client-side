
import { Avatar,Container, Typography, Paper, Stack, Box,Grow } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../action/users';
import { getPosts } from '../../action/posts';
import Navbar from '../Navbar/Navbar';
import Intro from './Introduction/Intro';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

const UserProfile = () => {
  const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();
    const {id} = useParams();
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const {users, user} = useSelector((state) => state.users);
  
  
  useEffect(()=>{
    dispatch(getPosts())
  },[currentId, dispatch])  

  // console.log(user._id)
  // console.log(id)

  useEffect(()=>{
    dispatch(getUser(id))
  },[dispatch, id])

  // console.log(currentUser?.result?._id)

  return (
    <>
      
   {!user  ? (<div>Please login</div>): (
    <>
    <Navbar />
      <Container component={Grow} in sx={{mt: 8, maxWidth:{xs:'xl', sm: 'xl', md:'xl', xl:'xl'}, padding:{xs:'0', sm:'0', md:'0', xl:'auto'}} }>
        <Paper style={{height:'550px'}}>
         <div style={{backgroundImage: 'url(https://static01.nyt.com/images/2022/10/25/arts/25avatar-interviews1/25avatar-interviews1-videoSixteenByNineJumbo1600-v2.jpg)', backgroundSize:"cover",backgroundColor: 'bisque', height: '60%'}} >
           Profile cover
         </div>
         <div style={{display:'flex', justifyContent:'center', alignItems:'center' ,flexDirection:'column', height:'35%', position:'relative', top:'-50px'}}>
           <div >
           <Avatar alt={user.name} src="https://variety.com/wp-content/uploads/2022/02/Screen-Shot-2022-05-09-at-10.04.13-AM.png" sx={{ width:200, height:200, border: "10px solid white" }} />
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
           <Intro />
         </Box>
         <Box flex={6} p={2} style={{margin: '0px'}} >
           {currentUser?.result?._id === id && (
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