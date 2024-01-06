import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Container, Typography } from '@mui/material';
import Table from './components/Table';
import dayjs from 'dayjs';
import useQueryDevice from '../Device/hooks/useQueryDevice';
import HumidChart from './components/HumidChart';
import TempChart from './components/TempChart';
import { deviceType } from '../../constants/device';
import reportSVG from '../../assets/report.svg';
import Title from '../../components/Title';
import ErrorBarChart from './components/ErrorBarChart';

function _id() {
  const [date, setDate] = useState(dayjs());
  const { deviceList } = useQueryDevice();

  const tempDevice = deviceList?.filter(
    (device) => device.type === deviceType.temp
  );
  const humidDevice = deviceList?.filter(
    (device) => device.type === deviceType.humid
  );

  if (!deviceList) return null;
  return (
    <>
      <Title title="REPORT" icon={reportSVG} />
      <Container
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          mt: 3,
          rowGap: 3,
          p: 2
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
            </LocalizationProvider>
          </Box>
        </Box>

        <TempChart date={date} deviceID={tempDevice[0]?.id} />
        <HumidChart date={date} deviceID={humidDevice[0]?.id} />
        <ErrorBarChart
          date={date}
          humidDeviceID={humidDevice[0]?.id}
          tempDeviceID={tempDevice[0]?.id}
          tempRange={[20, 35]}
          humidRange={[30, 85]}
        />
        <Table deviceList={deviceList} />
      </Container>
    </>
  );
}

export default _id;
