import React from 'react'
import { Container } from '@mui/material'
import Logo from '../videos/home-services-video.mp4'

const Home = () => {
  const videoSrc = Logo;
  const poster = '/logo_1.png';

  return (
    <>
      <Container sx={{
        height: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',
      }}>
        <video
          src={videoSrc}
          poster={poster}
          autoPlay
          height='100%'
          width='100%'
          loop
          muted
        />
      </Container>
    </>
  )
}

export default Home