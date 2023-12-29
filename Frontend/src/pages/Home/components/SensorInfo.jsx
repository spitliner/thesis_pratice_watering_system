import { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import fetchWeatherData from '../../../common/weatherAPI';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import Card from '../../../components/Card';

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

  const commonTextStyle = {
    fontSize: 18,
    color: '#607274',
    fontWeight: 500,
    mb: 1
  };

  const infoTextStyle = {
    fontSize: '50px',
    fontWeight: 'bold'
  };

  const iconContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 2
  };

  return (
    <Grid container rowGap={1}>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <Typography sx={commonTextStyle}>Temperature</Typography>
            <Box sx={iconContainerStyle}>
              <WbSunnyRoundedIcon sx={{ fontSize: '90px', color: '#F4C427' }} />
              <Typography sx={infoTextStyle}>
                {Math.round(weatherData?.main?.temp)}°C
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <Typography sx={commonTextStyle}>Humidity</Typography>
            <Box sx={iconContainerStyle}>
              <WaterDropRoundedIcon
                sx={{ fontSize: '90px', color: '#3ACBE9' }}
              />
              <Typography sx={infoTextStyle}>
                {Math.round(weatherData?.main?.humidity)}%
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <Typography sx={commonTextStyle}>Cloud</Typography>
            <Box sx={iconContainerStyle}>
              <CloudIcon sx={{ fontSize: '90px', color: '#96EFFF' }} />
              <Typography sx={infoTextStyle}>
                {Math.round(weatherData?.clouds?.all)}%
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <Typography sx={commonTextStyle}>Wind</Typography>
            <Box sx={iconContainerStyle}>
              <AirIcon sx={{ fontSize: '90px', color: '#BEF0CB' }} />
              <Typography sx={infoTextStyle}>
                {Math.round(weatherData?.wind?.speed)}m/s
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SensorInfo;
