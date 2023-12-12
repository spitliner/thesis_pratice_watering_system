import { useMutation } from 'react-query';
import { ApiKeyService } from '../DeviceService';
import useMutateDevice from './useMutateDevice';

const useCheckAndSave = () => {
  const { onSaveData } = useMutateDevice();
  const { mutate: onCheckAndSave, isLoading } = useMutation(
    ApiKeyService.create,
    {
      onSuccess: (data, variables) => {
        if (!data.result) {
          onSaveData(variables);
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
