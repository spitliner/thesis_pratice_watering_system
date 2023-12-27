import { useQuery } from 'react-query';
import { DeviceService } from '../DeviceService';

const useQueryDeviceById = (id) => {
  if (!id) return {};
  const { data, isLoading } = useQuery(`getDevice-${id}`, async () => {
    return DeviceService.getById(id);
  });
  return {
    data: data,
    isLoading
  };
};

export default useQueryDeviceById;
