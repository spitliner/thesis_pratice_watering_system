import Box from '@mui/material/Box';
import Welcome from './Banners/WelcomeBanner';
import SensorInfo from './SensorInfo';
import Chart from './Chart';

function MainContent() {
  return (
    <Box
      sx={{
        width: '300px',
        height: 'calc(100vh - 32px - 35px)',
        justifyContent: 'center',
        alignItems: 'center',
        mr: 3
      }}
    >
      <Welcome />
      <SensorInfo />
      <Chart />
    </Box>
  );
}

export default MainContent;
