import { useMutation, useQueryClient } from 'react-query';
import { UserDeviceService } from '../DeviceService';

const useMutateDevice = () => {
  const queryClient = useQueryClient();
  const {
    mutate: onSaveData,
    isLoading,
    isError
  } = useMutation(UserDeviceService.create, {
    onSuccess: (res) => {
      localStorage.removeItem('deviceNameError');
      queryClient.invalidateQueries('getDevice');
    },
    onError: () => {
      localStorage.setItem('deviceNameError', true);
    }
  });

  return {
    onSaveData,
    isLoading,
    nameError: isError
  };
};

export default useMutateDevice;
