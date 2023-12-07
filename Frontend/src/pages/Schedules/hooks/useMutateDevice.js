import { useMutation, useQueryClient } from 'react-query';
import { DeviceService } from '../DeviceService';

const useMutateDevice = () => {
  const queryClient = useQueryClient();
  const { mutate: onSaveData, isLoading } = useMutation(DeviceService.create, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('get-Device');
    }
  });

  return {
    onSaveData,
    isLoading
  };
};

export default useMutateDevice;
