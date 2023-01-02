import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@mui/material/Container'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


function App() {
  return (
    
    <Router>
    <Container style={{padding: 0}} maxWidth="xl">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
    </Container>
    </Router>
    
  );
}

export default App;
