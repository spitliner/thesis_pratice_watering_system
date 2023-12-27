import Box from '@mui/material/Box';
import Welcome from './Banners/WelcomeBanner';
import SensorInfo from './SensorInfo';
import { Typography } from '@mui/material';

function MainContent() {
  return (
    <Box
      sx={{
        width: '630px',
        height: 'calc(100vh - 32px - 35px)',
        justifyContent: 'center',
        alignItems: 'center',
        mr: 3
      }}
    >
      <Welcome />
      <Typography color="#527853" fontSize={30} fontWeight={700} my={3}>
        Current Ho Chi Minh City weather
      </Typography>
      <SensorInfo />
    </Box>
  );
}

export default MainContent;
