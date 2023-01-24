import React, { useEffect, useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Box } from '@mui/material'
// import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';
import StartNavbar from './components/Navbar/StartNavbar';



function App() {
  
  
  const [mode, setMode] =useState("light");



  const darkTheme= createTheme({
      palette:{
          mode: mode
      }
  })


  const [user, setUser ]= useState(null)
  const location = useLocation();

  useEffect(() =>{
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])

  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={mode !== "light" ? "background.default" : ""} color="text.primary" justifyContent="center" display="flex" >
     {user === null ? <StartNavbar mode={mode} setMode={setMode}/> : <Navbar bgcolor={"background.default"} color="text.primary" mode={mode} setMode={setMode}/> }
    <Routes>
      <Route path='/' element={ user?.result?._id? <Navigate to="/posts"/> : <Navigate to="/auth" replace /> }  />
      <Route path='/posts' element={ user?.result?._id === undefined ? <Navigate to="/auth" replace /> : <Home />    } />
      <Route path='/auth' element={ user?.result?._id === undefined ? <Auth /> : <Navigate to="/posts" replace />    } /> 
      <Route path='/user/:id' element={<UserProfile />} />
    </Routes>
    </Box>
    </ThemeProvider>
  );
}

export default App;
