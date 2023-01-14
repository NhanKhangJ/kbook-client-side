import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Paper, Button, Card, CardMedia, CardContent, Typography} from '@mui/material'
import { Home } from '@mui/icons-material'
import { Box } from '@mui/system'


const Sponsor = () => {
    const items = [
        {
            name: "Random Name #1",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    const Item = ({item}) =>{
        return (
          <Card>
            <CardMedia
                    sx={{ height: 140 }}
             image="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
              />
            <CardContent>
                <Typography>{item.name}</Typography>
                <Typography>{item.description}</Typography>
            </CardContent>
          </Card>
        )
    } 

    return (
        <Box position="fixed" width={338} >
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