import React, { useEffect, useState } from 'react'
import {
  Typography,
  Box,
  Grid,
  Pagination,
  Divider
} from '@mui/material'
import { PropertiesTable, Map } from '../../components'

const Properties = ({ properties }) => {
  const pageSize = 10;
  const [currentProperties, setCurrentProperties] = useState([]);

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: 0
  });

  const handlePageChange = ((event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
    setCurrentProperties(properties.slice(from, to));
  });

  useEffect(() => {
    setPagination({ ...pagination, count: properties.length });
    setCurrentProperties(properties.slice(0, pageSize));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  useEffect(() => {
    setPagination({ ...pagination, count: properties.length });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.from, pagination.to]);

  return (
    <>
      {(currentProperties.length > 0) ? (
        <div style={{ margin: '20px auto' }}>
          <Typography variant='h4'>Properties</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Map currentProps={currentProperties} />
            </Grid>
            <Grid item xs={12} md={8}>
              <PropertiesTable currentProps={currentProperties} />
            </Grid>
          </Grid>
          <Box
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            margin={'20px'}
          >
            <Divider sx={{ margin: '20px 0' }} />
            <Pagination
              count={Math.ceil(pagination.count / pageSize)}
              onChange={handlePageChange}
            />
          </Box>
        </div>
      ) : (
        <React.Fragment />
      )

      }
    </>
  )
}

export default Properties