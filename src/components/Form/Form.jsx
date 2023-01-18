import React,{useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Paper, TextField, Typography ,Link, Tooltip, Fab} from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector} from 'react-redux';
import FileBase from 'react-file-base64'
import {MuiChipsInput} from 'mui-chips-input';
import {createPost, updatePost} from '../../action/posts';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

import './formStyles.css'
import { Add } from '@mui/icons-material';

const Form = ({currentUser, currentId, setCurrentId}) => {


const [postData, setPostData] = useState({
    content:"",
    tags:[],
    selectedFile:""
});
const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId): null));

const dispatch = useDispatch();
const user = JSON.parse(localStorage.getItem('profile'))

const [open, setOpen] = useState(false);
const [showImage, setShowImage] = useState(false)

useEffect(() =>{
  setShowImage(true)
},[postData.selectedFile])


useEffect(()=>{
 if(post){
  setPostData(post);
}
},[post])

useEffect(() =>{
  if(currentId){
    setOpen(true)
  }
},[currentId])


// console.log(postData)

const handleSubmit = async (e) =>{
    e.preventDefault()
    if(currentId === 0) {
      await dispatch(createPost({...postData, name: user?.result?.name }));
    
      console.log('create')
    } else{
     await dispatch(updatePost(currentId,{...postData, name: user?.result?.name}));
   
     console.log('update')
    }
    setCurrentId(0)
}



const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
};

const handleClickOpen = () => {
  setCurrentId(0);
    setPostData({
    content:"",
    tags: [],
    selectedFile:""
})
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setCurrentId(0);
};

// console.log(currentUser)

  return (
   <>
    <Paper sx={{mb:{xs: 0, sm: 0, md: 2, lg: 2, xl: 2}}}>
     
    <Tooltip title="Add" sx={{position:"fixed", bottom:20, right:{xs: "calc(5%)", md: 30},display:{xs:'block', sm:'block', md:'none', lg:'none',xl:'none'}}}>
   <Fab onClick={handleClickOpen} color='primary' aria-label="add">
      <Add />
   </Fab>
   </Tooltip> 
       <Box display="flex" justifyContent="center" sx={{p:2, display:{xs:'none', sm:'none' ,md:'flex', lg:'flex', xl:'flex'}}}>
        <div className='avatar'>
         <Link href={`/user/${currentUser?._id}`} underline="none">
          <Avatar sx={{width:'3.5rem', height:'3.5rem'}}  src={currentUser?.avatar}>{currentUser?.name?.split(" ")[0].substring(0,1)}{currentUser?.name?.split(" ")[1].substring(0,1)}</Avatar>
          </Link>
        </div>
        <Button fullWidth onClick={handleClickOpen} variant="outlined" style={{borderRadius:'35px', display:'flex', justifyContent:'start', color:'GrayText'}}>
            Start a post
        </Button>
       </Box>
   
       <Dialog open={open} fullWidth>
        <DialogTitle>{currentId ? "Edit a post" : "Create a Post"}</DialogTitle>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" >
          <div className='avatar'>
            <Avatar sx={{width:'4rem', height:'4rem'}} alt={user?.result?.name}  src={currentUser?.avatar ? currentUser?.avatar : "/static/images/avatar/2.jpg" } />
           </div>
           <div>
            <Typography variant='h6'>{user?.result?.name}</Typography>
           </div>
          </Box>
          <TextField
            margin="dense"
            name='content'
            value={postData.content}
            label="What do you want to talk about?"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={6}
            onChange={(e)=>{ setPostData({ ...postData, content: e.target.value })}}
          />
            {showImage ?( <img width="100%" style={{objectFit:'cover'}} src={postData.selectedFile} alt=''/>) :null }
          <MuiChipsInput 
              name="tags"
            label="Tags"
            fullWidth
            variant='standard'
            value={postData.tags}
            onAddChip={(chip) => handleAddChip(chip)}
            onDeleteChip={(chip) => handleDeleteChip(chip)}
          />
          <Button component="label" variant='contained' color='primary'>
           <div style={{display:'none'}}>
            <FileBase className="fileInput" type='file' mutiple={false} onDone={({base64}) =>setPostData({...postData, selectedFile: base64 })}/>
           </div>
           <ImageSearchIcon />
           </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={() => setOpen(false)}>{currentId ? "Update" : "Post"}</Button>
        </DialogActions>
        </form>
      </Dialog>
    </Paper>
   </>
  )
}

export default Form