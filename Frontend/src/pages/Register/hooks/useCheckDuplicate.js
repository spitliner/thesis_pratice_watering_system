import { useMutation } from 'react-query';
import { CheckDuplicateService } from '../RegisterService';
import useRegister from './useMutateRegister';

const useCheckDuplicate = () => {
  const { onRegister } = useRegister();
  const { mutate: onCheckDuplicate, isLoading } = useMutation(
    CheckDuplicateService.create,
    {
      onSuccess: (data, variables) => {
        if (!data.result) {
          onRegister(variables)
        }
      },
    }
  );
  return {
    onCheckDuplicate,
    isLoading,
  };
};

export default useCheckDuplicate;
