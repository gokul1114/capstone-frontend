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
import  GoogleLogoutMod  from "./components/GoogleLogout/GoogleLogoutMod.js"
import { useState, useContext } from "react";
import { context } from "./App";

export function NavBar() {
  const navigate = useNavigate()
  const {isLogin, setIsLogin, isGoogleLogin, setIsGoogleLogin} = useContext(context)
  console.log(isLogin)
  const openLogin = () => {
    navigate("/login")
  }
 
  const logOut = () => {
    localStorage.clear()
    setIsLogin(false);
  }

  const takeHome = () => {
    navigate("/")
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
            onClick = {takeHome}
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
          {!isLogin ?
          <Button variant="outlined" 
          sx={{backgroundColor : "white", color : 'black'}}
          onClick = {openLogin}><LoginIcon />Login</Button>
          :
          
          isGoogleLogin? <GoogleLogoutMod/> : 
          <Button variant="outlined" 
          sx={{backgroundColor : "white", color : 'black'}}
          onClick = {logOut}><LoginIcon />Logout</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
