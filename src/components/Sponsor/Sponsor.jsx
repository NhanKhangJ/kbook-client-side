import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Paper,  Card, CardMedia, CardContent, Typography, Link} from '@mui/material'

import { Box } from '@mui/system'
import PerShcolas from '../../images/PerScholas.png'
import ActivateWork from '../../images/ActivateWork.jpeg'
const Sponsor = () => {
    const items = [
        {
            name: "ActivateWork",
            description: "ActivateWork is a nonprofit recruiting, training, and coaching firm that connects underrepresented talent to life-changing careers.",
            image: ActivateWork, 
            website: 'https://www.activatework.org/'
        },
        {
            name: "PerSholas",
            description: "At Per Scholas, we believe a thriving workforce starts with equitable access to education. Learn about Per Scholas and how we provide skills training.",
            image: PerShcolas,
            website: 'https://perscholas.org/'
        }
    ]
    const Item = ({item}) =>{
        return (
          <Card  elevation={2} style={{border:' 1px solid #ddd'}}>
            <CardMedia component={Link} href={item.website} underline="none" target="_blank"
                    sx={{ height: 200 }}
             image={item.image}
              />
            <CardContent style={{background:'#EBECF0'}}>
                <Typography>{item.description}</Typography>
            </CardContent>
          </Card>
        )
    } 

    return (
        <Box component={Paper}  p={2} >
        <Typography variant='h6'>Sponsor by</Typography> 
         <Carousel
         stopAutoPlayOnHover
         indicatorIconButtonProps={{
        style: {
            display:'none',
            padding: '10',    // 1
            color: 'blue'       // 3
        }
    }}
        animation="slide"
         >
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>

        </Box>
    )
}

export default Sponsor