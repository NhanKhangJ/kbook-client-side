import React,{ useState } from 'react';
import { BusinessCenter, LocationOn, School} from '@mui/icons-material'
import { Avatar, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../../action/users';
import { getPostsByCreator } from '../../../action/posts';
import { REMOVE } from '../../../constants/actionTypes';



const ProfileForm = ({user, openDialog, setOpenDialog}) => {
  const [userInfo, setUserInfo] = useState({
     avatar: user.avatar,
      cover: user.cover,
      job: user.job,
      education: user.education,
      location: user.location
  })
  const dispatch = useDispatch();

  const handleUserInfo = (e) =>{
    setUserInfo({...userInfo, [e.target.name] : e.target.value})
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setOpenDialog(false)
     try {
      await dispatch(updateUser(user._id, userInfo))
      await dispatch(getUser(user?._id))
      await dispatch({type: REMOVE})
      await dispatch(getPostsByCreator(user?._id, 1))
     } catch (error) {
      console.log(error)
     }
  }

  const handleClose = () => {
    setOpenDialog(false)
  }; 
  return (
  <Dialog open={openDialog} onClose={handleClose} maxWidth='md' fullWidth> 
    <DialogTitle>Edit personal profile</DialogTitle>
      <form onSubmit={handleSubmit}>
       <DialogContent sx={{display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', alignItems:"center", justifyContent:'space-between'}} >
         <Typography variant='h6'>Avatar</Typography>
  
         <Button component="label" variant='text'>
           <div style={{display:'none'}}>
            <FileBase type='file' mutiple={false} onDone={({base64}) =>setUserInfo({...userInfo, avatar: base64 })} />
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
          <FileBase type='file' mutiple={false} onDone={({base64}) =>setUserInfo({...userInfo, cover: base64 })} />
         </div> 
          Edit
        </Button> 
        </div> 
        <div style={{display:'flex', justifyContent:'center', padding:"1rem 4rem"}}>
       {userInfo.cover 
        ? (
          <CardMedia
           style={{borderRadius:'10px', width:'80%'}}
           component="img" 
           image={userInfo.cover} 
          /> 
        ):(
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
            value={userInfo.job || ""}
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
            value={userInfo.education || ""}
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
            type="text"
            value={userInfo.location || ""}
            fullWidth
            variant="standard"
            onChange={handleUserInfo}
          />
      </DialogContent>
      </div>
       <DialogActions style={{paddingRight:'1.5rem'}} >
        <Button variant='text' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' type='submit' >Save</Button>
      </DialogActions>
      </form>
  </Dialog>
  )
}

export default ProfileForm