import { useMutation, useQueryClient } from 'react-query';
import { DeleteDeviceService } from '../DeviceService';

const useMutateDeleteDevice = () => {
  const queryClient = useQueryClient();
  const { mutate: onDeleteData, isLoading } = useMutation(
    (id) => DeleteDeviceService.updateById(id),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('getDevice');
      }
    }
  );

  return {
    onDeleteData,
    isLoading
  };
};

export default useMutateDeleteDevice;
