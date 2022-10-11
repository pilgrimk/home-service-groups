import React from 'react'
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material'

const NotFound = () => {
  const params = useParams();

  return (
    <Container sx={{
      margin: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Typography variant='h3' component='p'>
        404 - "{params.pageName}" page not found!
      </Typography>
    </Container>
  )
}

export default NotFound