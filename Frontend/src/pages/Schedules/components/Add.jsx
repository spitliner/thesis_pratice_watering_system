import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment
} from '@mui/material';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import useQueryDevice from '../hooks/useQueryDevice';
import { deviceType } from '../../../constants/device';
import { validSchedule } from '../../../utils';
import SuspenseLoader from '../../../components/SuspenseLoader';
import ErrorDialog from './ErrorMessage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ButtonGroup from './ButtonGroup';
dayjs.extend(customParseFormat);

function Add(props) {
  const { onClose } = props;
  const { onSaveDataById } = useMutateDeviceById();
  const { deviceList, isLoading } = useQueryDevice();

  const [selectedTime, setSelectedTime] = useState('');
  const [device, setDevice] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

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
    if (isValid) {
      onSaveDataById([
        selectedDevice.id,
        'schedules',
        {
          schedules: newScheduleList
        }
      ]);
      onClose();
    }
  };

  const waterDevices = deviceList?.filter(
    (device) => device.type === deviceType.water
  );

  if (isLoading) return <SuspenseLoader />;
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            mt: 4
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" rowGap={3}>
              <Typography
                sx={{
                  fontSize: '25px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Add Task
              </Typography>
              <TextField
                label="Device"
                variant="outlined"
                fullWidth
                select
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
                required
              />
              <TextField
                type="number"
                label="Duration time"
                variant="outlined"
                fullWidth
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
              <ButtonGroup onClose={onClose} />
            </Box>
          </form>
        </Box>
      </Container>
      <ErrorDialog open={errorMessage} onClose={() => setErrorMessage(false)} />
    </>
  );
}

export default Add;
