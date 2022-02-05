import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import "./Login.css";
import { SERVER_URL } from "../../App.js";
import GoogleLoginMod from "../GoogleLogIn/GoogleLoginMod.js";
import { GoogleLogin } from "react-google-login";
import { context } from "../../App.js";
import { useContext } from "react";

export default function Login() {
  const {isLogin, setIsLogin, isGoogleLogin, setIsGoogleLogin} = useContext(context)
  const client_id =
    "698330108474-d05h91cjqq4e3o1gqbmq6q2ni2kl2n04.apps.googleusercontent.com";

  const { redirectTo } = useParams();
  const navigate = useNavigate();
  const openRegister = () => {
    navigate("/register");
  };

  console.log(redirectTo);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    const body = { username, password };
    fetch(`${SERVER_URL}user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          return data.json();
        } else {
          alert("Invalid credentials");
          return null;
        }
      })
      .then((result) => {
        if (result) {
          console.log(result);
          localStorage.setItem("token",result.token)
          localStorage.setItem("isGoogleLogin", false)
          setIsLogin(true)
          setIsGoogleLogin(false)
          alert("Login Successful");
          if (redirectTo != undefined) {
            console.log("/" + redirectTo);
            navigate("/" + redirectTo);
          } else {
            navigate("/");
          }
        }
        else {
          navigate("/")
        }
      });
  };

  return (
    <Box className="sign-in-container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            border: "1px solid white",
            p: 10,
          }}
          className="login-card-box"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <GoogleLoginMod client_id={client_id} redirectTo={redirectTo} />
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
