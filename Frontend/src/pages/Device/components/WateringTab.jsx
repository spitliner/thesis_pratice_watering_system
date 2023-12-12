import React, { useState } from 'react';
import { Box, Button, Typography, Grid, styled } from '@mui/material';
import ShowerOutlinedIcon from '@mui/icons-material/Shower';
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
  value: 'Watering',
  label: 'Watering'
};

export default function WateringTab(props) {
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
        <Button variant="contained" onClick={() => setOpen(true)}>
          +
        </Button>
      </Box>

      <CreateForm open={open} handleClose={() => setOpen(false)} />

      <Grid container rowSpacing={5} mt={0}>
        {deviceList.map(
          (device) =>
            device?.type == 'Watering' && (
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
