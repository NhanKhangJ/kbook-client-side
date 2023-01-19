import React from 'react'
import { CircularProgress, ImageList, ImageListItem, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ImagesCollection = ({profileId}) => {
    const posts = useSelector((state) =>
    state.posts
)
const  currentId  = useParams();
  return (
    <Paper sx={{padding:2, mt: 2}}>
    <Typography variant='h5'>Images</Typography>
   
     { profileId === currentId.id && currentId.id !== undefined 
      ? 
     
        !posts.length ? <CircularProgress /> : (
          <ImageList  cols={3} rowHeight={162} sx={{marginBottom:0}}>
            {posts.filter(post => post.creator === profileId).map((post, index) => ( 
                     post?.selectedFile && (
                         <ImageListItem key={index}>
                            <img 
                              style={{objectFit:'cover', height:'100%', background:'#E4E4E4'}}
                              alt=""
                              src={post.selectedFile}
                              />
                         </ImageListItem>
                     ) 
             ))}
          </ImageList> 
        )
    
        
      : null
    
   }

    </Paper>
  )
}

export default ImagesCollection