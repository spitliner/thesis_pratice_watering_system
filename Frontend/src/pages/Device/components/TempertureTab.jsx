import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, styled } from '@mui/material';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostat';
import CreateForm from './CreateForm';
import useMutateDeleteDevice from '../hooks/useMutateDeleteById';

const Device = styled(Box)(({ theme }) => ({
  width: 450,
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  alignItems: 'center'
}));

const deviceType = {
  value: 'Temperture',
  label: 'Temperture'
};

export default function TempertureTab(props) {
  const { deviceList } = props;
  const { onDeleteData } = useMutateDeleteDevice();
  const [open, setOpen] = useState(false);

  const handleDelete = (id) => {
    onDeleteData(id);
  };

  if (!deviceList) return null;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" gap={2} alignItems="center">
          <DeviceThermostatOutlinedIcon
            sx={{
              fontSize: '40px',
              borderRadius: 100,
              color: 'primary.main',
              p: 1,
              backgroundColor: '#f0e9fe'
            }}
          />
          <Typography color="primary" fontWeight={700}>
            The temperture measuring device
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          +
        </Button>
      </Box>

      <CreateForm open={open} handleClose={() => setOpen(false)} />

      <Grid container rowSpacing={5} mt={0}>
        {deviceList.map(
          (device) =>
            device?.type == 'Temperture' && (
              <Grid key={device.id} item xs={6}>
                <Device>
                  <Typography color="primary">{device.name}</Typography>
                  <Typography color="primary">
                    apiKey: {device.apiKey}
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Device>
              </Grid>
            )
        )}
      </Grid>
    </>
  );
}
