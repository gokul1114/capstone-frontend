import { Grid } from "@mui/material";
import React, { useEffect, useState, createContext} from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../App";
import DisplayBike from "../DisplayBike/DisplayBike.js";
import SearchBar from "../SearchBar/SearchBar.js";
import Filter from "../Filter/Filter.js";

export const context = createContext(0);

export default function ListBikes() {
  const { startDate, endDate, location } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultCopy, setSearchResultCopy] = useState([]);
  const [totalCost, setTotalCost] = useState(0)

  const [startDateVal, setStartDateVal] = useState(startDate);
  const [endDateVal, setEndDateVal] = useState(endDate);
  const [locationVal, setLocationVal] = useState(location);

  console.log(startDate, endDate, location);

  useEffect(() => {
    const body = { startDate, endDate, location : location };
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
        setSearchResultCopy(result)
      });
  }, []);

  const obj = {searchResult, setSearchResult, searchResultCopy, setSearchResultCopy}
  return (
    <div>
      <context.Provider value = {obj}>
      <SearchBar startDate={startDate} endDate={endDate} location={location} />
      
      <Grid container columnSpacing={2}>
        <Grid item xs = {2} className="filter-grid-container" sx={{mt : 4, ml : 2}}>
          <Filter />
        </Grid>
        <Grid item xs = {8}>
          <Grid container spacing={2} sx={{ m: 1 }}>
            {
            searchResult.map((bike, id) => {
            console.log(bike)
            return  (
              <Grid item xs={4} key={id}>
                <DisplayBike bike={bike} />
              </Grid>
            )
          })
            }
          </Grid>
        </Grid>
        {/* <Grid item xs = {2}>
          <Filter />
        </Grid> */}
      </Grid>
      </context.Provider>
    </div>
  );
}
