import { useMutation, useQueryClient } from 'react-query';
import { UserDeviceService } from '../DeviceService';

const useMutateDevice = () => {
  const queryClient = useQueryClient();
  const { mutate: onSaveData, isLoading } = useMutation(
    UserDeviceService.create,
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('getDevice');
      }
    }
  );

  return {
    onSaveData,
    isLoading
  };
};

export default useMutateDevice;
