import React,{useState,useEffect } from 'react';
import { Avatar, Box, Button, Paper, TextField, Typography ,Link, Tooltip, Fab} from '@mui/material';
import { Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import { Add, Clear, ImageSearch } from '@mui/icons-material';
import { useDispatch, useSelector} from 'react-redux';
import {MuiChipsInput} from 'mui-chips-input';
import {createPost, updatePost} from '../../action/posts';
import { getLocalUser } from '../../action/users';


const Form = ({ currentId, setCurrentId, openEditForm, setOpenEditForm}) => {

const totaPost = useSelector((state) => state.posts.totalPost)
const [postData, setPostData] = useState({
    content:"",
    tags:[],
    selectedFile:""
});
const post = useSelector((state) => (currentId ? state.posts.posts.find((post) => post._id === currentId): null));
const localUser = useSelector((state) => state.users.localUser)
const dispatch = useDispatch();
const [showImage, setShowImage] = useState(false)
const [render, reRender] = useState(true)

useEffect(() =>{
  setShowImage(true)
},[postData.selectedFile])


useEffect(()=>{
 if(post){
  setPostData(post);
}
},[post])

const handleSubmit = async (e) =>{
    e.preventDefault()
    setCurrentId(0)
    setOpenEditForm(false)
    if(currentId === 0) {
      // dispatch({type: REMOVE, payload: {updatedPost: postInReducer?.slice(0, -1), updatedTotal: (totaPostInReducer + 1) } })
      await dispatch(createPost({...postData, name: localUser?.name }, totaPost));
    } else{
      await dispatch(updatePost(currentId,{...postData, name: localUser?.name}));
      await dispatch(getLocalUser(post.creator))
    }
}



const handleChangeFile = (e) =>{
  
  const reader = new FileReader();

  reader.readAsDataURL(e.target.files[0]);
  reader.onload = (e) => {
    setPostData({ ...postData, selectedFile: e.target.result });
  };
  
}

const handleClear = () =>{
    setTimeout(()=>{reRender(true)},50)
    reRender(false)
    setPostData({...postData, selectedFile: ""})
    setShowImage(false)

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
setOpenEditForm(true)

};



const handleClose = () => {
  setOpenEditForm(false)
  setCurrentId(0);
};

  return (
   <>
    <Paper sx={{mb:{xs: 0, sm: 0, md: 2, lg: 2, xl: 2}}}>
     <Tooltip title="Add" sx={{position:"fixed", bottom:20, right:{xs: "calc(5%)", md: 30},display:{xs:'block', sm:'block', md:'none', lg:'none',xl:'none'}}}>
      <Fab onClick={handleClickOpen} color='primary' aria-label="add">
      <Add />
      </Fab>
     </Tooltip> 
       <Box display="flex" justifyContent="center" sx={{p:2, display:{xs:'none', sm:'none' ,md:'flex', lg:'flex', xl:'flex'}}}>
      
          <Avatar component={Link} href={`/user/${localUser?._id}`} underline="none" sx={{width:'3.5rem', height:'3.5rem', marginRight:'1rem'}}  src={localUser?.avatar}>{localUser?.name?.split(" ")[0].substring(0,1).toUpperCase()}{localUser?.name?.split(" ")[1].substring(0,1)}</Avatar>

        <Button fullWidth onClick={handleClickOpen} variant="outlined" style={{borderRadius:'35px', display:'flex', justifyContent:'start', color:'GrayText'}}>
            Start a post
        </Button>
       </Box>
   
       <Dialog open={openEditForm} fullWidth>
        <DialogTitle>{currentId ? "Edit a post" : "Create a Post"}</DialogTitle>
        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" >
          <div className='avatar'>
            <Avatar sx={{width:'4rem', height:'4rem'}} src={localUser?.avatar ? localUser?.avatar : "/static/images/avatar/2.jpg" }>{localUser?.name?.split(" ")[0].substring(0,1).toUpperCase()}{localUser?.name?.split(" ")[1].substring(0,1)}</Avatar>
           </div>
           <div>
            <Typography variant='h6'>{localUser?.name?.replace(/\b[a-z]/g, c => c.toUpperCase())}</Typography>
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
            {showImage ?( 
              <div style={{position:'relative'}}> 
              {postData.selectedFile !== "" ? <Button style={{position:'absolute', right:'0', top:'0'}} color="inherit" onClick={handleClear}><Clear /></Button>: ""}
              <img width="100%" style={{objectFit:'cover'}} src={postData.selectedFile} alt=''/>
              </div>
              ) :null }
          <MuiChipsInput 
              name="tags"
            label="Tags"
            fullWidth
            variant='standard'
            value={postData.tags}
            onAddChip={(chip) => handleAddChip(chip)}
            onDeleteChip={(chip) => handleDeleteChip(chip)}
          />
          {render ? 
          <Button component="label" variant='contained' color='primary'>
           <div style={{display:'none'}}>
             <input type="file" onChange={handleChangeFile}/>
           </div>
           <ImageSearch />
           </Button>
           : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          { (postData.content !== "" && postData.content.trim().length !== 0 ) || postData.tags.length !== 0 || postData.selectedFile !== "" ? 
          <Button type='submit' variant='contained' >{currentId ? "Update" : "Post"}</Button>
          :
          <Button type='submit' variant='contained' disabled>{currentId ? "Update" : "Post"}</Button> 
           }
        </DialogActions>
        </form>
      </Dialog>
    </Paper>
   </>
  )
}

export default Form