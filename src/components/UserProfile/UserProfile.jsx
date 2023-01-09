
import { Avatar,Container, Typography, CardActionArea, Menu, MenuItem, Paper, Grow, Stack, Box } from '@mui/material';
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
    const {id} = useParams()
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {users, user} = useSelector((state) => state.users);
  useEffect(()=>{
    dispatch(getPosts())
  },[currentId, dispatch])  
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleEditUser = () => {
    setAnchorElUser(null);
  
  };
const handleDelete = () =>{
    setAnchorElUser(null);

}

  useEffect(()=>{
    dispatch(getUser(id))
  },[dispatch, id])


  return (
    <>
   {!user  ? (<div>Please login</div>): (
    <>
    <Navbar />
  
      <Container component={Grow} in sx={{mt: 8, maxWidth:{xs:'xl', sm: 'xl', md:'xl', xl:'xl'}, padding:{xs:'0', sm:'0', md:'0', xl:'auto'}} }>
        <Paper style={{height:'40vh'}}>
         <div style={{backgroundImage: 'url(https://static01.nyt.com/images/2022/10/25/arts/25avatar-interviews1/25avatar-interviews1-videoSixteenByNineJumbo1600-v2.jpg)', backgroundSize: "cover",backgroundColor: 'bisque', height: '60%'}} >
           Profile cover
         </div>
         <div style={{display:'flex', justifyContent:'center', alignItems:'center' ,flexDirection:'column', height:'35%', position:'relative', top:'-50px'}}>
           <div >
           <Avatar  onClick={handleOpenUserMenu}  component={CardActionArea} alt={user.name} src="https://variety.com/wp-content/uploads/2022/02/Screen-Shot-2022-05-09-at-10.04.13-AM.png" sx={{ width:200, height:200, border: "10px solid white" }} />
           </div >
           <Typography variant="h3">{user.name}</Typography>
           <Menu  
              sx={{ mt: '0'}}
              anchorEl={anchorElUser}
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'right',
              // }}
              keepMounted
              // transformOrigin={{
              //   vertical: 'top',
              //   horizontal: 'right',
              // }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > 
              <MenuItem sx={{width:200}}  onClick={handleEditUser} >
                  <Typography  textAlign="center">Upload Images</Typography>
                </MenuItem>
                <MenuItem  onClick={handleDelete}>
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
            </Menu>
         </div>
         </Paper>
      </Container>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{margin:{lg: '1.5rem', xl: '1.5rem' }}}>
         <Box flex={4} >
           <Intro />
         </Box>
         <Box flex={6} p={2}>
         <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Posts  setCurrentId={setCurrentId} />
         </Box>
      </Stack>

    </>
    )}
   </>
  )
}

export default UserProfile