import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation} from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar,  Tooltip, MenuItem, Paper, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import './navBarStyles.css'
import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode'
import { getUsers } from '../../action/users';


const Navbar = ({openDialog}) => {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem('profile')));
    const {users, user} = useSelector((state) => state.users); // eslint-disable-line
    const  localUser  = users?.filter(user => user._id === userLogin?.result?._id)
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
       if(openDialog === true || openDialog === false){
       
        console.log('slow')
      } else{
        dispatch(getUsers())
      }
     },[dispatch, location])   // eslint-disable-line
   
    //  console.log(localUser)

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
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userLogin ? userLogin.result.name : ""} src={localUser[0]?.avatar}  sx={{width:'3rem', height:'3rem'}}>{localUser[0]?.name?.split(" ")[0].substring(0,1)}{localUser[0]?.name?.split(" ")[1].substring(0,1)}</Avatar>
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
                    <Paper  onClick={navigateProfile}  sx={{display:'flex', width:{xs:'400px', sm:'400px',lg:'400px', xl:'400px'}, justifyContent:'space-between', alignItems:'center', padding:'1rem', cursor:'pointer'}}>
                     <Avatar alt={userLogin ? userLogin.result.name : ""} src={localUser[0]?.avatar}  sx={{width:'3rem', height:'3rem'}} />
                     <Typography fontSize="1.2rem" variant='h5' textAlign="center">{localUser[0]?.name?.replace(/\b[a-z]/g, c => c.toUpperCase())}</Typography>
                    </Paper>
                  </MenuItem>
                  <MenuItem  onClick={handleCloseUserMenu} sx={{padding:0}}>
                    <Box component={Button} onClick={logOut}  sx={{display:'flex', justifyContent:'start', color:'black', width:'100%', padding:'6px 1rem'}}>
                    <LogoutIcon />
                    <Typography  fontSize="1.2rem" textAlign="center">&nbsp;Logout</Typography>
                    </Box>

                  </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar