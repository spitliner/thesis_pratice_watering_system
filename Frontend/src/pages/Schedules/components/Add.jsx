import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Snackbar,
  Alert,
  AlertTitle
} from '@mui/material';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { useNavigate } from 'react-router-dom';
import useQueryDevice from '../hooks/useQueryDevice';
import { deviceType } from '../../../constants/device';
import { InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { validSchedule } from '../../../utils';
dayjs.extend(customParseFormat);

function Add() {
  const { onSaveDataById } = useMutateDeviceById();
  const { deviceList } = useQueryDevice();
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState('');
  const [device, setDevice] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const handleCancel = () => {
    navigate('/schedules');
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedDevice = deviceList?.find((item) => item.name === device);

    const newScheduleList = selectedDevice?.schedules
      ? [...selectedDevice?.schedules, [selectedTime, duration]]
      : [[selectedTime, duration]];
    const isValid = validSchedule(newScheduleList);
    setErrorMessage(!isValid);
    if (!isValid) return;

    onSaveDataById([
      selectedDevice.id,
      'schedules',
      {
        schedules: newScheduleList
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
                <MenuItem key={device.name} value={device.name}>
                  {device.name}
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
      <Snackbar
        open={errorMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setErrorMessage(false)}
        style={{ justifyContent: 'center' }}
      >
        <Alert open={errorMessage} severity="error" sx={{ width: 400 }}>
          <AlertTitle>Time between each schedule must {'>'} 300s !</AlertTitle>
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Add;
