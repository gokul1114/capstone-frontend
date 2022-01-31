import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import './DisplayBike.css';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

export default function DisplayBike({bike}) {
  const navigate = useNavigate()
  const[open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  const bookNowClicked = () => {
    const {thumbnailImage, brand, model, mileage, pricePerHour, pricePerDay, pricePerWeek} = bike;
    const bikeDetails = {thumbnailImage, brand, model, mileage, pricePerHour, pricePerDay, pricePerWeek}
    localStorage.setItem("bookingBikeDetails", JSON.stringify(bikeDetails))
    navigate(`/checkout`)
  }

  return(
    <Card className = 'bike-card' sx={{ maxWidth: 345, boxShadow : 5 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={bike.thumbnailImage}
        alt={bike.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign='center'>
            <sup>{bike.brand}</sup> {bike.model}
        </Typography>
        <ListItemButton>
        <ListItemIcon>
          <LocalGasStationIcon/>
        </ListItemIcon>
        <ListItemText primary={bike.mileage} />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CurrencyRupeeIcon />
        </ListItemIcon>
        <ListItemText primary="Price" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx = {{ml:'20%', border : '1px solid black', borderLeft : '0px'}}>
        <b>per hour :</b>
        <ListItemText primary={bike.pricePerHour} sx={{ml:1}}/>
      </ListItemButton>
      <ListItemButton sx = {{ml:'20%',borderBottom : '1px solid black', borderRight : '1px solid black'}}>
      <b>per hour :</b>
        <ListItemText primary={bike.pricePerDay} sx={{ml:1}}/>
      </ListItemButton>
      <ListItemButton sx = {{ml:'20%', borderBottom : '1px solid black', borderRight : '1px solid black'}}>
      <b>per hour :</b>
        <ListItemText primary={bike.pricePerWeek} sx={{ml:1}}/>
      </ListItemButton>
        </List>
      </Collapse>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant='contained' size="small" color="primary" onClick={bookNowClicked}>
        Book Now
      </Button>
    </CardActions>
  </Card>
  );
}
