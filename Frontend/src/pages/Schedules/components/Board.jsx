import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
  Switch
} from '@mui/material';
import useQueryDevice from '../hooks/useQueryDevice';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { Modal, Typography } from '@mui/material';
import { deviceType } from '../../../constants/device';
import Edit from './Edit';
import Add from './Add';
import SuspenseLoader from '../../../components/SuspenseLoader';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setPumpDevice } from '../../Report/deviceListSlice';
dayjs.extend(customParseFormat);

function Board() {
  const { deviceList, isLoading } = useQueryDevice();
  const { onSaveDataById } = useMutateDeviceById();
  const dispatch = useDispatch();
  const [onEdit, setOnEdit] = useState({ status: false, id: '' });
  const [onAdd, setOnAdd] = useState(false);
  const [isDelete, setIsDelete] = useState({ status: false, id: '' });

  const handleDelete = (id) => {
    onSaveDataById([id, 'schedules', { schedules: [] }]);
  };
  const handleTriggerPump = (id, status) => {
    // const status = e.target.checked ? 'ON' : 'OFF';
    console.log(status);
    onSaveDataById([id, 'status', { status: status }]);
  };
  const pumpDevices = (deviceList || [])
    .filter((item) => item.type === deviceType.water)
    .map((item) => ({
      ...item,
      schedules: item.schedules || []
    }));

  console.log(pumpDevices);

  useEffect(() => {
    dispatch(setPumpDevice(pumpDevices));
  }, [pumpDevices]);

  if (isLoading) return <SuspenseLoader />;

  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary',
            width: '100px',
            my: 2
          }}
          onClick={() => setOnAdd(true)}
        >
          NEW
        </Button>
      </Box>
      <Modal open={onAdd}>
        <Add onClose={() => setOnAdd((prev) => !prev)} />
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#7A40F2',
                  textAlign: 'center'
                }}
              >
                DEVICE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#F2946D',
                  textAlign: 'center'
                }}
              >
                TIME
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#7A40F2',
                  textAlign: 'center'
                }}
              >
                DURATION (seconds)
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#F2946D',
                  textAlign: 'center'
                }}
              >
                SCHEDULE
              </TableCell>
              <TableCell
                sx={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#7A40F2',
                  textAlign: 'center'
                }}
              >
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pumpDevices?.map((device, index) => (
              <TableRow key={index} sx={{ border: 1, borderColor: '#e0e0e0' }}>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#7A40F2',
                    textAlign: 'center'
                  }}
                >
                  {device.name}
                </TableCell>

                <TableCell sx={{ textAlign: 'center' }}>
                  {device.schedules?.map((time, index) => (
                    <Typography
                      key={index + time[0]}
                      sx={{ fontWeight: 500, color: '#F2946D' }}
                    >
                      {time[0]}
                    </Typography>
                  ))}
                </TableCell>

                <TableCell sx={{ textAlign: 'center' }}>
                  {device.schedules?.map((time, index) => (
                    <Typography
                      key={index + time[1]}
                      sx={{ fontWeight: 500, color: '#7A40F2' }}
                    >
                      {time[1]}
                    </Typography>
                  ))}
                </TableCell>

                <TableCell
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      flexDirection: 'row'
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#FF7961',
                        width: '70px'
                      }}
                      onClick={() =>
                        setIsDelete({ status: true, id: device?.id })
                      }
                    >
                      DELETE
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#b39ddb', width: '70px' }}
                      onClick={() =>
                        setOnEdit({ status: true, id: device?.id })
                      }
                    >
                      EDIT
                    </Button>
                    <Modal open={onEdit.id === device.id && onEdit.status}>
                      <Edit
                        device={device}
                        onClose={() => setOnEdit({ status: false, id: '' })}
                      />
                    </Modal>
                    <ConfirmDialog
                      open={isDelete.id === device.id && isDelete.status}
                      handleClose={() => setIsDelete({ status: false, id: '' })}
                      onDelete={handleDelete}
                      device={device}
                      title="schedule"
                    />
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 2,
                      flexDirection: 'row'
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: '70px', bgcolor: 'grey.500' }}
                      onClick={() => handleTriggerPump(device?.id, 'OFF')}
                    >
                      OFF
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: '70px' }}
                      onClick={() => handleTriggerPump(device?.id, 'ON')}
                    >
                      ON
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {deviceList?.length === 0 && (
            <Typography
              fontSize={18}
              fontStyle="italic"
              textAlign="center"
              color="gray"
              mt={3}
            >
              There is no device
            </Typography>
          )}
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Board;
