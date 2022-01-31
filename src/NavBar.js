import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import img from './assets/rental.jpg';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate()
  const openLogin = () => {
    navigate("/login")
  }
  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "black",
        }}
      >
        <Toolbar
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            height : 70
          }}
        >
          <Box
            sx={{ mr: 2, alignSelf : 'center', alignContent : 'center', display : 'flex' }}
          >
          <Avatar
            src={img}
            //src = "C:/Users/sai ram/Documents/Guvi_React/project/BikeRentals/client/src/assets/rental.jpg"
            alt="logo"
            sx={{ width : 60,height : 60, mr : 2 }}
            variant = 'square'
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "block" }, alignSelf : 'center', alignContent : 'center' }}
          >
            Rapid Rentals
          </Typography>
          </Box>
          
          <Button variant="outlined" 
          sx={{backgroundColor : "white", color : 'black'}}
          onClick = {openLogin}><LoginIcon />Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
