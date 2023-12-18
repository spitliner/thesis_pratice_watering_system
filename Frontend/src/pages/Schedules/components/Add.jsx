import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { useNavigate } from 'react-router-dom';
import useQueryDevice from '../hooks/useQueryDevice';
import { deviceType } from '../../../constants/device';
import { InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function Add() {
  const { onSaveDataById } = useMutateDeviceById();
  const { deviceList } = useQueryDevice();
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState('');
  const [device, setDevice] = useState('');
  const [duration, setDuration] = useState('');

  const handleCancel = () => {
    navigate('/schedules');
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  const handleTimeChange = (event) => {
    console.log(event.target.value);
    setSelectedTime(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedDevice = deviceList?.find((item) => item.id === device);
    debugger;
    // for (let i in selectedDevice?.schedules) {
    //   const startTime = selectedDevice.schedules[i][0];
    //   const existSchedule = dayjs(startTime, 'HH:mm');
    //   const newSchedule = dayjs(selectedTime, 'HH:mm');
    //   let betweenTime = 0;
    //   if (newSchedule.isAfter(existSchedule)) {
    //     betweenTime = Math.abs(
    //       newSchedule.diff(
    //         existSchedule.add(Number(selectedDevice.schedules[i][1]), 'second'),
    //         'second'
    //       )
    //     );
    //   }
    //   if (newSchedule.isBefore(existSchedule)) {
    //     betweenTime = Math.abs(
    //       newSchedule
    //         .add(Number(duration), 'second')
    //         .diff(existSchedule, 'second')
    //     );
    //   }
    //   if (betweenTime < 300) return;
    // }
    // debugger;
    // selectedDevice?.schedules
    //   ? selectedDevice.schedules.push([selectedTime, duration])
    //   : [selectedTime, duration];
    // onSaveDataById([
    //   device,
    //   'schedules',
    //   {
    //     schedules: selectedDevice?.schedules
    //   }
    // ]);
    const newSchedule = dayjs(selectedTime, 'HH:mm');

    for (const [startTime, scheduleDuration] of selectedDevice.schedules) {
      const existSchedule = dayjs(startTime, 'HH:mm');
      const betweenTime = Math.abs(
        newSchedule.isAfter(existSchedule)
          ? Math.abs(
              newSchedule.diff(
                existSchedule.add(Number(scheduleDuration), 'second'),
                'second'
              )
            )
          : newSchedule
              .add(Number(duration), 'second')
              .diff(existSchedule, 'second')
      );

      if (betweenTime < 60) {
        return; // Nếu khoảng thời gian nhỏ hơn 300 giây, ngừng xử lý
      }
    }

    selectedDevice.schedules.push([selectedTime, duration]);

    onSaveDataById([
      device,
      'schedules',
      {
        schedules: selectedDevice.schedules
      }
    ]);
  };

  const waterDevices = deviceList?.filter(
    (device) => device.type === deviceType.water
  );

  if (!deviceList) return null;
  return (
    <Box
      sx={{
        backgroundColor: '#c8e6c9',
        height: '650px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 2,
        borderRadius: 5
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography
              sx={{ fontSize: '25px', fontWeight: 'bold', textAlign: 'center' }}
            >
              Add Task
            </Typography>
            <TextField
              label="Device"
              variant="outlined"
              fullWidth
              select
              sx={{ mb: 2, mt: 3 }}
              value={device}
              onChange={handleDeviceChange}
              required
            >
              {waterDevices?.map((device) => (
                <MenuItem key={device.id} value={device.id}>
                  {device.id}
                </MenuItem>
              ))}
              {waterDevices?.length === 0 && (
                <MenuItem sx={{ fontStyle: 'italic', color: 'gray' }}>
                  No watering device
                </MenuItem>
              )}
            </TextField>

            <TextField
              type="time"
              label="Start time"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={selectedTime}
              onChange={handleTimeChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              type="number"
              label="Duration time"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={duration}
              onChange={handleDurationChange}
              InputProps={{
                inputProps: { min: 0 },
                endAdornment: (
                  <InputAdornment position="end">seconds</InputAdornment>
                )
              }}
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#aed581',
                  width: '45%',
                  mt: 2
                }}
              >
                Add
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                sx={{
                  width: '45%',
                  mt: 2
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Add;
