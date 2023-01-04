import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {  Card, CardActions, CardContent, CardHeader, CardMedia, Typography,Avatar,Button, IconButton,  CircularProgress } from '@mui/material';
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
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = post.likes.find((like) => like === userId)


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    const handleCloseUserMenu = () => {
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
       setLikes(post.likes.filter((id) => id !== userId))
     } else{
       setLikes([...post.likes, userId])
     }
    }

    const Likes = () =>{
      if (likes.length > 0) {
        return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
          ? (
            <><ThumbUpAlt fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
          ) : (
            <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
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
           
              <MenuItem  onClick={handleCloseUserMenu} >
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
      <CardMedia
        component="img" //The component used for the root node. Either a string to use a HTML element or a component.
        height="20%" //more responsive in mobile version
        image={post.selectedFile} 
        alt=""
      />
      <CardActions disableSpacing>
      <Button size='small' color='primary'  onClick={handleLike}>
          <Likes />
        </Button>
      </CardActions>
      
    </Card>
     )}
    </>
  )
}

export default Post