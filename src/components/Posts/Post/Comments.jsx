import React,{useState} from 'react'
import { TextField, Button, Avatar, Typography, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import './styles.css'
import { commentPost } from '../../../action/posts';
const Comments = ({currentUser, post}) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("");
    const [loadComments, setLoadComments] = useState(2)
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const handleLoadComments = () => {
      let newComments = loadComments +  2
      setLoadComments(newComments)
    }
    // console.log(comments)
    const handleClick = async () =>{        
        const newComments = await dispatch(commentPost(comment, post._id));
        // console.log(newComments)
        setComments(newComments)
        setComment("")
    }
  return (
    <>
     <CardContent sx={{display: 'flex', justifyContent: "center"}}>
      <Avatar style={{width: ""}}  sx={{ width: 56, height: 56 }} alt={user?.result?.name}  src={currentUser?.avatar || "/static/images/avatar/2.jpg"}  />
      <div style={{width:"100%", margin:"0 0.5rem",borderRadius:"30%"}} className="commentInput" >
    <TextField
     size='medium'
      fullWidth 
      multiline 
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your comment"
      />
    {comment.length > 0 ? (  
     <Button onClick={handleClick}>
        Post
     </Button>
    ) : null}
    </div>
     </CardContent>
     <CardContent sx={{display: 'flex', justifyContent: "center", flexDirection:"column", paddingBottom: "0px"}}>

      {comments.map((c,index)=>(
        <div style={{width:"100%", display: 'flex', justifyContent: "center", alignItems:"start"}}  key={index}>
        <Avatar alt={c.creator} src={c?.creatorAvatar || "/static/images/avatar/2.jpg"} />
        <div style={{width:"100%", margin:"0 0.5rem 1rem 0.5rem", backgroundColor:"#f2f2f2", borderRadius:"5px", height:"auto", padding:"0.1rem 0.5rem 0.5rem 0.5rem" }} >
        <Typography variant='h6' fontWeight="bold" fontSize='large'  mb="0.5rem">{c.creator}</Typography>
        <Typography variant='subtitle1'>{c.comment}</Typography>
        </div>
        </div>
       )).reverse().splice(0,loadComments)}  

      </CardContent>
      {loadComments < comments.length && (
      <CardContent style={{paddingBottom: "0", paddingTop: "0"}} sx={{}}>
      {comments.length > 2 && (
        <Button type='text' onClick={handleLoadComments}>load more</Button>
       ) }
      </CardContent>
      )}
    </>
  )
}

export default Comments