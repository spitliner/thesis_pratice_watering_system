import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Container, Typography } from '@mui/material';
import Table from './components/Table';
import dayjs from 'dayjs';
import useQueryDevice from '../Device/hooks/useQueryDevice';
import HumidChart from './components/HumidChart';
import TempChart from './components/TempChart';
import { deviceRange, deviceType } from '../../constants/device';
import reportSVG from '../../assets/report.svg';
import Title from '../../components/Title';
import ErrorBarChart from './components/ErrorBarChart';
import { useDispatch } from 'react-redux';
import { setHumDevice, setPumpDevice, setTempDevice } from './deviceListSlice';
import { saveAs } from 'file-saver'; // Import saveAs from file-saver
import * as XLSX from 'xlsx';

function _id() {
  const [date, setDate] = useState(dayjs());
  const { deviceList } = useQueryDevice();
  const dispatch = useDispatch();

  const tempDevice = deviceList?.filter(
    (device) => device.type === deviceType.temp
  );
  const humidDevice = deviceList?.filter(
    (device) => device.type === deviceType.humid
  );
  const pumpDevice = deviceList?.filter(
    (device) => device.type === deviceType.water
  );

  const handleDownloadExcel = () => {
    const devicesData = [
      { data: tempDevice, sheetName: 'Temperature_Device' },
      { data: humidDevice, sheetName: 'Humidity_Device' },
      { data: pumpDevice, sheetName: 'Pump_Device' }
    ];

    const wb = XLSX.utils.book_new();

    devicesData.forEach(({ data, sheetName }) => {
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(data, 'devices_data.xlsx');
  };

  useEffect(() => {
    dispatch(setTempDevice(tempDevice));
    dispatch(setHumDevice(humidDevice));
    dispatch(setPumpDevice(pumpDevice));
  }, [tempDevice, humidDevice, pumpDevice]);

  if (!deviceList) return null;
  return (
    <>
      <Title title="REPORT" icon={reportSVG} />
      <Button
        variant="contained"
        onClick={handleDownloadExcel}
        sx={{ width: 150, bgcolor: '#7077A1' }}
      >
        Download Excel
      </Button>
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
        {tempDevice?.map((device) => (
          <TempChart key={device.id} date={date} device={device} />
        ))}
        {humidDevice?.map((device) => (
          <HumidChart key={device.id} date={date} device={device} />
        ))}
        {/* <ErrorBarChart
          date={date}
          humidDeviceID={humidDevice[0]?.id}
          tempDeviceID={tempDevice[0]?.id}
          tempRange={deviceRange.tempRange}
          humidRange={deviceRange.humidRange}
        /> */}
      </Container>
      <Container
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          mt: 5,
          rowGap: 3,
          p: 2
        }}
      >
        <Table date={date} deviceList={deviceList} />
      </Container>
    </>
  );
}

export default _id;
