import { useMutation } from 'react-query';
import { FeedIDService } from '../DeviceService';
import useMutateDevice from './useMutateDevice';

const useCheckAndSave = () => {
  const { onSaveData } = useMutateDevice();
  const { mutate: onCheckAndSave, isLoading } = useMutation(
    FeedIDService.create,
    {
      onSuccess: (data, variables) => {
        if (!data.result) {
          localStorage.removeItem('feedIDError');
          onSaveData(variables);
        } else {
          localStorage.setItem('feedIDError', 'Duplicated Feed ID');
        }
      }
    }
  );
  return {
    onCheckAndSave,
    isLoading
  };
};

export default useCheckAndSave;
