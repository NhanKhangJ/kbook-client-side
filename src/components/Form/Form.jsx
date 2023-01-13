import React,{useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Paper, TextField, Typography} from '@mui/material';
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
    <Paper>
  
       <Box display="flex" justifyContent="center" sx={{p:2}}>
        <div className='avatar'>
         <Link to={`/user/${currentUser?._id}`}>
          <Avatar sx={{width:'3.5rem', height:'3.5rem'}} alt={user?.result?.name}  src={currentUser?.avatar ? currentUser?.avatar : "/static/images/avatar/2.jpg" }   />
          </Link>
        </div>
        <Button fullWidth onClick={handleClickOpen} variant="outlined" style={{borderRadius:'35px', display:'flex', justifyContent:'start', color:'GrayText'}}>
            Start a post
        </Button>
       </Box>
   
       <Dialog open={open} fullWidth>
        <DialogTitle>Create a Post</DialogTitle>
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
            {showImage ?( <img width="100%" src={postData.selectedFile} alt=''/>) :null }
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
          <Button type='submit' variant='contained' onClick={() => setOpen(false)}>Post</Button>
        </DialogActions>
        </form>
      </Dialog>
    </Paper>
   </>
  )
}

export default Form