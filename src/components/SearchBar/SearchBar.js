import React, { useState } from "react";
import { useContext } from "react";
import { context } from "../ListBikes/ListBikes.js";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import './SearchBar.css';
import { SERVER_URL } from "../../App.js";

export default function SearchBar({ startDate, endDate, location }) {
  const [startDateVal, setStartDateVal] = useState(startDate);
  const [endDateVal, setEndDateVal] = useState(endDate);
  const [locationVal, setLocationVal] = useState(location);
  
  const value = useContext(context);
  const {searchResult, setSearchResult, searchResultCopy, setSearchResultCopy} = value;

  const minDate = new Date();
  const maxStartDateLimit = new Date();
  maxStartDateLimit.setDate(minDate.getDate() + 30);
  const bookingDetails = {startDateVal, endDateVal, locationVal}
  localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))
  localStorage.setItem("startDate",startDateVal )
  localStorage.setItem("endDate",endDateVal )
  console.log("-----------",localStorage.getItem("bookingDetails"))

  const handleSearch = () => {
    const bookingDetails = {startDateVal, endDateVal, locationVal}
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails) )
    const body = { startDateVal, endDateVal, location : locationVal };
    fetch(`${SERVER_URL}bike/getBikes`
      ,{
          method : 'POST',
          headers : { 'Content-Type': 'application/json' },
          body : JSON.stringify(body)
      })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setSearchResult(result);
        setSearchResultCopy(result);
      });
  };

  return (
    <div>
      {/* <AppBar position="static"> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Toolbar className="tool-bar" sx={{m:1}}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item className = 'box-shadow-underline'
            //  sx= {{boxShadow : 5}}
             >
              <DateTimePicker
                xs={12}
                renderInput={(props) => <TextField {...props} />}
                label="From"
                value={startDateVal}
                sx = {{backgroundColor : 'white'}}
                className="date-time-picker-1"
                //change it to diff min date
                minDate={startDateVal}
                maxDate={maxStartDateLimit}
                onChange={(newValue) => {
                  setStartDateVal(newValue);
                }}
              />
            </Grid>
            <Grid item className = 'box-shadow-underline'>
              <DateTimePicker
                xs={12}
                renderInput={(props) => <TextField {...props} />}
                label="To"
                value={endDateVal}
                minDate={startDateVal}
                onChange={(newValue) => {
                  setEndDateVal(newValue);
                }}
              />
            </Grid>
            <Grid item className = 'box-shadow-underline'>
            <TextField
                    id="select"
                    label={<LocationOnIcon fontSize="medium" />}
                    value={locationVal}
                    sx={{ width: "100%", textAlign: "left" }}
                    select
                    className="select-city"
                    onChange={(e) => {
                      setLocationVal(e.target.value);
                    }}
                  >
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Madurai">Madurai</MenuItem>
                    <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                  </TextField>
            </Grid>
            <Grid item className = 'box-shadow-underline'>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 1000,
                  backgroundColor: "black",
                  height: 55
                }}
                className="search-btn"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </LocalizationProvider>
      {/* </AppBar> */}
    </div>
  );
}
