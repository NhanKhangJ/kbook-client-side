
import { AppBar, Container } from '@mui/material'
import React from 'react'
import MaterialUISwitch from './Switch'

const StartNavbar = ({mode, setMode}) => {
  return (
    <AppBar position="fixed" elevation={0} style={{backgroundColor:'transparent'}}>
       <Container maxWidth="xl" style={{display:'flex', justifyContent:'flex-end', marginTop:'10px'}} > 
         <MaterialUISwitch onChange={() =>setMode(mode === "light" ? "dark" : "light" )} />
       </Container>
    </AppBar>
  )
}

export default StartNavbar