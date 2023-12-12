import React, { useState } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container } from '@mui/material';
import Table from './components/Table';
import Charts from './components/Chart';
import dayjs from 'dayjs';
import useQueryDevice from '../Device/hooks/useQueryDevice';

const today = new Date(); // get today's date
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

function _id() {
  const [date, setDate] = useState(dayjs(yesterday));
  const { deviceList } = useQueryDevice();

  if (!deviceList) return null;
  return (
    <>
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Box mb={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {/* <DatePicker
                maxDate={dayjs(yesterday)}
                value={date}
                onChange={(val) => {
                  setDate(dayjs(val));
                }}
                sx={{ width: '100%' }}
              /> */}
              <DateCalendar
                style={{
                  border: '1px solid #ccc',
                  borderRadius: 5
                }}
                maxDate={dayjs(yesterday)}
                value={date}
                onChange={(val) => {
                  setDate(dayjs(val));
                }}
              />
            </LocalizationProvider>
          </Box>
          <Table deviceList={deviceList} />
        </Box>
        <Charts date={date} />
      </Container>
    </>
  );
}

export default _id;
