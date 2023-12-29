import Welcome from './Banners/WelcomeBanner';
import SensorInfo from './SensorInfo';
import { Typography, Box } from '@mui/material';

function MainContent() {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 900
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
