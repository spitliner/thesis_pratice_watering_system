import React from 'react';
import { SunIcon } from '@heroicons/react/24/outline';
import { Box, Container, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import sun from './sun.json';

export default function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sun,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Lottie options={defaultOptions} height={200} width={200} />
      <Typography sx={{ mt: 5, fontSize: 20, fontWeight: 700 }}>
        Pleas wait for a few seconds
      </Typography>
    </Container>
  );
}
