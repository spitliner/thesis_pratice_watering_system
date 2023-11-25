import React, { useState } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import Navigation from '../../components/Navigation/Navigation';
import {
  Box,
  Container,
  Button,
  Typography,
  Grid,
  Switch,
  styled
} from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/Shower';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostat';

const Device = styled(Box)(({ theme }) => ({
  width: 450,
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  alignItems: 'center'
}));

const wateringDeviceList = [
  {
    id: 1,
    area: 'KV1',
    status: true
  },
  {
    id: 2,
    area: 'KV2',
    status: true
  },
  {
    id: 3,
    area: 'KV3',
    status: true
  },
  {
    id: 4,
    area: 'KV4',
    status: true
  },
  {
    id: 5,
    area: 'KV5',
    status: true
  }
];

export default function WateringTab() {
  const [change, setChange] = useState(0);
  const changeStatus = (device) => {
    device.status = !device.status;
    setChange(change + 1);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" gap={2} alignItems="center">
          <ShowerOutlinedIcon
            sx={{
              fontSize: '40px',
              borderRadius: 100,
              color: 'primary.main',
              p: 1,
              backgroundColor: '#f0e9fe'
            }}
          />
          <Typography color="primary" fontWeight={700}>
            The watering device
          </Typography>
        </Box>
        <Button variant="contained">+</Button>
      </Box>
      <Grid container rowSpacing={5} mt={0}>
        {wateringDeviceList.map((device) => (
          <Grid item xs={6}>
            <Device key={device.id}>
              <Typography color="primary">{device.area}</Typography>
              <Box>
                {device.status ? 'ON' : 'OFF'}
                <Switch
                  checked={device.status}
                  onChange={() => changeStatus(device)}
                />
              </Box>
            </Device>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
