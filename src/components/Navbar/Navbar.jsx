import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useLocation, useNavigate} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar,  Tooltip, MenuItem, Paper, Button, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode'
import {  getLocalUser } from '../../action/users';
import MaterialUISwitch from './Switch';

const Navbar = ({mode, setMode}) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('profile')));
    const localUser = useSelector((state) => state.users.localUser);
    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
  dispatch(getLocalUser(userLogin?.result?._id))
 },[dispatch]) // eslint-disable-line

//  dispatch(getLocalUser(userLogin?.result?._id))
    const logOut =() =>{
      dispatch({
        type: actionType.LOGOUT
      })  
      
      navigate('/auth');
      setUserLogin(null)
    }
    
    const navigateProfile = () =>{
      navigate(`/user/${userLogin.result._id}`)
    } 
    
 
    useEffect(() => {
      const token = userLogin?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
      }
    }, [location]);  // eslint-disable-line
 
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    
    const handleNavigate = ()=>{
      navigate('/posts')
    }
    
    return (
      userLogin ? 
      <AppBar position="fixed" >
        <Container  maxWidth="xl">
          <Toolbar sx={{justifyContent:'space-between'}} disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={Button}
              onClick={handleNavigate}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              KBOOK
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
            <MaterialUISwitch onChange={() =>setMode(mode === "light" ? "dark" : "light" ) } />
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userLogin ? userLogin.result.name : ""} src={localUser?.avatar}  sx={{width:'3rem', height:'3rem'}}>{localUser?.name?.split(" ")[0].substring(0,1).toUpperCase()}{localUser?.name?.split(" ")[1].substring(0,1)}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >   
                 <MenuItem  onClick={handleCloseUserMenu}>
                 {localUser?._id === user?._id ? 
                    <Paper  onClick={navigateProfile}  sx={{display:'flex', width:{xs:'400px', sm:'400px',lg:'400px', xl:'400px'}, justifyContent:'space-between', alignItems:'center', padding:'1rem', cursor:'pointer'}}>
                     <Avatar src={localUser?.avatar}  sx={{width:'3rem', height:'3rem'}}>{localUser?.name?.split(" ")[0].substring(0,1)}{localUser?.name?.split(" ")[1].substring(0,1)}</Avatar>
                     <Typography fontSize="1.2rem" variant='h5' textAlign="center">{localUser?.name?.replace(/\b[a-z]/g, c => c.toUpperCase())}</Typography>
                    </Paper>
                    :
                    <Paper component={Link} href={`/user/${userLogin.result._id}`} underline="none" sx={{display:'flex', width:{xs:'400px', sm:'400px',lg:'400px', xl:'400px'}, justifyContent:'space-between', alignItems:'center', padding:'1rem', cursor:'pointer'}}>
                     <Avatar  src={localUser?.avatar}  sx={{width:'3rem', height:'3rem'}}>{localUser?.name?.split(" ")[0].substring(0,1)}{localUser?.name?.split(" ")[1].substring(0,1)}</Avatar>
                     <Typography fontSize="1.2rem" variant='h5' textAlign="center">{localUser?.name?.replace(/\b[a-z]/g, c => c.toUpperCase())}</Typography>
                    </Paper>
                 }
                  </MenuItem>
                  <MenuItem  onClick={handleCloseUserMenu} sx={{padding:0}}>
                    <Box component={Button} onClick={logOut}  sx={{display:'flex', justifyContent:'start', width:'100%', padding:'6px 1rem'}}>
                    <LogoutIcon />
                    <Typography  fontSize="1.2rem" textAlign="center">&nbsp;Logout</Typography>
                    </Box>

                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    : ""
    );
}

export default Navbar