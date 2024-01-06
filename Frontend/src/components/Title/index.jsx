import { Container, Typography } from '@mui/material';
import React from 'react';

export default function Title(props) {
  return (
    <Container
      sx={{
        mt: 5,
        display: 'flex',
        alignItems: 'center',
        columnGap: 5
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        {props.title}
      </Typography>
      <img height={100} src={props.icon} />
    </Container>
  );
}
