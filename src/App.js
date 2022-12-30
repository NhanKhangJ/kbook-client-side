import React from 'react';
import Container from '@mui/material/Container'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';


function App() {
  return (
    <>
    <Container maxWidth="xl">
    <Navbar />
    <Home />
    </Container>
    </>
  );
}

export default App;
