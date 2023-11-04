import Box from '@mui/material/Box'
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded'
import Typography from '@mui/material/Typography'
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded'

function SensorInfo() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      my: 3
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}>
        <WbSunnyRoundedIcon sx={{ fontSize: '100px', color: '#F4C427' }} />
        <Typography sx={{ fontSize: '60px', fontWeight: 'bold', color: 'black' }}>50°C</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2
      }}>
        <WaterDropRoundedIcon sx={{ fontSize: '100px', color: '#3ACBE9' }} />
        <Typography sx={{ fontSize: '60px', fontWeight: 'bold', color: 'black' }}>70%</Typography>
      </Box>
    </Box>
  )
}

export default SensorInfo