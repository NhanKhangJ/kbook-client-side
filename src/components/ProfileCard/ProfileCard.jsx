import React from 'react';
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import Link from '@mui/material/Link';
import { BusinessCenter, LocationOn, School } from '@mui/icons-material';
import freeBackground from '../../images/freeBackground.jpeg'
import { useSelector } from 'react-redux';
//
const ProfileCard = () => {
  const localUser = useSelector((state) => state.users.localUser);

  return (
    <> 
      <Box >
       <Card  sx={{maxWidth:'100%', maxHeight:'300px'}}>
          <div>
           <CardMedia
            sx={{height:75, objectFit:'cover'}}
            image={localUser?.cover || freeBackground}
            component='img'
            />
          </div>
         <div>
          <CardContent sx={{position:'relative', display:'flex', flexDirection:'column',  top:'-50px'}}>
             <Avatar  sx={{width:'5rem', height:'5rem', border: '5px solid white', alignSelf:'center' }} alt=" " src={localUser?.avatar}>{localUser?.name.split(" ")[0].substring(0,1)}{localUser?.name.split(" ")[1].substring(0,1)}</Avatar>
             <Link sx={{alignSelf:'center'}} variant='h5' href={`/user/${localUser?._id}`} underline="hover" color="black">{localUser?.name.replace(/\b[a-z]/g, c => c.toUpperCase())}</Link>

             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
              <BusinessCenter fontSize='small' />
              &nbsp;{localUser?.job || "Update your employment"}
             </Typography>
       
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
              <School fontSize='small' />
              &nbsp;{localUser?.education|| "Update your education"}
             </Typography>
       
      
             <Typography marginBottom="1rem" display="flex" alignSelf="flex-start" variant='caption'>
              <LocationOn fontSize='small'/>
              &nbsp;{localUser?.location || "Update your location"}
             </Typography>
          </CardContent>   
         </div>
       </Card> 
       <Card sx={{marginTop:"1rem"}}>
        <CardContent>
            <Typography variant='h6'>Note</Typography>
            <Typography variant='subtitle2'>Hi {localUser?.name}!</Typography>
            <Typography variant='subtitle2'>Thank you for using my application. There are a lot of things to improve in my app. I hope you enjoy using it.</Typography>
            <Typography  variant='subtitle2'>Regards,</Typography>
            <Typography  variant='subtitle2'>Nhan Khang Le</Typography>
        </CardContent>
       </Card>
      </Box>
    </>
  )
}

export default ProfileCard