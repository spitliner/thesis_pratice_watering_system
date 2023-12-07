// deviceApi.js
import axios from 'axios';

const baseURL = 'http://localhost:9000/api';

const deviceApi = {
  getDeviceList: async (token) => {
    try {
      const response = await axios.get(`${baseURL}/device/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getDeviceInfo: async (token, deviceId) => {
    try {
      const response = await axios.get(`${baseURL}/device/${deviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  // Add more device-related API functions as needed
};

export default deviceApi;
