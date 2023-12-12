import { useQuery } from 'react-query';
import { DeviceService, UserDeviceService } from '../DeviceService';

const useQueryDevice = () => {
  const { data, isLoading } = useQuery('getDevice', DeviceService.get);
  return {
    deviceList: data?.deviceList,
    isLoading
  };
};

export default useQueryDevice;
