import React from 'react'
import { Stack,Box, Grow } from '@mui/material'
import Form from '../Form/Form'
const Home = () => {
  return (
    <>    
       <Grow in>
           <Stack direction="row" spacing={2} justifyContent="space-between">
          <Box flex={2} p={2}>Profile </Box>
          <Box flex={4} p={2}>
          <Form/>
          
          </Box>
          <Box flex={2} p={2}>Advertiser </Box>
           </Stack> 

        </Grow>    
    </>
  )
}

export default Home


//p is padding