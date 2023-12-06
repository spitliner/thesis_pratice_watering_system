import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'

const data = [
  ['KV01', '9 Oct 8:00 AM', '500'],
  ['KV01', '9 Oct 8:00 AM', '250'],
  ['KV03', '10 Oct 4:00 PM', '1000'],
  ['KV04', '11 Oct 4:00 PM', '1000'],
  ['KV01', '11 Oct 5:00 PM', '1000'],
  ['KV05', '12 Oct 8:00 AM', '500'],
  ['KV05', '12 Oct 5:00 PM', '500']
]

function Board() {
  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box></Box>
        <Box>
          <Button component={Link} to="/schedules/add" variant="contained" sx={{
            backgroundColor: '#aed581',
            width: '70px',
            display: 'flex',
            align: 'right',
            my: 2
          }}>
            ADD
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#7A40F2' }}>DEVICE</TableCell>
              <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#F2946D' }}>DATE</TableCell>
              <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#7A40F2' }}>AMOUNT OF WATER</TableCell>
              <TableCell sx={{ fontSize: '18px', fontWeight: 'bold', color: '#F2946D' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} sx={{ fontSize: '16px', fontWeight: 500, color: cellIndex % 2 === 0 ? '#7A40F2' : '#F2946D' }}>
                    {cell}
                  </TableCell>
                ))}
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: '#FF7961', mr: 2, width: '70px' }}>
                    DELETE
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#b39ddb', width: '70px' }}>
                    EDIT
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Board