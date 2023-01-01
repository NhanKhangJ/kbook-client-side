import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {  Card, CardActions, CardContent, CardHeader, CardMedia, Typography,Avatar,Button, IconButton, Checkbox } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from '@mui/material';
import { ThumbUpAlt} from '@mui/icons-material';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';
import {deletePost} from '../../../action/posts'

import './styles.css'
const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const [showMore, setShowmore] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
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
   
  return (

      <Card sx={{mt:3}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            K
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title="User Name"
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

                 {/* {showMore ? 
                  (<><Typography color='primary'>{post.tags.map((tag) =>`#${tag} `)}</Typography></>)
                 : null} */}
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
       <IconButton aria-label="add to favorites"> 
       <Checkbox icon={<ThumbUpAltOutlined />} checkedIcon={<ThumbUpAlt />}/>
        </IconButton> 
      </CardActions>
      
    </Card>
      
  )
}

export default Post