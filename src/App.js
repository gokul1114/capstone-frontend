import { useState, createContext } from "react";
import { NavBar } from "./NavBar";
import { Routes, Route} from 'react-router-dom';
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import ListBikes from "./components/ListBikes/ListBikes.js";
import Checkout from "./components/Checkout/Checkout.js";
import './App.css'

export const SERVER_URL = 'https://bike-rentals-server.herokuapp.com/'
//export const SERVER_URL = 'http://localhost:9000/'
// export const SERVER_URL = 'https://6191a91141928b00176900f1.mockapi.io/cars'
export const context = createContext(0);

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token')? true : false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false)
  const obj = {isLogin, setIsLogin, isGoogleLogin, setIsGoogleLogin}
  console.log(isLogin, isGoogleLogin)
  return (
    <context.Provider value = {obj}>
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path = "/" element = {<LandingPage /> } />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/listBikes/:startDate/:endDate/:location" element = {<ListBikes />}/>
        <Route path = "/checkout" element = {<Checkout />} />
        <Route path = "/login/:redirectTo" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
      </Routes>
    </div>
    </context.Provider>
  );
}

export default App;
