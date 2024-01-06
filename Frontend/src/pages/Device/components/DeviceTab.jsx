import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  styled,
  Modal,
  Container,
  Dialog
} from '@mui/material';
import CreateForm from './CreateForm';
import useMutateDeleteDevice from '../hooks/useMutateDeleteById';
import ConfirmDialog from '../../../components/ConfirmDialog';

const Device = styled(Box)(({ theme }) => ({
  width: 480,
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  alignItems: 'center'
}));

export default function DeviceTab(props) {
  const { deviceList, title, typeOfDevice, icon } = props;
  const { onDeleteData } = useMutateDeleteDevice();
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState({
    id: '',
    name: ''
  });

  const handleDelete = (id, name) => {
    setSelectedDevice({ id: id, name: name });
    setIsDelete(true);
  };

  if (!deviceList) return null;
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" gap={2} alignItems="center">
          {React.cloneElement(icon, {
            sx: {
              fontSize: '40px',
              borderRadius: 100,
              color: 'primary.main',
              p: 1,
              backgroundColor: '#f0e9fe'
            }
          })}
          <Typography color="primary" fontWeight={700}>
            The {title} device
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          +
        </Button>
      </Box>
      <CreateForm
        open={open}
        handleClose={() => setOpen(false)}
        defaultDevice={typeOfDevice}
      />

      <Grid container rowSpacing={5} mt={0}>
        {deviceList.map(
          (device) =>
            device?.type == typeOfDevice && (
              <Grid key={device.id} item xs={6}>
                <Device>
                  <Typography color="primary" width={120}>
                    {device.name}
                  </Typography>
                  <Typography color="primary" width={180}>
                    Feed ID: {device.feedID}
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(device.id, device.name)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Device>
              </Grid>
            )
        )}
        <ConfirmDialog
          open={isDelete}
          handleClose={setIsDelete}
          onDelete={onDeleteData}
          device={selectedDevice}
          title="device"
        />
      </Grid>

      {deviceList.length === 0 && (
        <Typography
          fontSize={18}
          fontStyle="italic"
          textAlign="center"
          color="gray"
          mt={10}
        >
          There is no device
        </Typography>
      )}
    </>
  );
}
