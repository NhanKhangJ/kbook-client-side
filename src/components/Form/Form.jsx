import React,{useState} from 'react'
import { Avatar, Box, Button, Paper, TextField, Typography} from '@mui/material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch} from 'react-redux';
import FileBase from 'react-file-base64'
import {MuiChipsInput} from 'mui-chips-input';
import {createPost} from '../../action/posts'

import './formStyles.css'
const Form = () => {
const dispatch = useDispatch();
const [postData, setPostData] = useState({
    content:"",
    tags: [],
    selectedFile:""
})
const [open, setOpen] = useState(false);
// const [image, setImage] = useState("");
// const imageRef = useRef(null);

// function useDisplayImage() {
//   const [result, setResult] = useState("");

//   function uploader(e) {
//     const imageFile = e.target.files[0];

//     const reader = new FileReader();
//     reader.addEventListener("load", (e) => {
//       setResult(e.target.result);
//     });

//     reader.readAsDataURL(imageFile);
//   }

//   return { result, uploader };
// }

const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(createPost(postData))
}

const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };



// const { result, uploader } = useDisplayImage();

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  return (
   <>
    <Paper>
  
       <Box display="flex" justifyContent="center" sx={{p:2}}>
        <div className='avatar'>
          <Avatar  src=''  sx={{p:1}}/>
        </div>
        <Button fullWidth onClick={handleClickOpen} variant="outlined" style={{borderRadius:'35px'}}>
            Start a post
        </Button>
       </Box>
   
       <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create a Post</DialogTitle>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" >
          <div className='avatar'>
            <Avatar  src=''  sx={{p:1}}/>
           </div>
           <div>
            <Typography variant='h6'>user Name</Typography>
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
           {/* {result && <img ref={imageRef} src={result} alt="" />} */}
          <MuiChipsInput 
              name="tags"
            label="Tags"
            fullWidth
            variant='standard'
            value={postData.tags}
            onAddChip={(chip) => handleAddChip(chip)}
            onDeleteChip={(chip) => handleDeleteChip(chip)}
          />
            <FileBase type='file' mutiple ={false} onDone={({base64}) =>setPostData({...postData, selectedFile: base64 })} />
           
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' onClick={handleClose}>Post</Button>
        </DialogActions>
        </form>
      </Dialog>
    </Paper>
   </>
  )
}

export default Form