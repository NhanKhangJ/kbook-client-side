import React,{useState} from 'react'
import { TextField, Button, Avatar, Typography, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import './styles.css'
import { commentPost } from '../../../action/posts';
const Comments = ({post}) => {
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem('profile'));
    
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
      <Avatar style={{width: ""}}  sx={{ width: 56, height: 56 }} alt={user?.result?.name}  src="/static/images/avatar/2.jpg"  />
      <div style={{width:"100%", margin:"0 0.5rem",borderRadius:"30%"}} className="commentInput" >
    <TextField
     size='medium'
      fullWidth 
      multiline 
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      />
    {comment.length > 0 ? (  
     <Button onClick={handleClick}>
        Post
     </Button>
    ) : null}
    </div>
     </CardContent>
     <CardContent sx={{display: 'flex', justifyContent: "center", flexDirection:"column-reverse"}}>
      {comments.map((c,index)=>(
        <div style={{width:"100%", display: 'flex', justifyContent: "center", alignItems:"start"}}  key={index}>
        <Avatar alt={c.creator} src="/static/images/avatar/2.jpg" />
        <div style={{width:"100%", margin:"0 0.5rem 2rem 0.5rem", backgroundColor:"#f2f2f2", borderRadius:"5px", height:"auto", padding:"0.1rem 0.5rem 0.5rem 0.5rem" }} >
        <Typography variant='h6' fontWeight="bold" fontSize='large'  mb="0.5rem">{c.creator}</Typography>
        <Typography variant='subtitle1'>{c.comment}</Typography>
        </div>
        </div>
       ))}  
       {/*next step add on the user name in side the user comment and do more styling for other user comment */}
      </CardContent>
    </>
  )
}

export default Comments