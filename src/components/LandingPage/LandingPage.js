import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import img from "../LandingPage/bike.jpg";
import { width } from "@mui/system";
import "./LandingPage.css";
import { SERVER_URL } from "../../App";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const minDate = new Date();
  const [startDate, setStartDate] = useState(minDate);
  let maxStartDateLimit = new Date();
  maxStartDateLimit.setDate(minDate.getDate() + 30);
  const [maxDate, setMaxDate] = useState(maxStartDateLimit);

  let minEndDateLimit = new Date();
  minEndDateLimit.setDate(startDate.getDate() + 1);
  const [minEndDate, setMinEndDate] = useState(minEndDateLimit);
  const [endDate, setEndDate] = useState(minEndDate);

  const [location, setLocation] = useState("Chennai");
  const navigate = useNavigate();
  console.log(minDate);

  useEffect(() => {
    minEndDateLimit.setDate(new Date(startDate.getTime() + (86400000)));
    setMinEndDate(new Date(startDate.getTime() + (86400000)))
    setEndDate(new Date(startDate.getTime() + (86400000)))
  },[startDate])

  // useEffect(() => {
  //   setEndDate(minEndDateLimit)
  // },[minEndDateLimit])

  const handleSearch = () => {
    //const body = {startDate, endDate, location}
    navigate(`/listBikes/${startDate}/${endDate}/${location}`);
  };
  return (
    <Box className="landingContainer" sx={{ m: 0, p: "10%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          p: 0,
          m: 0,
        }}
      >
        <Grid container>
          <Grid
            item
            lg={5}
            md={8}
            sx={{
              p: 5,
              backgroundColor: "#ffffffbd",
              borderRadius: 5,
              alignSelf: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                container
                columnSpacing={{ xs: 0, md: 3, lg: 3 }}
                rowSpacing={3}
              >
                <Grid item xs={12} md={6} lg={6}>
                  <DateTimePicker
                    xs={12}
                    renderInput={(props) => <TextField {...props} />}
                    label="From"
                    value={startDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <DateTimePicker
                    xs={12}
                    renderInput={(props) => <TextField {...props} />}
                    label="To"
                    value={endDate}
                    minDate={startDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="select"
                    label={<LocationOnIcon fontSize="medium" />}
                    value={location}
                    sx={{ width: "100%", textAlign: "left" }}
                    select
                    className="select-city"
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  >
                    <MenuItem value="Chennai">Chennai</MenuItem>
                    <MenuItem value="Madurai">Madurai</MenuItem>
                    <MenuItem value="Coimbatore">Coimbatore</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "100%",
                      height: 40,
                      borderRadius: 5,
                      fontWeight: 1000,
                      backgroundColor: "black",
                    }}
                    className="search-btn"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
