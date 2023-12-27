import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import useQueryDevice from '../hooks/useQueryDevice';
import useQueryDeviceById from '../hooks/useQueryDeviceById';
import useMutateDeviceById from '../hooks/useMutateDeviceById';
import { Modal, Typography } from '@mui/material';
import { deviceType } from '../../../constants/device';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Edit from './Edit';
dayjs.extend(customParseFormat);

function Board() {
  const { deviceList } = useQueryDevice();
  const { onSaveDataById } = useMutateDeviceById();
  const [onEdit, setOnEdit] = React.useState(false);
  const handleDelete = (id) => {
    onSaveDataById([id, 'schedules', { schedules: [] }]);
  };
  const handleEdit = () => {
    setOnEdit(true);
  };

  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box></Box>
        <Box>
          <Button
            component={Link}
            to="/schedules/add"
            variant="contained"
            sx={{
              backgroundColor: '#aed581',
              width: '70px',
              display: 'flex',
              align: 'right',
              my: 2
            }}
          >
            ADD
          </Button>
        </Box>
      </Box>
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
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deviceList?.map(
              (device, index) =>
                device.type === deviceType.water &&
                device?.schedules && (
                  <TableRow
                    key={index}
                    sx={{ border: 1, borderColor: '#e0e0e0' }}
                  >
                    <TableCell
                      sx={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#7A40F2',
                        textAlign: 'center' // Set text alignment to center
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

                    {device?.schedules?.length > 0 && (
                      <TableCell>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            columnGap: 2
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#FF7961', width: '70px' }}
                            onClick={() => handleDelete(device.id)}
                          >
                            DELETE
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: '#b39ddb', width: '70px' }}
                            onClick={() => handleEdit()}
                          >
                            EDIT
                          </Button>
                          <Modal open={onEdit}>
                            <Edit
                              device={device}
                              onClose={() => setOnEdit((prev) => !prev)}
                            />
                          </Modal>
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                )
            )}
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
