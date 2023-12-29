import { Box, styled } from '@mui/material';
import React from 'react';

export default function Card({ children, sx }) {
  return (
    <Box
      sx={[
        {
          background: '#ffff',
          padding: 2,
          marginBottom: 3,
          boxShadow: '0px 1px 6px #aae2f7',
          justifyContent: 'center',
          alignItems: 'center'
        },
        sx
      ]}
    >
      {children}
    </Box>
  );
}
