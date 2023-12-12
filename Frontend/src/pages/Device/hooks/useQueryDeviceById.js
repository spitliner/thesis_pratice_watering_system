import { useQuery } from 'react-query';
import { DeviceService } from '../DeviceService';

const useQueryDeviceById = (id) => {
  if (!id) return null;
  const { data, isLoading } = useQuery(
    'getDeviceById',
    DeviceService.getById(id)
  );
  return {
    deviceFeed: data?.feed,
    deviceInfo: data?.info,
    isLoading
  };
};

export default useQueryDeviceById;
