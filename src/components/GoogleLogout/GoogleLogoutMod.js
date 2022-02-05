import React,{useContext} from 'react';
import { GoogleLogout } from 'react-google-login';
import { context } from '../../App.js';

export default function GoogleLogoutMod() {

  const {isLogin, setIsLogin, isGoogleLogin, setIsGoogleLogin} = useContext(context)

  const onSuccess = () => {
      alert('Logged Out Successfully')
      localStorage.clear();
      setIsLogin(false)
      setIsGoogleLogin(false)
  }
  const client_id =
    "698330108474-d05h91cjqq4e3o1gqbmq6q2ni2kl2n04.apps.googleusercontent.com";

  return (<GoogleLogout
  clientId={client_id}
  buttonText="Logout"
  onLogoutSuccess={onSuccess}
></GoogleLogout>)
}
