import Axios from 'axios';
import { getAccessToken } from '../utils/localStorage';
const headerRequest = () => {
  const header = {
    'Content-Type': 'application/json'
  };
  const token = JSON.parse(getAccessToken());

  if (token && token !== 'undefined') {
    header.authorization = `Bearer ${token}`;
  }
  return header;
};

const httpRequest = Axios.create({
  baseURL: 'http://localhost:27017/api',
  withCredentials: true
});

httpRequest.interceptors.request.use(
  function (config) {
    config.headers = headerRequest();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default httpRequest;
