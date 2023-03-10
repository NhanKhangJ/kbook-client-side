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
            description: "Per Scholas is a non-profit that provides technology education and career training to individuals from under-served communities.",
            image: PerShcolas,
            website: 'https://perscholas.org/'
        }
    ]
    const Item = ({item}) =>{
        return (
          <Card  elevation={0}  style={{border:' 1px solid #ddd'}}>
            <CardMedia component={Link} href={item.website} underline="none" target="_blank"
                    sx={{ height: 200 }}
             image={item.image}
              />
            <CardContent style={{borderTop:"0.5px solid #ddd"}} >
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
            }}}
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