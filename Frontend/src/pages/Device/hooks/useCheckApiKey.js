import { useMutation } from 'react-query';
import { ApiKeyService } from '../DeviceService';
import useMutateDevice from './useMutateDevice';

const useCheckAndSave = () => {
  const { onSaveData, nameError } = useMutateDevice();
  const {
    mutate: onCheckAndSave,
    isLoading,
    isError
  } = useMutation(ApiKeyService.create, {
    onSuccess: (data, variables) => {
      if (!data.result) {
        localStorage.removeItem('apiKeyError');
        onSaveData(variables);
      } else {
        localStorage.setItem('apiKeyError', true);
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
