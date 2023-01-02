import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar,  Tooltip, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import './navBarStyles.css'
import * as actionType from '../../constants/actionTypes';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logOut =() =>{
      dispatch({
        type: actionType.LOGOUT
      })
      navigate('/auth')

      setUser(null)
    }
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
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography component='button' onClick={logOut}  textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Navbar