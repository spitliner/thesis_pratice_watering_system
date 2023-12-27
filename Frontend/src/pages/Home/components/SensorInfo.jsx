import Box from '@mui/material/Box';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import Typography from '@mui/material/Typography';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import fetchWeatherData from '../../../common/weatherAPI';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

function SensorInfo() {
  const [weatherData, setWeatherData] = useState(null);
  const getWeatherData = async () => {
    const weather = await fetchWeatherData();
    setWeatherData(weather);
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  if (!weatherData) return null;

  return (
    <Grid container rowGap={5}>
      <Grid container>
        <Grid item md={6}>
          <Typography
            sx={{ fontSize: 20, color: '#607274', fontWeight: 500, mb: 2 }}
          >
            Temperature
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <WbSunnyRoundedIcon sx={{ fontSize: '100px', color: '#F4C427' }} />
            <Typography sx={{ fontSize: '60px', fontWeight: 'bold' }}>
              {Math.round(weatherData?.main?.temp)}°C
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Typography
            sx={{ fontSize: 20, color: '#607274', fontWeight: 500, mb: 2 }}
          >
            Humidity
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <WaterDropRoundedIcon
              sx={{ fontSize: '100px', color: '#3ACBE9' }}
            />
            <Typography sx={{ fontSize: '60px', fontWeight: 'bold' }}>
              {Math.round(weatherData?.main?.humidity)}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={6}>
          <Typography
            sx={{ fontSize: 20, color: '#607274', fontWeight: 500, mb: 2 }}
          >
            Cloud
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <CloudIcon sx={{ fontSize: '100px', color: '#96EFFF' }} />
            <Typography sx={{ fontSize: '60px', fontWeight: 'bold' }}>
              {Math.round(weatherData?.clouds?.all)}%
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Typography
            sx={{ fontSize: 20, color: '#607274', fontWeight: 500, mb: 2 }}
          >
            Wind
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <AirIcon sx={{ fontSize: '100px', color: '#BEF0CB' }} />
            <Typography sx={{ fontSize: '60px', fontWeight: 'bold' }}>
              {Math.round(weatherData?.wind?.speed)}m/s
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SensorInfo;
