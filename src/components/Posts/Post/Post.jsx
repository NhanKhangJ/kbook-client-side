import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {  Card, CardActions, CardContent, CardHeader, CardMedia, Typography,Avatar,Button, IconButton,  CircularProgress, Collapse, Box, Stack, Dialog} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Menu, MenuItem} from '@mui/material';
import { Clear, ThumbUpAlt} from '@mui/icons-material';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import moment from 'moment';
import {deletePost,  likePost} from '../../../action/posts'
import Comments from './Comments';





const Post = ({ currentUser, post, setCurrentId}) => {
    const dispatch = useDispatch();
    const [showMore, setShowmore] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [expansed, setExpansed] = useState(false)
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId || user?.result?._id
    const [likes, setLikes] = useState(post?.likes);//[{userId, UserName}] nested object array
    // const hasLikedPost = post.likes.find((like) => like === userId)
    const hasLikedPost = likes.find((p) => p?.userId === userId)
    // console.log(hasLikedPost)
    // console.log(post)
    

    const [open, setOpen] =useState(false);

  
    const handleOpen = () => {
      setOpen(true);
      console.log('open')
    };
  
    const handleClose = () => {
      setOpen(false);
      console.log('close')
    };




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
    // console.log(currentUser.avatar)
    // console.log(post?.creatorAvatar)
    // console.log(post.creator)
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
    // console.log(post.comments)
    // console.log(index)

    // ready for dialog mode
  return (
    <>
      {!post.name ? <CircularProgress />  :(
      <Card   elevation={2}>
      <CardHeader 
        
        avatar={
          <Link to={`/user/${post.creator}`}>
           <Avatar alt={post?.name}  src={post?.creatorAvatar}  sx={{width:'3.5rem', height:'3.5rem'}}/>
           </Link>
        }
        action={
          user?.result?._id === post?.creator &&
          <IconButton aria-label="settings" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.name?.replace(/\b[a-z]/g, c => c.toUpperCase())}
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
   {  post.selectedFile ? (
        <CardMedia
        onClick={handleOpen}
        sx={{objectFit:{xs: 'contain', sm: 'contain' , lg:'cover', xl:'cover'}, height:{xs: 224, sm: 500, lg: 350, xl: 350}, cursor:'pointer'}}
        component="img" //The component used for the root node. Either a string to use a HTML element or a component.
        image={post.selectedFile} 
        alt=""

      />
      ) : null }
   
     <CardContent sx={{paddingTop: '0.5rem', paddingBottom: '0.5rem', display:'flex', justifyContent:'space-between'}}>
      <div>
      { likes.length > 0 &&
        ( likes.find((p) => p.userId === userId)
          ? (
            <>  
            <Typography  variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` :
            `${likes.length === 2  ? `${user?.result?.name} and ${likes[0].name}`: user?.result?.name} `
              }</Typography>
            </>
          ) : (
            <>
            <Typography  variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit' />&nbsp;{likes.length > 2 ? `${likes[0].name} and ${likes.length - 1} others` : `${likes[0].name}${likes[1]?.name ? ` and ${likes[1]?.name}` : "" }` }</Typography>
            </>
          )
      )}
      </div>
      <div>
      {post?.comments.length > 0 && (
         <Typography style={{cursor: 'pointer'}} onClick={() => {setExpansed(!expansed)}} variant='subtitle2' color="GrayText">{post.comments.length} {post?.comments?.length < 2 ? "comment" : 'comments'}</Typography>
      )}
      </div>
     </CardContent>
     <CardContent sx={{paddingBottom:'0', paddingTop:'0'}} >
      <hr style={{opacity:'50%', padding:'0' , margin:'0px'}}/>
     </CardContent>
     <CardActions disableSpacing sx={{paddingBottom:'0px', paddingTop:'0px'}}>
        <Button  size='large' color='primary'  onClick={handleLike}>
          <Likes />
        </Button>
        <Button size='large' color='primary' onClick={() => {setExpansed(!expansed)}} >
        <ChatBubbleOutlineIcon fontSize='medium' />&nbsp;Comment
        </Button>
      </CardActions>
      <Collapse in={expansed} timeout="auto" unmountOnExit>
        <Comments currentUser={currentUser} post={post} />
      </Collapse>
    </Card>
     )}
     
     <Dialog
      fullWidth
       maxWidth="lg"
        open={open}
        onClose={handleClose}
        sx={{position:'fixed'}}
      >
       <Stack  sx={{height: '80vh', display:'flex', flexDirection:{xs: 'column', sm:'column', md:'row', lg: 'row', xl:'row'}}}>
       <Button onClick={handleClose} style={{position:'absolute', top:'0', left:'0', padding:'1rem 0'}} color='inherit' ><Clear /></Button>
        <Box flex={7} style={{ display:'flex', justifyContent:'center', backgroundColor:' #f4f4f4'}}>

            <img src={post.selectedFile} alt=' ' style={{width:'100%', objectFit:'contain'}}/>    
        </Box>
        <Box flex={3}  style={{overflow: 'scroll'}}>
    <Card style={{backgroundColor:'transparent'}} elevation={0}>
      <CardHeader 
        
        avatar={
          <Link to={`/user/${post.creator}`}>
           <Avatar alt={post?.name}  src={post?.creatorAvatar}  sx={{width:'3.5rem', height:'3.5rem'}}/>
           </Link>
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

     <CardContent sx={{paddingTop: '0.5rem', paddingBottom: '0.5rem', display:'flex', justifyContent:'space-between'}}>
      <div>
      { likes.length > 0 &&
        ( likes.find((p) => p.userId === userId)
          ? (
            <>  
            <Typography  variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit' />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` :
            `${likes.length === 2  ? `${user?.result?.name} and ${likes[0].name}`: user?.result?.name} `
              }</Typography>
            </>
          ) : (
            <>
            <Typography  variant='subtitle2' color="GrayText"><ThumbUpAlt fontSize='inherit' />&nbsp;{likes.length > 2 ? `${likes[0].name} and ${likes.length - 1} others` : `${likes[0].name}${likes[1]?.name ? ` and ${likes[1]?.name}` : "" }` }</Typography>
            </>
          )
      )}
      </div>
      <div>
      {post?.comments?.length > 0 && (
         <Typography  variant='subtitle2' color="GrayText">{post.comments.length} {post?.comments?.length < 2 ? "comment" : 'comments'}</Typography>
      )}
      </div>
     </CardContent>
     <CardContent sx={{paddingBottom:'0', paddingTop:'0'}} >
      <hr style={{opacity:'50%', padding:'0' , margin:'0px'}}/>
     </CardContent>
     <CardActions disableSpacing sx={{paddingBottom:'0px', paddingTop:'0px'}}>
        <Button  size='large' color='primary'  onClick={handleLike}>
          <Likes />
        </Button>
        <Button size='large' color='primary'  >
        <ChatBubbleOutlineIcon fontSize='medium' />&nbsp;Comment
        </Button>
      </CardActions>
        <Comments currentUser={currentUser} post={post} />
    </Card>
        </Box>
       </Stack>
    </Dialog>

    </>
  )
}

export default Post