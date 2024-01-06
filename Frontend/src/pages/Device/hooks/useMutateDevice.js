import { useMutation, useQueryClient } from 'react-query';
import { UserDeviceService } from '../DeviceService';

const useMutateDevice = () => {
  const queryClient = useQueryClient();
  const { mutate: onSaveData, isLoading } = useMutation(
    UserDeviceService.create,
    {
      onSuccess: (data) => {
        if (data.result.error)
          localStorage.setItem('deviceNameError', 'Duplicated device name');
        else localStorage.removeItem('deviceNameError');
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
