import React,{ useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate}  from "react-router-dom";
import { Button, Paper, Grid, Typography, Container, CircularProgress } from '@mui/material';
import Input from './Input';
import {signin, signup} from '../../action/auth'
import CopyRight from '../CopyRight/CopyRight';



const Auth = () => {

  const [isSignup, setIsSignUp] = useState(false);  
  const [showPassword, setShowPassword] =useState(false);
  const initialState ={firstName: '', lastName:'', email:'', password: '', confirmPassword:''}
  const [formData, setFormData] = useState(initialState);
  const [disabled, setdisabled] = useState(false);
  const [showError, setShowError] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleShowPassword = () =>{
    setShowPassword((preShowPassword) => !preShowPassword)
  }
 
 
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = () =>{
    setFormData(initialState);
    setIsSignUp((preIsSignUp) =>!preIsSignUp);
    setShowPassword(false);
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
      setdisabled(true)
       setTimeout(()=>{
        setdisabled(false)
        setShowError(false)
       },4000)
       setTimeout(()=>{
        setShowError(true)
       }, 10000)
    if(isSignup){ 
       dispatch(signup(formData, navigate))
    }else {
       dispatch(signin(formData, navigate))
    }
  }

  return (
    <>
      <Container maxWidth={false} disableGutters component="main" sx={{ display:"flex", justifyContent:"space-evenly", alignItems:"center", height:"80vh", flexDirection:{xs: 'column', lg:'row', xl:'row'} }}>
        <Grid display="flex" justifyContent="center" alignItems="center" sx={{maxWidth:"25%"}}>
          <Grid item>
             <Typography variant='h1' textTransform="uppercase" color="primary" >Kbook</Typography>
             <Typography fontWeight="bold" variant='h5'>Connect with your friend and the world around you on KBook</Typography>
          </Grid>
        </Grid>
        <Paper elevation={1} sx={{ maxWidth:{xs:"80%", lg:"30%", xl:"30%", display:'flex', alignItems:'center', padding:'2rem' } } }>
          <form  onSubmit={handleSubmit}>
             <Grid container spacing={2}>
               {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} disabled={disabled} autoFocus half />
                  <Input name="lastName"  label="Last Name" handleChange={handleChange} disabled={disabled} half />
                </>
                
               )}
               <Input name="email" value={formData.email} label="Email Address" handleChange={handleChange} disabled={disabled} type="email"/>
               <Input name="password" value={formData.password} label="Password" handleChange={handleChange} disabled={disabled} type={showPassword ? 'text' : 'password'} handleShowPassword=
            {handleShowPassword}/>
               {isSignup && <Input name="confirmPassword" label="Repeat Password" type={showPassword ? 'text' : 'password'} disabled={disabled} handleChange={handleChange} handleShowPassword=
            {handleShowPassword}/>}
             </Grid>
             {disabled ? 
              <Button sx={{mt:2}} type="submit" fullWidth variant="contained" color="primary">
                <CircularProgress color='inherit' sx={{opacity:'50%'}}/>
              </Button>
             : ( 
              <>
             <Button sx={{mt:2}} type="submit" fullWidth variant="contained" color="primary">
              {isSignup ? 'Sign Up' : 'Sign in'}
             </Button>
             <Grid container justifyContent="flex-end" >
             <Button onClick={switchMode}>
                   {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
             </Button>
             </Grid>
             {showError ? "" : <Typography color="darkorange">error: email or password is not correct!</Typography>}                
             </> 
             )}
             
          </form>
        </Paper>

       </Container> 
       <Container maxWidth="sm" sx={{display:'flex', alignItems:'center', justifyContent:'center' ,height:'20vh'}}>
        <CopyRight />
       </Container>
    </>
  )
}

export default Auth

// email, password, confirmPassword, firstName, lastName