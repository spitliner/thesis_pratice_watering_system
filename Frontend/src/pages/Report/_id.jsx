import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, Typography } from '@mui/material';
import Table from './components/Table';
import Charts from './components/TempChart';
import dayjs from 'dayjs';
import useQueryDevice from '../Device/hooks/useQueryDevice';
import useQueryDeviceById from './hooks/useQueryDeviceById';
import HumidChart from './components/HumidChart';
import TempChart from './components/TempChart';

const today = new Date(); // get today's date
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

function _id() {
  const [date, setDate] = useState(dayjs());
  const { deviceList } = useQueryDevice();

  // const { data: tempData } = useQueryDeviceById('temperature');

  if (!deviceList) return null;
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" fontWeight={700}>
          REPORT
        </Typography>
      </Container>

      <Container
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          mt: 3,
          rowGap: 3,
          p: 2
          // width: '100%'
        }}
      >
        <Box>
          <Typography fontWeight={700} fontSize={18} mb={2}>
            Calendar
          </Typography>
          <Box width={480} display="flex" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs()}
                value={date}
                onChange={(val) => {
                  setDate(dayjs(val));
                }}
                sx={{ width: '100%' }}
              />
              {/* <DateCalendar
                style={{
                  border: '1px solid #666666',
                  borderRadius: 5
                }}
                maxDate={dayjs(yesterday)}
                value={date}
                onChange={(val) => {
                  setDate(dayjs(val));
                }}
              /> */}
            </LocalizationProvider>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start'
          }}
        >
          {/* <Charts date={date} type="Line" tempChartData={tempData?.feed} /> */}
          {/* <Charts date={date} type="Bar" chartData={humidData?.feed} /> */}
          <TempChart date={date} />
          <HumidChart date={date} />
        </Box>

        <Box justifyContent="center">
          <Typography fontWeight={700} fontSize={22} color="#5C8374" mb={2}>
            Pump status
          </Typography>
          <Table deviceList={deviceList} />
        </Box>
      </Container>
    </>
  );
}

export default _id;
