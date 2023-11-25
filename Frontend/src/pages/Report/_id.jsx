import * as React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDayjs from '@mui/x-date-pickers/AdapterDayjs';
import DateCalendar from '@mui/x-date-pickers/DateCalendar';
import Box from '@mui/material';
import Container from '@mui/material';
import SensorInfo from './SensorInfo';
import Table from './Table';

function _id() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: 'max-height',
        backgroundColor: 'secondary.main',
        px: 1,
        py: 1,
        display: 'flex'
      }}
    >
      {/* Navigation */}
      <Navigation />
      <Container
        maxWidth={false}
        sx={{ height: '100%', backgroundColor: 'secondary.main', py: 1 }}
      >
        {/* Header */}
        <AppBar />
        {/* Content */}
        <Container
          sx={{
            backgroundColor: 'secondary.main',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 5,
            width: '80%'
          }}
        >
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                style={{
                  width: 300,
                  height: 300,
                  border: '1px solid #ccc',
                  borderRadius: 5
                }}
              />
            </LocalizationProvider>
          </Box>
          <SensorInfo />
        </Container>
        <Container
          sx={{
            backgroundColor: 'secondary.main',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            width: '80%'
          }}
        >
          <Table />
        </Container>
      </Container>
    </Container>
  );
}

export default _id;