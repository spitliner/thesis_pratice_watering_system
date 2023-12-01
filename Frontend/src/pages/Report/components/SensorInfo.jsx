import { Box, Typography } from '@mui/material';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';

function SensorInfo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        my: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}
      >
        <WbSunnyRoundedIcon sx={{ fontSize: '120px', color: '#F4C427' }} />
        <Typography
          sx={{ fontSize: '80px', fontWeight: 'bold', color: 'black' }}
        >
          35°C
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}
      >
        <WaterDropRoundedIcon sx={{ fontSize: '120px', color: '#3ACBE9' }} />
        <Typography
          sx={{ fontSize: '80px', fontWeight: 'bold', color: 'black' }}
        >
          65%
        </Typography>
      </Box>
    </Box>
  );
}

export default SensorInfo;
