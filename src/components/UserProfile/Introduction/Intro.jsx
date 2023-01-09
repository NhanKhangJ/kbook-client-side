import { BusinessCenter, Edit, LocationOn, School, WatchLater } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

const Intro = () => {
  return (
    <Card elevation={2}  >
      <CardHeader title="Introduction"  />
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
       <BusinessCenter />
       <Typography>User Workplace</Typography>

      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
      <School />
       <Typography>User Education</Typography>
     
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
      <LocationOn />
       <Typography>User Location</Typography>
     
      </CardContent>
      <CardContent sx={{display:'flex', alignItems:'center', alignContent:'center'}} >
      <WatchLater />
       <Typography>User Join at</Typography>
     
      </CardContent>
      <CardActions >
       <Button fullWidth variant='contained'>
       <Edit/>
         Edit Profile
       </Button>
      </CardActions>
    </Card>
  )
}

export default Intro