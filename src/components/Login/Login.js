import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './Login.css';
import { SERVER_URL } from "../../App.js";


export default function Login() {
  const client_id = "698330108474-d05h91cjqq4e3o1gqbmq6q2ni2kl2n04.apps.googleusercontent.com"
  const {redirectTo} = useParams()
  const navigate = useNavigate()
  const openRegister = () => {
    navigate("/register")
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('email');
    const password = data.get('password');

    const body = {username, password}
    fetch(`${SERVER_URL}user/login`
      ,{
          method : 'POST',
          headers : { 'Content-Type': 'application/json' },
          body : JSON.stringify(body)
      })
      .then((data) => data.json())
      .then((result) => {
        console.log(result)
        if(!result.message) {
        alert('Login Successful');
        if(redirectTo) {
          navigate("/"+redirectTo)
        }
    }
    else {
      alert(result.message)
      navigate("/")
    }
      });
  };
  
  
  const onSuccess = async (res) => {
    console.log('Login Success: currentUser:', res);
    alert(
      `Logged in successfully  ${res.profileObj.name} 😍`);
    if(redirectTo) {
      navigate("/"+redirectTo)
    }
    else {
      navigate("/")
    }
    // refreshTokenSetup(res);
  };
  
  // const refreshTokenSetup = (res) => {
  //   // Timing to renew access token
  //   let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  
  //   const refreshToken = async () => {
  //     const newAuthRes = await res.reloadAuthResponse();
  //     refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
  //     console.log('newAuthRes:', newAuthRes);
  //     // saveUserToken(newAuthRes.access_token);  <-- save new token
  //     localStorage.setItem('authToken', newAuthRes.id_token);
  
  //     // Setup the other timer after the first one
  //     setTimeout(refreshToken, refreshTiming);
  //   };
  
  //   // Setup first refresh timer
  //   setTimeout(refreshToken, refreshTiming);
  // };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <Box className='sign-in-container'>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor : 'white',
            border : '1px solid white',
            p : 10
          }}
          className='login-card-box'
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <GoogleLogin
        clientId={client_id}
        buttonText="Google Sign In"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy='single_host_origin'
        style={{ marginTop: '100px' }}
        isSignedIn={true}
        className='google-sign-in-btn'
      />
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={openRegister}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Box>
  );
}