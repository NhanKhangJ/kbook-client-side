import React,{ useState} from 'react';
import { Button, Paper, Grid, Typography, Container } from '@mui/material';
import Input from './Input';
import './styles.css'

const initialState ={firstName: '', lastName:'', email:'', password: '', confirmPassword:''}

const Auth = () => {
  const [isSignup, setIsSignUp] = useState(false);  
  const [showPassword, setShowPassword] =useState(false);
  const [formData, setFormData] = useState(initialState);


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

  return (
    <>
       <Container maxWidth={false} disableGutters component="main" sx={{ display:"flex", justifyContent:"space-evenly", alignItems:"center", height:"70vh", flexDirection:{xs: 'column', lg:'row', xl:'row'} }}>
        <Grid display="flex" justifyContent="center" alignItems="center" sx={{maxWidth:"25%"}}>
          <Grid item>
             <Typography variant='h1' textTransform="uppercase" color="primary" >Kbook</Typography>
             <Typography fontWeight="bold" variant='h5'>Connect with your friend and the world around you on KBook</Typography>
          </Grid>
        </Grid>
        <Paper className='paper' elevation={1} sx={{ maxWidth:{xs:"80%", lg:"30%", xl:"30%" } } }>
          <form className='form' onSubmit={() => {}}>
             <Grid container spacing={2}>
               {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName"  label="Last Name" handleChange={handleChange} half />
                </>
               )}
               <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
               <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword=
            {handleShowPassword}/>
               {isSignup && <Input name="confirmPassword" label="Repeat Password" type="password"  handleChange={handleChange}/>}
             </Grid>
             <Button sx={{mt:2}} type="submit" fullWidth variant="contained" color="primary">
              {isSignup ? 'Sign Up' : 'Sign in'}
             </Button>
             <Grid container justifyContent="flex-end" >
             <Button onClick={switchMode}>
                   {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
             </Button>
             </Grid>
          </form>
        </Paper>
       </Container> 
    </>
  )
}

export default Auth