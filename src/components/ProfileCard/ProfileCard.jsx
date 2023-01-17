import React from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import Link from '@mui/material/Link';
import { BusinessCenter, LocationOn, School } from '@mui/icons-material';
import freeBackground from '../../images/freeBackground.jpeg'
//
const ProfileCard = ({currentUser}) => {
  
  // console.log(currentUser)
  return (
    <> 
      <Box >
       <Card  sx={{maxWidth:'100%', maxHeight:'300px'}}>
         <div>
          <CardMedia
           sx={{height:75, objectFit:'cover'}}
           image={currentUser?.cover || freeBackground}
           component='img'
            />
         </div>
         <div>
          <CardContent sx={{position:'relative', display:'flex', flexDirection:'column',  top:'-50px'}}>
            <Avatar  sx={{width:'5rem', height:'5rem', border: '5px solid white', alignSelf:'center' }} alt=" " src={currentUser?.avatar}>{currentUser?.name.split(" ")[0].substring(0,1)}{currentUser?.name.split(" ")[1].substring(0,1)}</Avatar>
            <Link sx={{alignSelf:'center'}} variant='h5' href={`/user/${currentUser?._id}`} underline="hover" color="black">{currentUser?.name}</Link>

             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <BusinessCenter fontSize='small' />
             &nbsp;{currentUser?.job || "Update your employment"}
             </Typography>
       
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <School fontSize='small' />
             &nbsp;{currentUser?.education|| "Update your education"}
            </Typography>
       
      
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <LocationOn fontSize='small'/>
             &nbsp;{currentUser?.location || "Update your location"}
            </Typography>
       
          </CardContent>   
         </div>
       </Card> 
       <Card sx={{marginTop:"1rem"}}>
        <CardContent>
            <Typography variant='h6'>Note</Typography>
            <Typography variant='subtitle2'>Hi {currentUser?.name}!</Typography>
            <Typography variant='subtitle2'>Thank you for using my application. There are a lot of things to improve in my app. I hope you enjoy using it.</Typography>
            <Typography  variant='subtitle2'>Regards,</Typography>
            <Typography  variant='subtitle2'>Nhan Khang Le</Typography>
            <div>
            </div>
        </CardContent>
       </Card>
       </Box>
    </>
  )
}

export default ProfileCard