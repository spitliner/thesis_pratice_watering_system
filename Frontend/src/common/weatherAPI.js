import axios from 'axios';

const API_KEY = '038fbff6500c60b52b8bc4e77011526e';
const OPEN_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

const OPEN_METEO = 'https://archive-api.open-meteo.com/v1/archive';
// latitude = 10.823099 & longitude=106.629662 & start_date=2023 - 12-01 & end_date=2023 - 12 -08 & daily=temperature_2m_mean, rain_sum & timezone=Asia % 2FBangkok

const fetchCurentWeatherData = async () => {
  try {
    const response = await axios.get(OPEN_WEATHER_API, {
      params: {
        lat: 10.823099,
        lon: 106.629662,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const fetchHistoricWeatherData = async (props) => {
  try {
    const response = await axios.get(OPEN_METEO, {
      params: {
        latitude: 10.823099,
        longitude: 106.629662,
        daily: 'temperature_2m_mean,rain_sum',
        timezone: 'Asia/Bangkok',
        ...props
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export default fetchCurentWeatherData;
