import React,{useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'
import { context } from '../../App.js';

export default function GoogleLoginMod({client_id, redirectTo}) {
  const {isLogin, setIsLogin, isGoogleLogin, setIsGoogleLogin} = useContext(context)

    const navigate = useNavigate()
    const onSuccess = async (res) => {
        console.log('Login Success: currentUser:', res);
        localStorage.setItem("token", res.tokenId);
        localStorage.setItem('isGoogleLogin', true)
        setIsGoogleLogin(true)
        isLogin(true)
        alert(
          `Logged in successfully  ${res.profileObj.name} 😍`);
        if(redirectTo) {
          console.log(redirectTo)
          navigate("/"+redirectTo)
        }
        else {
          navigate("/")
        }
        // refreshTokenSetup(res);
    }

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
          `Failed to login. 😢`
        );
    };
  return(
      <GoogleLogin
        clientId={client_id}
        buttonText="Google Sign In"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        style={{ marginTop: '100px' }}
        isSignedIn={true}
        className='google-sign-in-btn'
      />
  );
}
