import React from 'react';
import { SunIcon } from '@heroicons/react/24/outline';
import { Box, Button, Container, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import notFound from './404.json';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
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
      <Lottie options={defaultOptions} height={400} width={400} />
      <Typography variant="h5" sx={{ mt: 2 }}>
        This page could not be found.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, padding: 2, fontSize: 18 }}
        onClick={() => navigate('/')}
      >
        Go to home
      </Button>
    </Container>
  );
}
