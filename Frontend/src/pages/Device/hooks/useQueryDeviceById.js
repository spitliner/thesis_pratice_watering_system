import { useQuery } from 'react-query';
import { DeviceService } from '../DeviceService';

const useQueryDeviceById = (id) => {
  if (!id) return {};
  const { data, isLoading } = useQuery(`getDevice-${id}`, async () =>
    DeviceService.getById(id)
  );
  return {
    // deviceFeed: data?.feed,
    // deviceInfo: data?.info,
    data: data,
    isLoading
  };
};

export default useQueryDeviceById;
