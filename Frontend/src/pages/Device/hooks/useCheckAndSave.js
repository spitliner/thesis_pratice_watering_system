import { useMutation } from 'react-query';
import { FeedIDService } from '../DeviceService';
import useMutateDevice from './useMutateDevice';

const useCheckAndSave = () => {
  const { onSaveData, nameError } = useMutateDevice();
  const {
    mutate: onCheckAndSave,
    isLoading,
    isError
  } = useMutation(FeedIDService.create, {
    onSuccess: (data, variables) => {
      if (!data.result) {
        localStorage.removeItem('feedIDError');
        onSaveData(variables);
      } else {
        localStorage.setItem('feedIDError', true);
      }
    }
  });
  return {
    onCheckAndSave,
    isLoading,
    apiKeyError: isError,
    nameError
  };
};

export default useCheckAndSave;
