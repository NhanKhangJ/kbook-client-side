import React from 'react';
import { BusinessCenter, Edit, LocationOn, School, WatchLater } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import moment from 'moment';

import './styles.css'

const Intro = ({currentUser, user, setOpenDialog}) => {

  return (
    <>
    <Card elevation={2}>
      <CardHeader title="Introduction"  />
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <BusinessCenter />
       <Typography>{user.job}</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <School />
       <Typography>{user.education}</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <LocationOn />
       <Typography>{user.location}</Typography>
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <WatchLater />
       <Typography>{moment(user.createdAt).format("MMMM Do YYYY")}</Typography>
      </CardContent>
      {currentUser?._id === user?._id && (
        <CardActions >
       <Button fullWidth variant='contained' onClick={() => setOpenDialog(true)}>
       <Edit/>
         Edit Profile
       </Button>
      </CardActions>
      )}
   
     </Card>
     
    </>
  )
}

export default Intro