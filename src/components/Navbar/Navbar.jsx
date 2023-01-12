import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar,  Tooltip, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import './navBarStyles.css'
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode'
import { getUsers } from '../../action/users';


const Navbar = ({openDialog}) => {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('profile')));
    const {users, user} = useSelector((state) => state.users); // eslint-disable-line
    let  localUser  = users?.filter(user => user._id === userLogin?.result?._id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
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

    useEffect(()=>{
      dispatch(getUsers())
     },[dispatch, openDialog]) // eslint-disable-line
    //  console.log(localUser[0].avatar)

    useEffect(() => {
      const token = userLogin?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
      }
  
      setUserLogin(JSON.parse(localStorage.getItem('profile')));
      // eslint-disable-next-line
    }, [location]);
 
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
      <AppBar position="fixed">
        <Container  maxWidth="xl">
          <Toolbar className='AppBar' disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userLogin ? userLogin.result.name : ""} src={localUser[0]?.avatar} />
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
                    <Typography onClick={navigateProfile}  textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem  onClick={handleCloseUserMenu}>
                    <Typography onClick={logOut} textAlign="center">Logout</Typography>
                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar