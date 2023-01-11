import React,{useState,useEffect } from 'react';
import { Avatar, Box, Button, Paper, TextField, Typography} from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector} from 'react-redux';
import FileBase from 'react-file-base64'
import {MuiChipsInput} from 'mui-chips-input';
import {createPost, updatePost} from '../../action/posts'

import './formStyles.css'

const Form = ({currentId, setCurrentId}) => {


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


  return (
   <>
    <Paper>
  
       <Box display="flex" justifyContent="center" sx={{p:2}}>
        <div className='avatar'>
          <Avatar alt={user?.result?.name}  src="/static/images/avatar/2.jpg"  sx={{p:1}}/>
        </div>
        <Button fullWidth onClick={handleClickOpen} variant="outlined" style={{borderRadius:'35px'}}>
            Start a post
        </Button>
       </Box>
   
       <Dialog open={open} fullWidth>
        <DialogTitle>Create a Post</DialogTitle>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" >
          <div className='avatar'>
            <Avatar alt={user?.result?.name}  src="/static/images/avatar/2.jpg" sx={{p:1}}/>
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
           <div>
            <FileBase className="fileInput" type='file' mutiple={false} onDone={({base64}) =>setPostData({...postData, selectedFile: base64 })}/>
           </div>
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