import React, { useState } from 'react'
import { Box, TextField, Button, Divider } from '@mui/material'

const Filter = ({ handleApplyFilters }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [minSqFt, setMinSqFt] = useState(0);

  const applyFilters = () => {
    handleApplyFilters(minPrice,maxPrice,minBeds,minBaths,minSqFt);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
    >
      <div>
        <TextField
          id="min-price"
          label="Min Price"
          defaultValue="0"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          id="max-price"
          label="Max Price"
          defaultValue="0"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="min-beds"
          label="Min Beds"
          defaultValue="0"
          onChange={(e) => setMinBeds(e.target.value)}
        />
        <TextField
          id="min-baths"
          label="Min Baths"
          defaultValue="0"
          onChange={(e) => setMinBaths(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="min-sqft"
          label="Min SqFt"
          defaultValue="0"
          onChange={(e) => setMinSqFt(e.target.value)}
        />
      </div>
      <Divider sx={{ margin: '15px 0px'}} />
      <div>
        <Button variant='contained' autoFocus onClick={applyFilters}>
          Apply
        </Button>
      </div>
    </Box>
  )
}

export default Filter