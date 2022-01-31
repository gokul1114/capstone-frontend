import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { context } from "../ListBikes/ListBikes.js";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import "./Filter.css";

export default function Filter() {
  const brandFilter = ["Yamaha", "Hero", "TVS", "Bajaj", "Mahindra", "Honda"];
  const [brandFilters, setBrandFilters] = useState(brandFilter);
  const [sortBy, setSortBy] = useState('None')
  const [activeFilters, setActiveFilters] = useState([])
  const transmissionFilter = ["Gear", "Gearless"];

  const value = useContext(context);
  const {searchResult, setSearchResult, searchResultCopy, setSearchResultCopy} = value;
  const handleCheckBoxClick = (event) => {
 
   // event.target.checked = !event.target.checked
    console.log(event.target.checked)
    // if(activeFilters.indexOf(event.target.value) == -1){
    //   setActiveFilters([...activeFilters,event.target.value])
    // }
    // else{
    //   setActiveFilters(activeFilters.splice((activeFilters.indexOf(event.target.value),1)));
    // }

    if(event.target.checked) {
      setActiveFilters([...activeFilters,event.target.value])
    }
    else {
      console.log(activeFilters.indexOf(event.target.value))
       activeFilters.splice((activeFilters.indexOf(event.target.value)),1)
       const newActiveFilters = [...activeFilters]
      setActiveFilters(newActiveFilters);
    }
  }

  useEffect(() => {
    if(activeFilters.length !== 0) {
    const copyResult = [...searchResultCopy]
    const newSearchResult = copyResult.filter(e => {
      if(activeFilters.indexOf(e.brand) !== -1){
        return true;
      }
      else {
        return false
      }
    })
    setSearchResult(newSearchResult)
  }
  else {
    setSearchResult(searchResultCopy)
  }
  },[activeFilters])

  console.log(activeFilters)

  useEffect(() => {
    
    if(sortBy === 'Price'){
       searchResult.sort(function(a, b){return a.pricePerDay-b.pricePerDay});
       const sortOrder = [...searchResult]
      console.log(searchResult==sortOrder)
      setSearchResult(sortOrder)
    }
    else if(sortBy === 'Mileage') {
      searchResult.sort(function(a, b){return a.mileage-b.mileage})
      const sortOrder = [...searchResult]
      console.log(sortOrder)
      setSearchResult(sortOrder)
    }
    else {
      searchResult.sort(function(a, b){return a.displayRank-b.displayRank})
      const sortOrder = [...searchResult]
      console.log(sortOrder)
      setSearchResult(sortOrder)
    }
  },[sortBy])
  console.log(activeFilters)
  return (
    <div className="filter-Container">
      <Typography gutterBottom variant="h5" component="div" textAlign="center">
        Filters
      </Typography>
      <div className="brand-filter-div">
        <Typography gutterBottom variant="h6" component="div" textAlign="start">
          Sort by
        </Typography>
        <TextField
                xs={12}
                id="select"
                label='Sort by'
                value={sortBy}
                sx={{mt : 1, mb : 1, width: "100%", textAlign: "left" }}
                select
                className="sort-by-select"
                onChange = {(event) => {
                  setSortBy(event.target.value)
                }}
              >
                <MenuItem value="None"><b>None</b></MenuItem>
                <MenuItem value="Price"><b>Price</b></MenuItem>
                <MenuItem value="Mileage"><b>Mileage</b></MenuItem>
        </TextField>
      </div>
      <div className="brand-filter-div">
        <Typography gutterBottom variant="h6" component="div" textAlign="start">
          Brand
        </Typography>
        {brandFilters.map((e, index) => (
          <div key = {index}>
            <Checkbox 
            value = {e} 
             onClick= {handleCheckBoxClick}
             />
            <span>
              <h4>{e}</h4>
            </span>
          </div>
        ))}
      </div>
      {/* <div className="transmission-filter-div">
        <Typography gutterBottom variant="h6" component="div" textAlign="start">
          Transmission type
        </Typography>
        {transmissionFilter.map((e, index) => (
          <div key = {index}>
            <Checkbox />
            <span>
              <h4>{e}</h4>
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
}
