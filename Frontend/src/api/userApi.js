import axios from 'axios';

const baseURL = 'http://localhost:9000/api';

const userApi = {
  createUser: async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/account/`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  loginUser: async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/login/`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserProfile: async (token) => {
    try {
      const response = await axios.post(`${baseURL}/user/`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default userApi;
