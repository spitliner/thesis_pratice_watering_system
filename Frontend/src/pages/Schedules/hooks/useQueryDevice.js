import { useQuery } from 'react-query';
import { DeviceService } from '../DeviceService';

const useQueryDevice = () => {
  const { data, isLoading } = useQuery('get-Device', DeviceService.get);
  return {
    device: data?.deviceList,
    isLoading
  };
};

export default useQueryDevice;
