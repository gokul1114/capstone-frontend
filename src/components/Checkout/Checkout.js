import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Checkout.css";
import { maxWidth } from "@mui/system";

export default function Checkout() {
  const navigate = useNavigate();
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  const bikeDetails = JSON.parse(localStorage.getItem("bookingBikeDetails"));
  const [basePrice, setBasePrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(2000);
  const securityDeposit = 2000
  const [isLogin, setLogIn]   = useState(localStorage.getItem('token')?true:false)

  const token = localStorage.getItem("token")
  if (!bookingDetails) {
    navigate("/");
  }
  
  useEffect(() => {
    const startDate = new Date(bookingDetails.startDateVal);
    const endDate = new Date(bookingDetails.endDateVal);

    let totalDaysDiff = (endDate.getTime() -startDate.getTime())/86400000
    console.log(totalDaysDiff)

    if(totalDaysDiff > 0.5 && totalDaysDiff < 7){
      //console.log()
      setBasePrice(Math.round(totalDaysDiff * bikeDetails.pricePerDay))
    }
    else if(totalDaysDiff > 7) {
      setBasePrice(Math.round(totalDaysDiff/7 * bikeDetails.pricePerWeek))
    }
    else{
      setBasePrice(Math.round(totalDaysDiff*24 * bikeDetails.pricePerHour))
    }
  },[])

  useEffect(() => {
    setTotalPrice(basePrice + securityDeposit)
  },[basePrice])

  const submitOrder = () => {
    if(!token) {
      navigate("/login/checkout")
    }
    else {
    loadPayment()
    }
  }

  const loadScript = (src) => {
    return new Promise((resolve) =>{
      const script = document.createElement('script')
      script.src = src

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const loadPayment = async () => {
    console.log("inside loadPayment")
    const rpay = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!rpay) {
      alert('Razor pay failed to load')
      return
    }
    const amount = Math.round(totalPrice * 100);
    console.log(amount)
     const options = {
       key : "rzp_test_98p2WvbdoIWN53",
       currency : "INR",
       amount : amount,
       name : "Customer name",
       description : "thanks for purchasing",
       image : "",
       handler: function(response) {
         alert(response.razer_payment_id)
         onPaymentSuccess();
       }
     }
    
     const onPaymentSuccess = () => {
      alert("Payment Successful! Order Placed 😊");
      setTimeout(() => {
        navigate("/")
       }, 5000)
     }
     
    const paymentObj = new window.Razorpay(options);
     paymentObj.open()
  }
  console.log(bookingDetails, bikeDetails);
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Card sx={{ minWidth: 275, m: 2, boxShadow: 5, height : '100%'}}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              textAlign="center"
              color="text.secondary"
              gutterBottom
            >
              Booking Details
            </Typography>
            <CardMedia
              component="img"
              height="250px"
              width="250px"
              className="checkout-bike-img"
              image={bikeDetails.thumbnailImage}
              alt="Image"
            />
            <div className="table-flex">
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Location
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                  {bookingDetails.locationVal}
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  From
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                  {bookingDetails.startDateVal.slice(0,24)}
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  To
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                  {bookingDetails.endDateVal.slice(0,24)}
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Mileage
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                  {bikeDetails.mileage}/ltr
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>


      <Grid item xs={12} md={6}>
        <Card sx={{ minWidth: 275, m: 2, boxShadow: 5, height : '100%', alignContent : 'stretch'}}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bold" }}
              textAlign="center"
              color="text.secondary"
              gutterBottom
            >
              Fair Details
            </Typography>
            <div className="table-flex">
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Base Price
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                  {basePrice}
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Insurance
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                Included
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                Security Deposit(Refundable)
                </Typography>
                <Typography variant="h6" component="div" fontWeight='1000'>
                {securityDeposit}
                </Typography>
              </div>
              <div className="table-flex-row">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Pick your bike @
                </Typography>
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Pick your bike @
                </Typography>
              </div>
              <div className="table-flex-row-total">
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  Total Cost
                </Typography>
                <Typography textAlign="start" variant="h6" component="div" fontWeight='700'>
                  {totalPrice}
                </Typography>
              </div>
              <div className="table-flex-row-paynow">
                <Button variant="contained" 
                sx={{width : '100%', height : 50, backgroundColor : 'black', borderRadius : 10}}
                onClick = {submitOrder}>Pay Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
