import React from 'react';
import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';

import Link from '@mui/material/Link';
import { BusinessCenter, LocationOn, School } from '@mui/icons-material';

const ProfileCard = ({currentUser}) => {
  console.log(currentUser)
  return (
    <>
       <Card sx={{maxWidth:'100%', maxHeight:'300px'}}>
         <div>
          <CardMedia
           sx={{height:75, objectFit:'cover'}}
           image={currentUser?.cover}
           component='img'
            />
         </div>
         <div>
          <CardContent sx={{position:'relative', display:'flex', flexDirection:'column',  top:'-50px'}}>
            <Avatar  sx={{width:'5rem', height:'5rem', border: '5px solid white', alignSelf:'center' }} alt={currentUser?.name} src={currentUser?.avatar}>{currentUser?.name}</Avatar>
            <Link sx={{alignSelf:'center'}} variant='h5' href={`/user/${currentUser?._id}`} underline="hover" color="black">{currentUser?.name}</Link>

             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <BusinessCenter fontSize='small' />
             &nbsp;{currentUser?.job}
             </Typography>
       
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <School fontSize='small' />
             &nbsp;{currentUser?.education}
            </Typography>
       
      
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
             <LocationOn fontSize='small'/>
             &nbsp;{currentUser?.location}
            </Typography>
       
          </CardContent>   
         </div>
       </Card>  
    </>
  )
}

export default ProfileCard