import React from 'react';
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

const data = [
  ['KV01', '8:00', '500'],
  ['KV01', '10:00', '250'],
  ['KV03', '4:00', '1000'],
  ['KV04', '4:00', '1000'],
  ['KV01', '15:00', '1000'],
  ['KV05', '8:00', '500'],
  ['KV05', '5:00', '500']
];

function Board() {
  const { deviceList } = useQueryDevice();
  const { onSaveDataById } = useMutateDeviceById();
  const handleDelete = (id) => {
    onSaveDataById([id, 'schedules', { schedules: [] }]);
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
                WATER (ML)
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
            {deviceList?.map((device, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#7A40F2',
                    textAlign: 'center' // Set text alignment to center
                  }}
                >
                  {device.id}
                </TableCell>
                {device.schedules.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: cellIndex % 2 === 0 ? '#7A40F2' : '#F2946D',
                      textAlign: 'center' // Set text alignment to center
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#FF7961', width: '70px' }}
                      onClick={() => handleDelete(device.id)}
                    >
                      DELETE
                    </Button>
                    {/* <Button
                      variant="contained"
                      sx={{ backgroundColor: '#b39ddb', width: '70px' }}
                    >
                      EDIT
                    </Button> */}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Board;
