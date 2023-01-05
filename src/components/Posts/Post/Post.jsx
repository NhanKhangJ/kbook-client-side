import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {  Card, CardActions, CardContent, CardHeader, CardMedia, Typography,Avatar,Button, IconButton,  CircularProgress, Collapse, TextField } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from '@mui/material';
import { ThumbUpAlt} from '@mui/icons-material';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';
import {deletePost, likePost} from '../../../action/posts'
import './styles.css'



const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const [showMore, setShowmore] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [expansed, setExpansed] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id
    const [likes, setLikes] = useState(post?.likes);//[{userId, UserName}] nested object array
    // const hasLikedPost = post.likes.find((like) => like === userId)
    const hasLikedPost = post.likes.find((p) => p.userId === userId)
    // console.log(hasLikedPost)
    // console.log(likes)
  
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
      const handleEditUser = () => {
        setAnchorElUser(null);
        setCurrentId(post._id)
      };
    const handleDelete = () =>{
        setAnchorElUser(null);
        dispatch(deletePost(post._id))
    }
    
    const handleLike = async () =>{
      dispatch(likePost(post._id));

     if(hasLikedPost) {
       setLikes(post.likes.filter((p)=> p.userId !== userId))
     } else{
       setLikes([...post.likes, {userId: userId, name: user.name }])
     }
    }

    const Likes = () =>{
      if (likes.length > 0) {
        return likes.find((p) => p.userId === (user?.result?.googleId || user?.result?._id))
          ? (
            <>
            <ThumbUpAlt  fontSize="medium" />&nbsp;like
            </>
          ) : (
            <>
            <ThumbUpAltOutlined fontSize="medium" />&nbsp;like
            </>
          );
      }
  
      return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
     
  return (
    <>
      {!post.name ? <CircularProgress />  :(
      <Card sx={{mt:3}}>
      <CardHeader
        avatar={
          <Avatar alt={post?.name}  src="/static/images/avatar/2.jpg"  sx={{p:1}}/>
        }
        action={
          user?.result?._id === post?.creator &&
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.name}
        subheader={moment(post.createdAt).fromNow()}
      />
     
       <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > 
           
              <MenuItem  onClick={handleEditUser} >
                  <Typography textAlign="center">Edit</Typography>
                </MenuItem>
                <MenuItem  onClick={handleDelete}>
                  <Typography textAlign="center">Delete</Typography>
                </MenuItem>
            
               
      
            </Menu>
    
      <CardContent>
      {post.content.length > 200 ?
             (
              <>
                <Typography variant="body1" >
                 {showMore ? post.content : `${post.content}`.substring(0,200)};
                {showMore ?
                null :
                 (
                    <Button variant="text"onClick={() => setShowmore(!showMore)}>
                     Show More
                </Button> 
                )}
                </Typography>
                <br></br>
                {showMore ? 
                  (<><Typography color='primary'>{post.tags.map((tag) =>`#${tag} `)}</Typography></>)
                 : null}
                 </>
             )
        : (
            <>
            <Typography variant="body1" >
             {post.content}
         
            </Typography>
            <br></br>
           
            <Typography color='primary'>{post.tags.map((tag) =>`#${tag} `)}</Typography>
            </>
        )}
      </CardContent>
      {post.selectedFile ? (
        <CardMedia
        component="img" //The component used for the root node. Either a string to use a HTML element or a component.
        height="350" //more responsive in mobile version
        image={post.selectedFile} 
        alt=""
      />
      ) : null}
     
     <CardContent sx={{paddingTop: 0, paddingBottom: 0}}>
      { likes.length > 0 &&
        ( likes.find((p) => p.userId === (user?.result?.googleId || user?.result?._id))
          ? (
            <>  
            <Typography  variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</Typography>
            </>
          ) : (
            <><Typography variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit'  />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</Typography></>
          )
      )}
      {/* need to add one more logic to show that the current user like this post */}
      <hr style={{opacity:'50%'}}/>
      </CardContent>
   
     <CardActions disableSpacing>
   
      <Button  size='large' color='primary'  onClick={handleLike}>
          <Likes />
        </Button>
        <Button size='large' color='primary' onClick={() => {setExpansed(!expansed)}} >
        <ChatBubbleOutlineIcon fontSize='medium' />&nbsp;Comment
        </Button>
      
      </CardActions>

      <Collapse in={expansed} timeout="auto" unmountOnExit>
      <CardContent sx={{display: 'flex', justifyContent: "center"}}>
        <Avatar style={{width: ""}}  sx={{ width: 56, height: 56 }} alt={user?.result?.name}  src="/static/images/avatar/2.jpg"  />
        <div style={{width:"100%", margin:"0 0.5rem",borderRadius:"30%"}} className="commentInput" >
        <TextField size='medium' fullWidth />
        </div>
      </CardContent>
      </Collapse>
    </Card>
     )}
    </>
  )
}

export default Post