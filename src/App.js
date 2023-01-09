import React, { useEffect, useState } from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Container from '@mui/material/Container'
// import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  
  const [user, setUser ]= useState(null)
  const location = useLocation();
  //  JSON.parse(localStorage.getItem('profile'))
  
  // console.log(location)
  useEffect(() =>{
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
   
  // console.log(user?.result?._id)
  return (
    <Container style={{padding: 0}} maxWidth="xl">
    <Routes>
      <Route path='/' element={ user?.result?._id? <Navigate to="/posts"/> : <Navigate to="/auth" replace /> }  />
      <Route path='/posts' element={ user?.result?._id === undefined ? <Navigate to="/auth" replace /> : <Home />    } />
      <Route path='/auth' element={ user?.result?._id === undefined ? <Auth /> : <Navigate to="/posts" replace />    } /> 
      <Route path='/user/:id' element={<UserProfile />} />
    </Routes>
    </Container>
  );
}

export default App;
