import React,{useState} from 'react';
import { BusinessCenter, Edit, LocationOn, School, WatchLater } from '@mui/icons-material'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'

import FileBase from 'react-file-base64';
import './styles.css'

const Intro = () => {
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar:"",
    cover:"",
    job:"",
    education:"",
    location:""
  })
  
  const handleUserInfo = (e) =>{
    setUserInfo({...userInfo, [e.target.name] : e.target.value})
  }
  // console.log(userInfo)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 
  return (
    <>
    <Card elevation={2}>
      <CardHeader title="Introduction"  />
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <BusinessCenter />
       <Typography>User Jobs</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <School />
       <Typography>User Education</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <LocationOn />
       <Typography>User Location</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <WatchLater />
       <Typography>User Join at</Typography>
      </CardContent>
      <CardActions >
       <Button fullWidth variant='contained' onClick={handleClickOpen}>
       <Edit/>
         Edit Profile
       </Button>
      </CardActions>
     </Card>
     <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth> 
       <DialogTitle>Edit personal profile</DialogTitle>
       <DialogContent sx={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:"center", justifyContent:'space-between'}} >
         <Typography variant='h6'>Avatar</Typography>
  
         <Button component="label" variant='text'>
           <div style={{display:'none'}}>
            <FileBase className="fileInput" type='file' mutiple={false} onDone={({base64}) =>setUserInfo({...userInfo, avatar: base64 })} />
           </div> 
            Edit
         </Button> 
        </div>
        <Avatar src={userInfo.avatar} sx={{ width:150, height:150, border: "10px solid white", alignSelf:'center' }} />
       </DialogContent>
       <DialogContent sx={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:"center", justifyContent:'space-between'}} >
        <Typography variant='h6'>Profile Cover</Typography>
           
        <Button component="label" variant='text'>
        <div style={{display:'none'}}>
         <FileBase className="fileInput" type='file' mutiple={false} onDone={({base64}) =>setUserInfo({...userInfo, cover: base64 })} />
        </div> 
        Edit
        </Button> 
        </div> 
        <div style={{display:'flex', justifyContent:'center', padding:"1rem 4rem"}}>
       {userInfo.cover ? (
        <CardMedia
         style={{borderRadius:'10px', width:'80%'}}
        component="img" 
        image={userInfo.cover} 
      /> 
      ) : (
       <CardMedia
         style={{borderRadius:'10px', width:'80%'}}
        component="img" 
        image={"https://www.namepros.com/attachments/empty-png.89209/"} 
      /> 
        )}
        </div>
       </DialogContent>
       <div>
        <Typography variant='h6' paddingRight={3} paddingLeft={3}>Introduction</Typography>
        <DialogContent sx={{display:'flex', alignItems:'end', alignContent:'center', paddingTop:'0'}} >
       <BusinessCenter />
       <TextField
            autoFocus
            style={{margin:'0 1rem 0 1rem'}}
            name="job"
            label="Job"
            type="text"
            value={userInfo.job}
            fullWidth
            variant="standard"
            onChange={handleUserInfo}
          />
      </DialogContent>
      <DialogContent sx={{display:'flex', alignItems:'end', alignContent:'center'}} >
      <School />
      <TextField
            autoFocus
            style={{margin:'0 1rem 0 1rem'}}
            name="education"
            label="Education"
            type="text"
            value={userInfo.education}
            fullWidth
            variant="standard"
            onChange={handleUserInfo}
          />
      </DialogContent>
      <DialogContent sx={{display:'flex', alignItems:'end', alignContent:'center'}} >
      <LocationOn />
      <TextField
            autoFocus
            style={{margin:'0 1rem 0 1rem'}}
            name="location"
            label="Location"
            type="email"
            value={userInfo.location}
            fullWidth
            variant="standard"
            onChange={handleUserInfo}
          />
      </DialogContent>
      </div>
      <DialogActions style={{paddingRight:'1.5rem'}} >
        <Button variant='text' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleClose}>Save</Button>
      </DialogActions>
     </Dialog>
    </>
  )
}

export default Intro