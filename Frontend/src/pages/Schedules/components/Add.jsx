import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { useNavigate } from 'react-router-dom';

function Add() {
  const { onSaveDataById } = useMutateDeviceById();
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState('');
  const [device, setDevice] = useState('');
  const [water, setWater] = useState('');

  const handleCancel = () => {
    navigate('/schedules');
  };

  const handleDeviceChange = (event) => {
    setDevice(event.target.value);
  };

  const handleTimeChange = (event) => {
    console.log(typeof event.target.value);
    setSelectedTime(event.target.value);
  };

  const handleWaterChange = (event) => {
    console.log(event.target.value);
    setWater(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    onSaveDataById([device, 'schedules', { schedules: [selectedTime, water] }]);
  };

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
              InputLabelProps={{ shrink: true }}
              value={device}
              onChange={handleDeviceChange}
            >
              <MenuItem value="KV101">KV101</MenuItem>
              <MenuItem value="KV102">KV102</MenuItem>
              <MenuItem value="DV03">DV03</MenuItem>
              <MenuItem value="DV04">DV04</MenuItem>
              <MenuItem value="DV05">DV05</MenuItem>
            </TextField>

            <TextField
              type="time"
              variant="outlined"
              fullWidth
              value={selectedTime}
              onChange={handleTimeChange}
              sx={{ mb: 2 }}
            />

            <TextField
              type="number"
              label="Amount of Water"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={water}
              onChange={handleWaterChange}
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
